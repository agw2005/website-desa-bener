import { useEffect, useState } from "react";
import { type Dusun } from "../../types/Dusun.d.ts";
import useFetch from "../../hooks/useFetch.tsx";
import TextInput from "../reusable/inputs/TextInput.tsx";
import Button from "../reusable/Button.tsx";

type NumericDusunField = Exclude<keyof Dusun, "dusun_id" | "nama">;

const FIELD_GROUPS: { title: string; fields: NumericDusunField[] }[] = [
  {
    title: "Umum",
    fields: ["rt", "populasi", "keluarga", "laki", "perempuan", "umkm"],
  },
  {
    title: "Agama",
    fields: [
      "islam",
      "protestanisme",
      "katolisisme",
      "hinduisme",
      "buddhisme",
      "konfusianisme",
    ],
  },
  {
    title: "Disabilitas",
    fields: [
      "tunadaksa",
      "tunanetra",
      "tunarungu",
      "tunawicara",
      "tunagrahita",
      "tunalaras",
    ],
  },
  {
    title: "Kesejahteraan",
    fields: ["kps", "ks_satu", "ks_dua", "ks_tiga", "ks_tiga_plus"],
  },
];

const FIELD_LABELS: Record<NumericDusunField, string> = {
  rt: "RT",
  populasi: "Populasi",
  keluarga: "Jumlah Keluarga",
  laki: "Laki-laki",
  perempuan: "Perempuan",
  umkm: "UMKM",
  islam: "Islam",
  protestanisme: "Protestan",
  katolisisme: "Katolik",
  hinduisme: "Hindu",
  buddhisme: "Buddha",
  konfusianisme: "Konghucu",
  tunadaksa: "Tunadaksa",
  tunanetra: "Tunanetra",
  tunarungu: "Tunarungu",
  tunawicara: "Tunawicara",
  tunagrahita: "Tunagrahita",
  tunalaras: "Tunalaras",
  kps: "KPS",
  ks_satu: "KS-1",
  ks_dua: "KS-2",
  ks_tiga: "KS-3",
  ks_tiga_plus: "KS-3 Plus",
};

const DusunEditForm = ({ dusunId }: { dusunId: number }) => {
  const { data: dusunRows } = useFetch<Dusun>(
    `http://${globalThis.location.hostname}:8000/dusun/${dusunId}`,
  );
  const dusun = dusunRows?.[0] ?? null;

  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!dusun) return;
    const initial: Record<string, string> = { nama: dusun.nama };
    for (const group of FIELD_GROUPS) {
      for (const field of group.fields) {
        initial[field] = String(dusun[field] ?? "");
      }
    }
    setFormValues(initial);
  }, [dusun]);

  const handleFieldChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const response = await fetch(
        `http://${globalThis.location.hostname}:8000/dusun/${dusunId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues),
        },
      );

      setSaveMessage(
        response.ok
          ? "Data dusun berhasil disimpan."
          : "Gagal menyimpan data dusun.",
      );
    } catch (err) {
      console.error(err);
      setSaveMessage("Gagal menyimpan data dusun.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!dusun) return <p>Memuat data dusun...</p>;

  return (
    <div className="flex flex-col gap-6 border-3 rounded-2xl p-6">
      <TextInput
        label="Nama Dusun"
        name="nama"
        id="nama-dusun-edit"
        value={formValues.nama ?? ""}
        onChangeHandler={(e) => handleFieldChange("nama", e.target.value)}
      />

      {FIELD_GROUPS.map((group) => (
        <div key={group.title} className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">{group.title}</h3>
          <div className="grid grid-cols-3 gap-4">
            {group.fields.map((field) => (
              <TextInput
                key={field}
                label={FIELD_LABELS[field]}
                name={field}
                id={`dusun-${field}`}
                value={formValues[field] ?? ""}
                onChangeHandler={(e) =>
                  handleFieldChange(field, e.target.value)}
              />
            ))}
          </div>
        </div>
      ))}

      <Button variant="black" onClick={handleSave} disabled={isSaving}>
        {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
      </Button>
      {saveMessage && <p className="font-semibold">{saveMessage}</p>}
    </div>
  );
};

export default DusunEditForm;
