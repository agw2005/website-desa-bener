import { useState } from "react";
import Button from "../reusable/Button.tsx";
import OneFileInput from "../reusable/inputs/OneFileInput.tsx";
import TextInput from "../reusable/inputs/TextInput.tsx";
import ManualCarousel from "../reusable/ManualCarousel.tsx";
import RoundedSection from "../reusable/RoundedSection.tsx";
import type { Umkm } from "../../types/Umkm.d.ts";
import useFetch from "../../hooks/useFetch.tsx";
import DropdownInput from "../reusable/inputs/DropdownInput.tsx";
import type { Dusun } from "../../types/Dusun.d.ts";
import { authFetch } from "../../helpers/authFetch.ts";

interface UmkmDesaProps {
  isLoggedIn: boolean;
}

interface KontakInput {
  jenisKontak: string;
  isiKontak: string;
  tautanKontak: string;
}

const UmkmDesa = ({ isLoggedIn }: UmkmDesaProps) => {
  const [inputNamaUmkm, setInputNamaUmkm] = useState("");
  const [inputDeskripsiUmkm, setInputDeskripsiUmkm] = useState("");
  const [inputFotoUmkm, setInputFotoUmkm] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [umkmPostMessage, setUmkmPostMessage] = useState("");
  const [selectedDusun, setSelectedDusun] = useState<number | "">("");
  const [kontakList, setKontakList] = useState<KontakInput[]>([]);

  const {
    data: namaDusun,
  } = useFetch<Pick<Dusun, "dusun_id" | "nama">>(
    `http://${globalThis.location.hostname}:8000/dusun/nama`,
  );

  const {
    data: rawUmkm,
    refetch: refetchUmkm,
  } = useFetch<Omit<Umkm, "foto">>(
    `http://${globalThis.location.hostname}:8000/umkm`,
  );

  const handleDeleteUmkm = async (id: number) => {
    const response = await authFetch(
      `http://${globalThis.location.hostname}:8000/umkm/${id}`,
      { method: "DELETE" },
    );
    if (!response.ok) console.error(await response.json());
    refetchUmkm();
  };

  const handleAddUmkm = async () => {
    setIsLoading(true);
    setUmkmPostMessage("");

    if (
      inputNamaUmkm.trim() === "" ||
      inputDeskripsiUmkm.trim() === "" ||
      inputFotoUmkm === null ||
      selectedDusun === ""
    ) {
      setUmkmPostMessage("Nama, Deskripsi, Dusun, dan Foto perlu diisi");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("nama", inputNamaUmkm);
    formData.append("deskripsi", inputDeskripsiUmkm);
    formData.append("dusun_id", String(selectedDusun));
    formData.append("foto", inputFotoUmkm);

    for (const kontak of kontakList) {
      if (
        kontak.jenisKontak === "" || kontak.isiKontak === "" ||
        kontak.tautanKontak === ""
      ) {
        setUmkmPostMessage(
          "Jenis kontak, Isi kontak, dan Tautan wajib diisi atau hapus informasi kontak",
        );
        setIsLoading(false);
        return;
      }

      formData.append("jenis_kontak", kontak.jenisKontak);
      formData.append("isi_kontak", kontak.isiKontak);
      formData.append("tautan_kontak", kontak.tautanKontak);
    }

    try {
      const response = await authFetch(
        `http://${globalThis.location.hostname}:8000/umkm`,
        { method: "POST", body: formData },
      );

      if (response.ok) {
        setUmkmPostMessage("UMKM berhasil disimpan.");
        setInputNamaUmkm("");
        setInputDeskripsiUmkm("");
        setInputFotoUmkm(null);
        setSelectedDusun("");
        setKontakList([]);
        refetchUmkm();
      } else {
        setUmkmPostMessage("Gagal menyimpan UMKM.");
        console.error(await response.json());
      }
    } catch (err) {
      console.error(err);
      setUmkmPostMessage("Gagal menyimpan UMKM.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddKontak = () => {
    setKontakList((
      prev,
    ) => [...prev, { jenisKontak: "", isiKontak: "", tautanKontak: "" }]);
  };

  const handleRemoveKontak = (index: number) => {
    setKontakList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateKontak = (
    index: number,
    field: keyof KontakInput,
    value: string,
  ) => {
    setKontakList((prev) =>
      prev.map((
        kontak,
        i,
      ) => (i === index ? { ...kontak, [field]: value } : kontak))
    );
  };

  const umkm = rawUmkm?.map((umkm) => ({
    id: umkm.umkm_id,
    title: umkm.nama,
    subtitle: umkm.deskripsi,
    photo:
      `http://${globalThis.location.hostname}:8000/umkm/foto/${umkm.umkm_id}`,
    link: `/umkm/${umkm.umkm_id}`,
  })) ?? [];

  return (
    <RoundedSection title="UMKM DESA" contentClassName="flex flex-col gap-8">
      <ManualCarousel
        minCardWidth={180}
        maxVisibleCards={5}
        pixelGap={16}
        aspectRatio="1/1"
        items={umkm}
        showDelete={isLoggedIn}
        onDelete={handleDeleteUmkm}
      />
      {isLoggedIn && (
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-xl">TAMBAH UMKM BARU</h2>
          <TextInput
            label="Nama UMKM"
            name="nama-umkm-baru"
            id="nama-umkm-baru"
            value={inputNamaUmkm}
            onChangeHandler={(e) => {
              setInputNamaUmkm(e.target.value);
            }}
            placeholder="Kerupuk Ibu Ninik"
          />
          <TextInput
            label="Deskripsi"
            name="deskripsi-umkm-baru"
            id="deskripsi-umkm-baru"
            value={inputDeskripsiUmkm}
            onChangeHandler={(e) => {
              setInputDeskripsiUmkm(e.target.value);
            }}
            placeholder="Kerupuk Ceriping"
          />
          <OneFileInput
            label="Foto"
            name="foto-umkm-baru"
            id="foto-umkm-baru"
            onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file) setInputFotoUmkm(file);
              else setInputFotoUmkm(null);
            }}
            accept="*.jpg,*.jpeg,*.png"
            fileName={inputFotoUmkm?.name}
            placeholder="png, jpg, jpeg"
          />
          {namaDusun && (
            <DropdownInput
              label="Dusun"
              name="selected-dusun"
              id="selected-dusun"
              value={selectedDusun}
              options={namaDusun}
              getId={(dusun) => dusun.dusun_id}
              getLabel={(dusun) =>
                dusun.nama}
              onChangeHandler={setSelectedDusun}
              placeholder="Pilih Dusun"
            />
          )}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Kontak</h3>
            {kontakList.map((kontak, index) => (
              <div key={index} className="flex gap-2 items-start">
                <TextInput
                  label="Jenis"
                  name={`jenis-kontak-${index}`}
                  id={`jenis-kontak-${index}`}
                  value={kontak.jenisKontak}
                  onChangeHandler={(e) =>
                    handleUpdateKontak(index, "jenisKontak", e.target.value)}
                  placeholder="WhatsApp, Instagram, dll."
                />
                <TextInput
                  label="Isi"
                  name={`isi-kontak-${index}`}
                  id={`isi-kontak-${index}`}
                  value={kontak.isiKontak}
                  onChangeHandler={(e) =>
                    handleUpdateKontak(index, "isiKontak", e.target.value)}
                  placeholder="Nama tampilan / nomor"
                />
                <TextInput
                  label="Tautan"
                  name={`tautan-kontak-${index}`}
                  id={`tautan-kontak-${index}`}
                  value={kontak.tautanKontak}
                  onChangeHandler={(e) =>
                    handleUpdateKontak(index, "tautanKontak", e.target.value)}
                  placeholder="https://wa.me/..."
                />
                <Button
                  type="button"
                  variant="red"
                  onClick={() =>
                    handleRemoveKontak(index)}
                  aria-label={`Hapus kontak ${index + 1}`}
                >
                  Hapus
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="black"
              className="w-max"
              onClick={handleAddKontak}
            >
              + Tambah Kontak
            </Button>
          </div>
          <div className="flex gap-4 items-center">
            <Button
              variant="black"
              onClick={handleAddUmkm}
              disabled={isLoading}
              className="w-max"
            >
              {isLoading ? "Mohon ditunggu..." : "Tambah UMKM Baru"}
            </Button>
            {umkmPostMessage && (
              <p className="font-semibold">{umkmPostMessage}</p>
            )}
          </div>
        </div>
      )}
    </RoundedSection>
  );
};

export default UmkmDesa;
