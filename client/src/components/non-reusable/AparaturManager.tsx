import { useEffect, useState } from "react";
import RoundedSection from "../reusable/RoundedSection.tsx";
import type { Aparatur } from "../../types/Aparatur.d.ts";
import useFetch from "../../hooks/useFetch.tsx";
import Button from "../reusable/Button.tsx";
import TextInput from "../reusable/inputs/TextInput.tsx";
import PasswordInput from "../reusable/inputs/PasswordInput.tsx";
import OneFileInput from "../reusable/inputs/OneFileInput.tsx";
import { authFetch } from "../../helpers/authFetch.ts";
import { serverApi } from "../../helpers/serverApi.ts";
import AparaturEditForm from "./AparaturEditForm.tsx";
import DropdownInput from "../reusable/inputs/DropdownInput.tsx";

const AparaturManager = () => {
  const {
    data: aparaturDesa,
    refetch: refetchAparaturDesa,
  } = useFetch<Omit<Aparatur, "kata_sandi" | "foto">>(
    serverApi.get.aparatur.all(),
  );

  const [inputNamaAparatur, setInputNamaAparatur] = useState("");
  const [inputJabatanAparatur, setInputJabatanAparatur] = useState("");
  const [inputTeleponAparatur, setInputTeleponAparatur] = useState("");
  const [inputKataSandiAparatur, setInputKataSandiAparatur] = useState("");
  const [inputKonfirmasiSandiAparatur, setInputKonfirmasiSandiAparatur] =
    useState("");
  const [inputFotoAparatur, setInputFotoAparatur] = useState<null | File>(null);
  const [aparaturTerkonfirmasi, setAparaturTerkonfirmasi] = useState(false);
  const [_previewFotoUrl, setPreviewFotoUrl] = useState<string | null>(null);

  const [requiredInputIsMissing, setRequiredInputIsMissing] = useState(false);

  const [selectedAparatur, setSelectedAparatur] = useState<number | "">("");

  useEffect(() => {
    if (!inputFotoAparatur) {
      setPreviewFotoUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(inputFotoAparatur);
    setPreviewFotoUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [inputFotoAparatur]);

  const handleAparaturFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setInputFotoAparatur(file ?? null);
  };

  const resetForm = () => {
    setInputNamaAparatur("");
    setInputJabatanAparatur("");
    setInputTeleponAparatur("");
    setInputKataSandiAparatur("");
    setInputKonfirmasiSandiAparatur("");
    setInputFotoAparatur(null);
  };

  const handleAddAparatur = async () => {
    setRequiredInputIsMissing(false);
    if (
      inputNamaAparatur.trim() === "" || inputJabatanAparatur.trim() === "" ||
      inputKataSandiAparatur.trim() === ""
    ) {
      setRequiredInputIsMissing(true);
      return;
    }

    const formData = new FormData();
    formData.append("nama", inputNamaAparatur);
    formData.append("jabatan", inputJabatanAparatur);
    formData.append("telepon", inputTeleponAparatur);
    formData.append("kata_sandi", inputKataSandiAparatur);
    formData.append("foto", inputFotoAparatur);

    try {
      const response = await authFetch(
        serverApi.post.aparatur.new(),
        { method: "POST", body: formData },
      );

      if (response.ok) {
        resetForm();
        refetchAparaturDesa();
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <RoundedSection title="Aparatur Desa">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-8 xl:flex-row">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <h2 className="text-2xl font-bold">Tambah Aparatur Baru</h2>
            <TextInput
              label="Nama"
              name="nama-aparatur"
              id="nama-aparatur"
              value={inputNamaAparatur}
              onChangeHandler={(e) => setInputNamaAparatur(e.target.value)}
              placeholder="Contoh: Beni Saefudin"
            />

            <TextInput
              label="Jabatan"
              name="jabatan-aparatur"
              id="jabatan-aparatur"
              value={inputJabatanAparatur}
              onChangeHandler={(e) => setInputJabatanAparatur(e.target.value)}
              placeholder="Contoh: Kepala Desa"
            />

            <TextInput
              label="Telepon"
              name="telepon-aparatur"
              id="telepon-aparatur"
              value={inputTeleponAparatur}
              onChangeHandler={(e) => setInputTeleponAparatur(e.target.value)}
              placeholder="Contoh: 0812-3456-7890"
            />

            <p className="text-xs font-bold text-red-700">
              Disarankan memakai foto dengan rasio 2x3
            </p>

            <OneFileInput
              label="Foto"
              name="foto-aparatur"
              id="foto-aparatur"
              onChangeHandler={handleAparaturFotoChange}
              accept=".png, .jpg, .jpeg"
              fileName={inputFotoAparatur?.name}
              placeholder="(png, jpg, jpeg)"
            />

            <PasswordInput
              label="Kata Sandi"
              name="kata-sandi-aparatur"
              id="kata-sandi-aparatur"
              value={inputKataSandiAparatur}
              onChangeHandler={(e) => setInputKataSandiAparatur(e.target.value)}
            />

            <PasswordInput
              label="Konfirmasi Sandi"
              name="konfirmasi-sandi-aparatur"
              id="konfirmasi-sandi-aparatur"
              value={inputKonfirmasiSandiAparatur}
              onChangeHandler={(e) =>
                setInputKonfirmasiSandiAparatur(e.target.value)}
            />

            <Button
              variant="black"
              onClick={async () => {
                setAparaturTerkonfirmasi(false);
                if (inputKataSandiAparatur !== inputKonfirmasiSandiAparatur) {
                  setAparaturTerkonfirmasi(true);
                  return;
                }
                await handleAddAparatur();
              }}
            >
              Tambah Aparatur Desa
            </Button>

            {aparaturTerkonfirmasi && (
              <div className="w-max max-w-full rounded-2xl bg-red-600 px-4 py-2 font-bold text-white">
                Kata Sandi tidak sesuai
              </div>
            )}

            {requiredInputIsMissing && (
              <div className="w-max max-w-full rounded-2xl bg-red-600 px-4 py-2 font-bold text-white">
                Nama, Jabatan, dan Kata sandi wajib diisi
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1 flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Kelola Aparatur</h2>
            {aparaturDesa && (
              <DropdownInput
                label="Aparatur"
                name="selected-aparatur"
                id="selected-aparatur"
                value={selectedAparatur}
                options={aparaturDesa}
                getId={(a) => a.aparatur_id}
                getLabel={(a) => `${a.nama} — ${a.jabatan}`}
                onChangeHandler={setSelectedAparatur}
                placeholder="Pilih Aparatur"
              />
            )}

            {selectedAparatur !== "" && (
              <AparaturEditForm
                key={selectedAparatur}
                aparaturId={selectedAparatur}
                refetchAparatur={refetchAparaturDesa}
                aparaturSetter={setSelectedAparatur}
              />
            )}
          </div>
        </div>
      </div>
    </RoundedSection>
  );
};

export default AparaturManager;
