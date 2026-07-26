import Primitive from "../components/reusable/Primitive.tsx";
import RoundedSection from "../components/reusable/RoundedSection.tsx";
import { type Aparatur } from "../types/Aparatur.d.ts";
import useFetch from "../hooks/useFetch.tsx";
import Button from "../components/reusable/Button.tsx";
import TextInput from "../components/reusable/inputs/TextInput.tsx";
import { useEffect, useState } from "react";
import PasswordInput from "../components/reusable/inputs/PasswordInput.tsx";
import OneFileInput from "../components/reusable/inputs/OneFileInput.tsx";
import DropdownInput from "../components/reusable/inputs/DropdownInput.tsx";

const Manajemen = () => {
  const {
    data: aparaturDesa,
    isLoading: _aparaturDesaIsLoading,
    isError: _aparaturDesaIsError,
    refetch: refetchAparaturDesa,
  } = useFetch<Omit<Aparatur, "kata_sandi" | "foto">>(
    `http://${globalThis.location.hostname}:8000/aparatur`,
  );

  const {
    data: namaDusun,
    isLoading: _namaDusunIsLoading,
    isError: _namaDusunIsError,
    refetch: _refetchNamaDusun,
  } = useFetch<{ dusun_id: number; nama: string }>(
    `http://${globalThis.location.hostname}:8000/dusun/nama`,
  );

  const [inputNamaAparatur, setInputNamaAparatur] = useState("");
  const [inputJabatanAparatur, setInputJabatanAparatur] = useState("");
  const [inputTeleponAparatur, setInputTeleponAparatur] = useState("");
  const [inputKataSandiAparatur, setInputKataSandiAparatur] = useState("");
  const [inputKonfirmasiSandiAparatur, setInputKonfirmasiSandiAparatur] =
    useState("");
  const [inputFotoAparatur, setInputFotoAparatur] = useState<null | File>(null);
  const [inputFilenameAparatur, setInputFilenameAparatur] = useState("");
  const [aparaturTerkonfirmasi, setAparaturTerkonfirmasi] = useState(false);
  const [previewFotoUrl, setPreviewFotoUrl] = useState<string | null>(null);
  const [inputNamaDusun, setInputNamaDusun] = useState("");
  const [selectedDusun, setSelectedDusun] = useState<number | "">("");

  useEffect(() => {
    if (!inputFotoAparatur) {
      setPreviewFotoUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(inputFotoAparatur);
    setPreviewFotoUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [inputFotoAparatur]);

  useEffect(() => {
    console.log(selectedDusun);
  }, [selectedDusun]);

  const handleAparaturFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setInputFilenameAparatur(file.name);
      setInputFotoAparatur(file);
    } else {
      setInputFilenameAparatur("");
      setInputFotoAparatur(null);
    }
  };

  const handleAddAparatur = async () => {
    if (!inputFotoAparatur) return;

    const formData = new FormData();
    formData.append("nama", inputNamaAparatur);
    formData.append("jabatan", inputJabatanAparatur);
    formData.append("telepon", inputTeleponAparatur);
    formData.append("kata_sandi", inputKataSandiAparatur);
    formData.append("foto", inputFotoAparatur);

    try {
      const response = await fetch(
        `http://${globalThis.location.hostname}:8000/aparatur`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        setInputNamaAparatur("");
        setInputJabatanAparatur("");
        setInputTeleponAparatur("");
        setInputKataSandiAparatur("");
        setInputKonfirmasiSandiAparatur("");
        setInputFotoAparatur(null);
        setInputFilenameAparatur("");
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Primitive>
      <div className="flex flex-col gap-8 px-32">
        <RoundedSection title="Aparatur Desa">
          <div className="flex gap-8">
            <div className="flex flex-col gap-2 flex-1">
              <TextInput
                label="Nama"
                name="nama-aparatur"
                id="nama-aparatur"
                value={inputNamaAparatur}
                onChangeHandler={(e) => {
                  setInputNamaAparatur(e.target.value);
                }}
                placeholder="Contoh: Beni Saefudin"
              />
              <TextInput
                label="Jabatan"
                name="jabatan-aparatur"
                id="jabatan-aparatur"
                value={inputJabatanAparatur}
                onChangeHandler={(e) => {
                  setInputJabatanAparatur(e.target.value);
                }}
                placeholder="Contoh: Kepala Desa"
              />
              <TextInput
                label="Telepon"
                name="telepon-aparatur"
                id="telepon-aparatur"
                value={inputTeleponAparatur}
                onChangeHandler={(e) => {
                  setInputTeleponAparatur(e.target.value);
                }}
                placeholder="Contoh: 0812-3456-7890"
              />
              <p className="text-xs font-bold text-red-700">
                (png, jpg, jpeg) Disarankan memakai foto dengan rasio 2x3
              </p>
              <OneFileInput
                label="Foto"
                name="foto-aparatur"
                id="foto-aparatur"
                onChangeHandler={handleAparaturFotoChange}
                accept=".png, .jpg, .jpeg"
                fileName={inputFilenameAparatur}
              />

              {previewFotoUrl && (
                <div className="mt-2 mb-4 border rounded p-2 w-max">
                  <p className="text-sm font-semibold mb-2">Pratinjau Foto:</p>
                  <img
                    src={previewFotoUrl}
                    alt="Pratinjau upload aparatur"
                    className="w-32 h-48 object-cover rounded shadow-sm"
                  />
                </div>
              )}

              <PasswordInput
                label="Kata Sandi"
                name="kata-sandi-aparatur"
                id="kata-sandi-aparatur"
                value={inputKataSandiAparatur}
                onChangeHandler={(e) => {
                  setInputKataSandiAparatur(e.target.value);
                }}
              />
              <PasswordInput
                label="Konfirmasi Sandi"
                name="konfirmasi-sandi-aparatur"
                id="konfirmasi-sandi-aparatur"
                value={inputKonfirmasiSandiAparatur}
                onChangeHandler={(e) => {
                  setInputKonfirmasiSandiAparatur(e.target.value);
                }}
              />
              <Button
                variant="black"
                onClick={async () => {
                  setAparaturTerkonfirmasi(false);
                  if (inputKataSandiAparatur !== inputKonfirmasiSandiAparatur) {
                    setAparaturTerkonfirmasi(true);
                    return void 0;
                  }
                  await handleAddAparatur();
                  refetchAparaturDesa();
                }}
              >
                Tambah Aparatur Desa
              </Button>
              {aparaturTerkonfirmasi && (
                <div className="w-max px-4 py-2 bg-red-600 text-white font-bold rounded-2xl">
                  Kata Sandi tidak sesuai
                </div>
              )}
            </div>

            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-amber-700 text-white">
                    <th className="py-2 px-4 font-bold border border-black text-center">
                      No
                    </th>
                    <th className="py-2 px-4 font-bold border border-black text-center">
                      Nama
                    </th>
                    <th className="py-2 px-4 font-bold border border-black text-center">
                      Jabatan
                    </th>
                    <th className="py-2 px-4 font-bold border border-black text-center">
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {aparaturDesa &&
                    aparaturDesa.map((aparatur, index) => {
                      return (
                        <tr
                          key={index}
                          className="border"
                        >
                          <td className="border border-black py-2 px-4 text-center">
                            {index + 1}
                          </td>
                          <td className="border border-black py-2 px-4 font-medium">
                            {aparatur.nama}
                          </td>
                          <td className="border border-black py-2 px-4">
                            {aparatur.jabatan}
                          </td>
                          <td
                            onClick={async () => {
                              const response = await fetch(
                                `http://${globalThis.location.hostname}:8000/aparatur/${aparatur.aparatur_id}`,
                                { method: "DELETE" },
                              );
                              const responseBody = await response.json();
                              console.log(responseBody);
                              console.log(
                                `Deleted Aparatur of ID ${aparatur.aparatur_id}`,
                              );
                              refetchAparaturDesa();
                            }}
                            className="border border-black py-2 px-4 select-none bg-red-700 hover:bg-red-900 active:bg-red-600 text-white font-bold text-center"
                          >
                            Delete
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </RoundedSection>
        <RoundedSection title="Dusun">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 w-max">
              <h2 className="text-2xl font-bold">Data Per-dusun</h2>
              {namaDusun && (
                <DropdownInput
                  label="Dusun"
                  name="selected-dusun"
                  id="selected-dusun"
                  value={selectedDusun}
                  options={namaDusun}
                  getId={(dusun) => dusun.dusun_id}
                  getLabel={(dusun) => dusun.nama}
                  onChangeHandler={setSelectedDusun}
                />
              )}
            </div>
            <div className="flex flex-col gap-2 w-max">
              <h2 className="text-2xl font-bold">Tambah Dusun Baru</h2>
              <TextInput
                label="Nama Dusun"
                name="nama-dusun-baru"
                id="nama-dusun-baru"
                value={inputNamaDusun}
                onChangeHandler={(e) => {
                  setInputNamaDusun(e.target.value);
                }}
                placeholder="Contoh: Karangbalong"
              />
              <Button variant="black">Tambah Dusun Baru</Button>
            </div>
          </div>
        </RoundedSection>
      </div>
    </Primitive>
  );
};

export default Manajemen;
