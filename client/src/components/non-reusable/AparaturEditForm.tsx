import { useEffect, useRef, useState } from "react";
import type { Aparatur } from "../../types/Aparatur.d.ts";
import useFetch from "../../hooks/useFetch.tsx";
import TextInput from "../reusable/inputs/TextInput.tsx";
import PasswordInput from "../reusable/inputs/PasswordInput.tsx";
import OneFileInput from "../reusable/inputs/OneFileInput.tsx";
import Button from "../reusable/Button.tsx";
import { authFetch } from "../../helpers/authFetch.ts";
import { serverApi } from "../../helpers/serverApi.ts";

interface AparaturEditFormProps {
  aparaturId: number;
  refetchAparatur: () => void;
  aparaturSetter: React.Dispatch<React.SetStateAction<number | "">>;
}

const AparaturEditForm = (
  { aparaturId, refetchAparatur, aparaturSetter }: AparaturEditFormProps,
) => {
  const { data: aparaturRows } = useFetch<
    Omit<Aparatur, "foto" | "kata_sandi">
  >(
    serverApi.get.aparatur.one(aparaturId),
  );
  const aparatur = aparaturRows?.[0] ?? null;

  const [inputNama, setInputNama] = useState("");
  const [inputJabatan, setInputJabatan] = useState("");
  const [inputTelepon, setInputTelepon] = useState("");
  const [inputKataSandi, setInputKataSandi] = useState("");
  const [inputKonfirmasiSandi, setInputKonfirmasiSandi] = useState("");
  const [inputFoto, setInputFoto] = useState<File | null>(null);
  const [previewFotoUrl, setPreviewFotoUrl] = useState<string | null>(null);

  const cacheBuster = useRef(`?cb=${Date.now()}`);
  const bumpCacheBuster = () => {
    cacheBuster.current = `?cb=${Date.now()}`;
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  useEffect(() => {
    if (!aparatur) return;
    setInputNama(aparatur.nama ?? "");
    setInputJabatan(aparatur.jabatan ?? "");
    setInputTelepon(aparatur.telepon ?? "");
    setInputKataSandi("");
    setInputKonfirmasiSandi("");
    setInputFoto(null);
  }, [aparatur]);

  useEffect(() => {
    if (!inputFoto) {
      setPreviewFotoUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(inputFoto);
    setPreviewFotoUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [inputFoto]);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setInputFoto(file ?? null);
  };

  // Purely local: discard the pending new-file selection, no API call.
  const handleClearNewFoto = () => {
    setInputFoto(null);
  };

  const handleSave = async () => {
    setSaveMessage(null);
    setPasswordMismatch(false);

    if (inputKataSandi !== inputKonfirmasiSandi) {
      setPasswordMismatch(true);
      return;
    }

    setIsSaving(true);

    const formData = new FormData();
    formData.append("nama", inputNama);
    formData.append("jabatan", inputJabatan);
    formData.append("telepon", inputTelepon);
    if (inputKataSandi.trim() !== "") {
      formData.append("kata_sandi", inputKataSandi);
    }
    if (inputFoto) {
      formData.append("foto", inputFoto);
    }

    try {
      const response = await authFetch(
        serverApi.patch.aparatur.data(aparaturId),
        { method: "PATCH", body: formData },
      );

      if (response.ok) {
        setSaveMessage("Data aparatur berhasil disimpan.");
        setInputKataSandi("");
        setInputKonfirmasiSandi("");
        setInputFoto(null);
        if (inputFoto) bumpCacheBuster();
        refetchAparatur();
      } else {
        setSaveMessage("Gagal menyimpan data aparatur.");
        console.error(await response.json());
      }
    } catch (err) {
      console.error(err);
      setSaveMessage("Gagal menyimpan data aparatur.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveStoredFoto = async () => {
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const response = await authFetch(
        serverApi.patch.aparatur.deletePhoto(aparaturId),
        { method: "PATCH" },
      );

      setSaveMessage(
        response.ok ? "Foto berhasil dihapus." : "Gagal menghapus foto.",
      );
      if (response.ok) bumpCacheBuster();
      refetchAparatur();
    } catch (err) {
      console.error(err);
      setSaveMessage("Gagal menghapus foto.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const response = await authFetch(
        serverApi.delete.aparatur(aparaturId),
        { method: "DELETE" },
      );

      setSaveMessage(
        response.ok
          ? "Aparatur berhasil dihapus."
          : "Gagal menghapus aparatur.",
      );
      refetchAparatur();
      aparaturSetter("");
    } catch (err) {
      console.error(err);
      setSaveMessage("Gagal menghapus aparatur.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!aparatur) return <p>Memuat data aparatur...</p>;

  return (
    <div className="flex flex-col gap-2 border-3 rounded-2xl p-4 sm:p-6 w-full overflow-hidden">
      <TextInput
        label="Nama"
        name="nama-aparatur-edit"
        id="nama-aparatur-edit"
        value={inputNama}
        onChangeHandler={(e) => setInputNama(e.target.value)}
      />

      <TextInput
        label="Jabatan"
        name="jabatan-aparatur-edit"
        id="jabatan-aparatur-edit"
        value={inputJabatan}
        onChangeHandler={(e) => setInputJabatan(e.target.value)}
      />

      <TextInput
        label="Telepon"
        name="telepon-aparatur-edit"
        id="telepon-aparatur-edit"
        value={inputTelepon}
        onChangeHandler={(e) => setInputTelepon(e.target.value)}
        placeholder="Kosongkan untuk menghapus nomor telepon"
      />

      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-lg">Foto</h3>

        <div className="flex flex-wrap gap-4">
          <div className="border p-2 rounded-2xl flex flex-col items-center w-full sm:w-max">
            <p className="mb-2 text-sm font-semibold">Foto Sekarang:</p>
            <img
              src={`${
                serverApi.get.aparatur.photo(aparaturId)
              }${cacheBuster.current}`}
              alt={`Foto ${aparatur.nama}`}
              className="h-48 w-32 rounded object-cover shadow-sm"
              onError={(e) => {
                e.currentTarget.src = "/tidak-ada-gambar-2x3.png";
                e.currentTarget.onerror = null;
              }}
            />
            <Button
              variant="red"
              className="mt-2 w-max"
              onClick={handleRemoveStoredFoto}
              disabled={isSaving}
            >
              Hapus Foto Sekarang
            </Button>
          </div>

          {previewFotoUrl && (
            <div className="border p-2 rounded-2xl flex flex-col items-center w-full sm:w-max">
              <p className="mb-2 text-sm font-semibold">Pratinjau Foto Baru:</p>
              <img
                src={previewFotoUrl}
                alt="Pratinjau foto baru"
                className="h-48 w-32 rounded object-cover shadow-sm"
              />
              <Button
                variant="red"
                className="mt-2 w-max"
                onClick={handleClearNewFoto}
                disabled={isSaving}
              >
                Batalkan Foto Baru
              </Button>
            </div>
          )}
        </div>

        <p className="text-xs font-bold text-red-700">
          Disarankan memakai foto dengan rasio 2x3
        </p>
        <OneFileInput
          label="Ganti Foto"
          name="foto-aparatur-edit"
          id="foto-aparatur-edit"
          onChangeHandler={handleFotoChange}
          accept=".png, .jpg, .jpeg"
          fileName={inputFoto?.name}
          placeholder="(png, jpg, jpeg)"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-lg">Ganti Kata Sandi</h3>
        <p className="text-xs font-bold text-red-700">
          Kosongkan kedua kolom di bawah ini jika tidak ingin mengubah kata
          sandi.
        </p>
        <PasswordInput
          label="Kata Sandi Baru"
          name="kata-sandi-aparatur-edit"
          id="kata-sandi-aparatur-edit"
          value={inputKataSandi}
          onChangeHandler={(e) => setInputKataSandi(e.target.value)}
        />
        <PasswordInput
          label="Konfirmasi Sandi Baru"
          name="konfirmasi-sandi-aparatur-edit"
          id="konfirmasi-sandi-aparatur-edit"
          value={inputKonfirmasiSandi}
          onChangeHandler={(e) => setInputKonfirmasiSandi(e.target.value)}
        />
        {passwordMismatch && (
          <div className="w-max max-w-full rounded-2xl bg-red-600 px-4 py-2 font-bold text-white">
            Kata sandi tidak sesuai
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button variant="black" onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
        <Button variant="red" onClick={handleDelete} disabled={isSaving}>
          Hapus Aparatur
        </Button>
      </div>
      {saveMessage && <p className="font-semibold">{saveMessage}</p>}
    </div>
  );
};

export default AparaturEditForm;
