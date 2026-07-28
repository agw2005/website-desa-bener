import { useEffect, useState } from "react";
import AparaturDesa from "../components/reusable/AparaturDesa.tsx";
import Button from "../components/reusable/Button.tsx";
import Primitive from "../components/reusable/Primitive.tsx";
import RoundedSection from "../components/reusable/RoundedSection.tsx";
import Schedule from "../components/reusable/Schedule.tsx";
import useFetch from "../hooks/useFetch.tsx";
import type { Aparatur } from "../types/Aparatur.d.ts";
import TextInput from "../components/reusable/inputs/TextInput.tsx";
import { isValidEmail } from "../helpers/isValidEmail.ts";
import type { Komentar } from "../types/Komentar.d.ts";
import TextAreaInput from "../components/reusable/inputs/TextAreaInput.tsx";
import useAuth from "../hooks/useAuth.tsx";

const Kontak = () => {
  const { isLoggedIn, authIsLoading: __, authInfo: _ } = useAuth();

  const [indexAparaturDesa, setIndexAparaturDesa] = useState(0);
  const [inputNama, setInputNama] = useState("");
  const [inputSurel, setInputSurel] = useState("");
  const [inputIsi, setInputIsi] = useState("");
  const [namaIsEmpty, setNamaIsEmpty] = useState(false);
  const [isiIsEmpty, setIsiIsEmpty] = useState(false);
  const [emailIsNotValid, setEmailisNotValid] = useState(false);
  const [komentarList, setKomentarList] = useState<Komentar[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [isLoadingKomentar, setIsLoadingKomentar] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [isSubmittingKomentar, setIsSubmittingKomentar] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [deletingKomentarId, setDeletingKomentarId] = useState<number | null>(
    null,
  );

  const {
    data: aparaturDesa,
    isLoading: _aparaturDesaIsLoading,
    isError: _aparaturDesaIsError,
  } = useFetch<Omit<Aparatur, "kata_sandi" | "foto">>(
    `http://${globalThis.location.hostname}:8000/aparatur`,
  );

  const fetchKomentarPage = async (cursor: number | null) => {
    setIsLoadingKomentar(true);

    try {
      const url = new URL(
        `http://${globalThis.location.hostname}:8000/komentar`,
      );
      if (cursor !== null) url.searchParams.set("cursor", String(cursor));
      url.searchParams.set("limit", "10");

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { komentar, next_cursor }: {
        komentar: Komentar[];
        next_cursor: number | null;
      } = await response.json();

      setKomentarList((
        prev,
      ) => (cursor === null ? komentar : [...prev, ...komentar]));
      setNextCursor(next_cursor);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingKomentar(false);
      setHasLoadedOnce(true);
    }
  };

  useEffect(() => {
    fetchKomentarPage(null);
  }, []);

  const handleLoadMoreKomentar = () => {
    if (nextCursor !== null) {
      fetchKomentarPage(nextCursor);
    }
  };

  const refreshKomentarList = () => {
    setKomentarList([]);
    setNextCursor(null);
    fetchKomentarPage(null);
  };

  const handleSubmitKomentar = async () => {
    setNamaIsEmpty(false);
    setIsiIsEmpty(false);
    setEmailisNotValid(false);
    setSubmitError(null);

    if (inputNama.trim() === "") {
      setNamaIsEmpty(true);
      return;
    }
    if (!isValidEmail(inputSurel)) {
      setEmailisNotValid(true);
      return;
    }
    if (inputIsi.trim() === "") {
      setIsiIsEmpty(true);
      return;
    }

    setIsSubmittingKomentar(true);

    try {
      const response = await fetch(
        `http://${globalThis.location.hostname}:8000/komentar`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nama: inputNama.trim(),
            surel: inputSurel.trim(),
            isi: inputIsi.trim(),
          }),
        },
      );

      if (response.ok) {
        setInputNama("");
        setInputSurel("");
        setInputIsi("");
        refreshKomentarList();
      } else {
        const errorBody = await response.json();
        setSubmitError(errorBody.error ?? "Gagal mengunggah komentar.");
      }
    } catch (err) {
      console.error(err);
      setSubmitError("Gagal mengunggah komentar. Periksa koneksi Anda.");
    } finally {
      setIsSubmittingKomentar(false);
    }
  };

  const handleDeleteKomentar = async (id: number) => {
    setDeletingKomentarId(id);

    try {
      const response = await fetch(
        `http://${globalThis.location.hostname}:8000/komentar/${id}`,
        { method: "DELETE" },
      );

      if (response.ok) {
        setKomentarList((prev) => prev.filter((k) => k.komentar_id !== id));
      } else {
        const errorBody = await response.json();
        console.error(errorBody.error ?? "Gagal menghapus komentar.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingKomentarId(null);
    }
  };

  return (
    <Primitive>
      <div className="flex flex-col gap-8 px-32">
        <div className="flex gap-8">
          <div className="flex flex-col flex-1 gap-8">
            {aparaturDesa && (
              <RoundedSection
                title={`APARATUR DESA`}
                contentClassName="flex flex-col gap-3 items-center"
              >
                <AparaturDesa
                  name={aparaturDesa[indexAparaturDesa]?.nama}
                  position={aparaturDesa[indexAparaturDesa]?.jabatan}
                  phone={aparaturDesa[indexAparaturDesa]?.telepon}
                  photo={`http://${globalThis.location.hostname}:8000/aparatur/foto/${
                    aparaturDesa[indexAparaturDesa]?.aparatur_id
                  }`}
                />
                <p>{indexAparaturDesa + 1}/{aparaturDesa.length}</p>
                <div className="flex justify-around w-full self-stretch">
                  <Button
                    variant="black"
                    onClick={() => {
                      indexAparaturDesa < 1
                        ? setIndexAparaturDesa((_prev) =>
                          aparaturDesa.length - 1
                        )
                        : setIndexAparaturDesa((prev) => prev - 1);
                    }}
                  >
                    SEBELUM
                  </Button>
                  <Button
                    variant="black"
                    onClick={() => {
                      indexAparaturDesa === aparaturDesa.length - 1
                        ? setIndexAparaturDesa((_prev) => 0)
                        : setIndexAparaturDesa((prev) => prev + 1);
                    }}
                  >
                    BERIKUT
                  </Button>
                </div>
              </RoundedSection>
            )}
            <RoundedSection
              title={`KOMENTAR`}
              contentClassName="flex flex-col gap-3"
            >
              <TextInput
                label="NAMA"
                name="nama-komentator"
                id="nama-komentator"
                value={inputNama}
                onChangeHandler={(e) => {
                  setInputNama(e.target.value);
                }}
              />
              <TextInput
                label="SUREL"
                name="surel-komentator"
                id="surel-komentator"
                value={inputSurel}
                onChangeHandler={(e) => {
                  setInputSurel(e.target.value);
                }}
              />
              <TextAreaInput
                label="ISI KOMENTAR"
                name="isi-komentar"
                id="isi-komentar"
                value={inputIsi}
                onChangeHandler={(e) => {
                  setInputIsi(e.target.value);
                }}
                rows={3}
              />
              <Button
                variant="black"
                onClick={handleSubmitKomentar}
                disabled={isSubmittingKomentar}
              >
                {isSubmittingKomentar ? "Mengunggah..." : "UNGGAH"}
              </Button>

              {namaIsEmpty && (
                <div className="bg-red-500 text-white font-bold px-4 py-2 text-center rounded-2xl">
                  Nama wajib diisi
                </div>
              )}
              {isiIsEmpty && (
                <div className="bg-red-500 text-white font-bold px-4 py-2 text-center rounded-2xl">
                  Isi komentar wajib diisi
                </div>
              )}
              {emailIsNotValid && (
                <div className="bg-red-500 text-white font-bold px-4 py-2 text-center rounded-2xl">
                  Surel tidak valid
                </div>
              )}
              {submitError && (
                <div className="bg-red-500 text-white font-bold px-4 py-2 text-center rounded-2xl">
                  {submitError}
                </div>
              )}
            </RoundedSection>
          </div>
          <RoundedSection
            title={`${komentarList.length} KOMENTAR`}
            titleClassName="flex-4"
            contentClassName="flex flex-col gap-4"
          >
            {komentarList.map((komentar) => (
              <Schedule
                key={komentar.komentar_id}
                title={`${komentar.nama} ${
                  isLoggedIn ? `(${komentar.surel})` : ""
                }`}
                date={new Date(komentar.waktu_upload * 1000)}
              >
                <div className="flex flex-col gap-2">
                  <p>{komentar.isi}</p>
                  {isLoggedIn && (
                    <Button
                      variant="red"
                      onClick={() => handleDeleteKomentar(komentar.komentar_id)}
                      disabled={deletingKomentarId === komentar.komentar_id}
                      className="w-max"
                    >
                      {deletingKomentarId === komentar.komentar_id
                        ? "Menghapus..."
                        : "Hapus"}
                    </Button>
                  )}
                </div>
              </Schedule>
            ))}

            {hasLoadedOnce && komentarList.length === 0 && (
              <p className="text-center text-gray-500">Belum ada komentar.</p>
            )}

            {nextCursor !== null && (
              <div className="flex justify-center">
                <Button
                  variant="black"
                  onClick={handleLoadMoreKomentar}
                  disabled={isLoadingKomentar}
                >
                  {isLoadingKomentar ? "Memuat..." : "Muat Lebih Banyak"}
                </Button>
              </div>
            )}
          </RoundedSection>
        </div>
      </div>
    </Primitive>
  );
};

export default Kontak;
