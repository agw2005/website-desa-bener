import { useEffect, useState } from "react";
import RoundedSection from "../reusable/RoundedSection.tsx";
import TextInput from "../reusable/inputs/TextInput.tsx";
import OneFileInput from "../reusable/inputs/OneFileInput.tsx";
import Button from "../reusable/Button.tsx";
import useFetch from "../../hooks/useFetch.tsx";
import type { Profil } from "../../types/Profil.d.ts";
import TextAreaInput from "../reusable/inputs/TextAreaInput.tsx";
import { authFetch } from "../../helpers/authFetch.ts";
import { serverApi } from "../../helpers/serverApi.ts";

type ProfilTextField = Exclude<
  keyof Profil,
  | "profil_id"
  | "peta"
  | "kode_desa"
  | "tahun_pembentukan"
  | "luas"
  | "deskripsi_sekilas"
  | "sejarah"
>;
type ProfilIntField = "kode_desa" | "tahun_pembentukan";
type ProfilDecimalField = "luas";

const FIELD_GROUPS: {
  title: string;
  fields: (ProfilTextField | ProfilIntField | ProfilDecimalField)[];
}[] = [
  {
    title: "Administratif",
    fields: [
      "kode_desa",
      "kecamatan",
      "kabupaten_kota",
      "provinsi",
      "tahun_pembentukan",
    ],
  },
  {
    title: "Geografis",
    fields: ["luas", "koordinat", "tipologi", "klasifikasi", "kategori"],
  },
  {
    title: "Batas Wilayah",
    fields: ["batas_timur", "batas_barat", "batas_selatan", "batas_utara"],
  },
  {
    title: "Lainnya",
    fields: ["tautan_kalender"],
  },
];

const FIELD_LABELS: Record<
  ProfilTextField | ProfilIntField | ProfilDecimalField,
  string
> = {
  kode_desa: "Kode Desa",
  kecamatan: "Kecamatan",
  kabupaten_kota: "Kabupaten/Kota",
  provinsi: "Provinsi",
  tahun_pembentukan: "Tahun Pembentukan",
  luas: "Luas (Ha)",
  koordinat: "Koordinat",
  tipologi: "Tipologi",
  klasifikasi: "Klasifikasi",
  kategori: "Kategori",
  batas_timur: "Batas Timur",
  batas_barat: "Batas Barat",
  batas_selatan: "Batas Selatan",
  batas_utara: "Batas Utara",
  tautan_kalender: "Tautan Kalender",
};

const ProfilDesaManager = () => {
  const { data: profilRows, refetch: refetchProfil } = useFetch<
    Omit<Profil, "peta">
  >(
    serverApi.get.profil.all(),
  );
  const profil = profilRows?.[0] ?? null;

  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [inputDeskripsiSekilas, setInputDeskripsiSekilas] = useState("");
  const [inputSejarah, setInputSejarah] = useState("");
  const [inputPeta, setInputPeta] = useState<null | File>(null);
  const [previewPetaUrl, setPreviewPetaUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Populate form once profil data arrives
  useEffect(() => {
    if (!profil) return;

    const initial: Record<string, string> = {};
    for (const group of FIELD_GROUPS) {
      for (const field of group.fields) {
        initial[field] = String(profil[field] ?? "");
      }
    }
    setFormValues(initial);
    setInputDeskripsiSekilas(profil.deskripsi_sekilas ?? "");
    setInputSejarah(profil.sejarah ?? "");
  }, [profil]);

  useEffect(() => {
    if (!inputPeta) {
      setPreviewPetaUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(inputPeta);
    setPreviewPetaUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [inputPeta]);

  const handleFieldChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handlePetaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setInputPeta(file);
    else setInputPeta(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage(null);

    const formData = new FormData();
    formData.append("deskripsi_sekilas", inputDeskripsiSekilas);
    formData.append("sejarah", inputSejarah);
    for (const [field, value] of Object.entries(formValues)) {
      formData.append(field, value);
    }
    if (inputPeta) {
      formData.append("peta", inputPeta);
    }

    try {
      const response = await authFetch(
        serverApi.patch.profil(),
        { method: "PATCH", body: formData },
      );

      if (response.ok) {
        setSaveMessage("Profil desa berhasil disimpan.");
        setInputPeta(null);
        refetchProfil();
      } else {
        setSaveMessage("Gagal menyimpan profil desa.");
        console.error(await response.json());
      }
    } catch (err) {
      console.error(err);
      setSaveMessage("Gagal menyimpan profil desa.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!profil) {
    return (
      <RoundedSection title="Profil Desa">
        <p>Memuat data profil desa...</p>
      </RoundedSection>
    );
  }

  return (
    <RoundedSection title="Profil Desa">
      <div className="flex flex-col gap-6 w-full">
        <TextAreaInput
          label="Deskripsi Sekilas"
          name="deskripsi-sekilas"
          id="deskripsi-sekilas"
          value={inputDeskripsiSekilas}
          onChangeHandler={(e) => {
            setInputDeskripsiSekilas(e.target.value);
          }}
          rows={6}
        />

        {FIELD_GROUPS.map((group) => (
          <div key={group.title} className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">{group.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.fields.map((field) => (
                <TextInput
                  key={field}
                  label={FIELD_LABELS[field]}
                  name={field}
                  id={`profil-${field}`}
                  value={formValues[field] ?? ""}
                  onChangeHandler={(e) =>
                    handleFieldChange(field, e.target.value)}
                />
              ))}
            </div>
          </div>
        ))}

        <TextAreaInput
          label="Sejarah Desa"
          name="sejarah-desa"
          id="sejarah-desa"
          value={inputSejarah}
          onChangeHandler={(e) => {
            setInputSejarah(e.target.value);
          }}
          rows={16}
        />

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Peta Desa</h3>

          <p className="text-xs font-bold text-red-700">
            Kosongkan jika tidak ingin mengganti peta
          </p>

          <OneFileInput
            label="Peta"
            name="peta"
            id="peta-profil"
            onChangeHandler={handlePetaChange}
            accept=".png, .jpg, .jpeg"
            fileName={inputPeta?.name}
            placeholder="(png, jpg, jpeg)"
          />
          {previewPetaUrl && (
            <div className="mt-2 mb-4 border rounded p-2 w-full sm:w-max">
              <p className="text-sm font-semibold mb-2">Pratinjau Peta Baru:</p>
              <img
                src={previewPetaUrl}
                alt="Pratinjau peta desa"
                className="w-full sm:w-64 h-40 object-cover rounded shadow-sm"
                onError={(e) => {
                  e.currentTarget.src = "/tidak-ada-gambar-box.png";
                  e.currentTarget.onerror = null;
                }}
              />
            </div>
          )}
        </div>

        <Button variant="black" onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
        {saveMessage && <p className="font-semibold">{saveMessage}</p>}
      </div>
    </RoundedSection>
  );
};

export default ProfilDesaManager;
