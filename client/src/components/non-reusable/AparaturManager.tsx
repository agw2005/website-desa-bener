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
  const [previewFotoUrl, setPreviewFotoUrl] = useState<string | null>(null);

  const [requiredInputIsMissing, setRequiredInputIsMissing] = useState(false);

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
    if (file) {
      setInputFotoAparatur(file);
    } else {
      setInputFotoAparatur(null);
    }
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

  const handleDeleteAparatur = async (id: number) => {
    const response = await authFetch(
      serverApi.delete.aparatur(id),
      { method: "DELETE" },
    );
    if (!response.ok) console.error(await response.json());
    refetchAparaturDesa();
  };

  return (
    <RoundedSection title="Aparatur Desa">
      <div className="flex flex-col gap-8 xl:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
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

          {previewFotoUrl && (
            <div className="mt-2 mb-4 w-max rounded border p-2">
              <p className="mb-2 text-sm font-semibold">
                Pratinjau Foto:
              </p>

              <img
                src={previewFotoUrl}
                alt="Pratinjau upload aparatur"
                className="h-48 w-32 rounded object-cover shadow-sm"
                onError={(e) => {
                  e.currentTarget.src = "/tidak-ada-gambar-2x3.png";
                  e.currentTarget.onerror = null;
                }}
              />
            </div>
          )}

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

              if (
                inputKataSandiAparatur !== inputKonfirmasiSandiAparatur
              ) {
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

        {/* Table */}
        <div className="min-w-0 flex-1 overflow-x-auto">
          <table className="w-full min-w-125 border-collapse text-left">
            <thead>
              <tr className="bg-amber-700 text-white">
                <th className="border border-black px-4 py-2 text-center font-bold">
                  No
                </th>

                <th className="border border-black px-4 py-2 text-center font-bold">
                  Nama
                </th>

                <th className="border border-black px-4 py-2 text-center font-bold">
                  Jabatan
                </th>

                <th className="border border-black px-4 py-2 text-center font-bold">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {aparaturDesa &&
                aparaturDesa.map((aparatur, index) => (
                  <tr
                    key={aparatur.aparatur_id}
                    className="border"
                  >
                    <td className="border border-black px-4 py-2 text-center">
                      {index + 1}
                    </td>

                    <td className="border border-black px-4 py-2 font-medium">
                      {aparatur.nama}
                    </td>

                    <td className="border border-black px-4 py-2">
                      {aparatur.jabatan}
                    </td>

                    <td
                      onClick={() => handleDeleteAparatur(aparatur.aparatur_id)}
                      className="cursor-pointer select-none border border-black bg-red-700 px-4 py-2 text-center font-bold text-white hover:bg-red-900 active:bg-red-600"
                    >
                      Hapus
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </RoundedSection>
  );
};

export default AparaturManager;
