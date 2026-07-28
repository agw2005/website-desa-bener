import Primitive from "../components/reusable/Primitive.tsx";
import ArticleSection from "../components/reusable/ArticleSection.tsx";
import RoundedSection from "../components/reusable/RoundedSection.tsx";
import TextInput from "../components/reusable/inputs/TextInput.tsx";
import { useEffect, useState } from "react";
import TextAreaInput from "../components/reusable/inputs/TextAreaInput.tsx";
import useFetch from "../hooks/useFetch.tsx";
import DropdownInput from "../components/reusable/inputs/DropdownInput.tsx";
import Button from "../components/reusable/Button.tsx";
import ManyFileInput from "../components/reusable/inputs/ManyFileInput.tsx";
import type { Label } from "../types/Label.d.ts";
import type { ArtikelWithLabel } from "../types/Artikel.d.ts";
import useAuth from "../hooks/useAuth.tsx";

const Pengumuman = () => {
  const { isLoggedIn, authIsLoading: __, authInfo: _ } = useAuth();

  const [judulArtikelBaru, setJudulArtikelBaru] = useState("");
  const [isiArtikelBaru, setIsiArtikelBaru] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<Label[]>([]);
  const [lampiran, setLampiran] = useState<File[]>([]);
  const [requiredInputIsEmpty, setRequiredInputIsEmpty] = useState(false);
  const [success, setSuccess] = useState(false);
  const [artikelList, setArtikelList] = useState<ArtikelWithLabel[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [isLoadingArtikel, setIsLoadingArtikel] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [labelFilter, setLabelFilter] = useState<number | "">("");

  const { data: label } = useFetch<Label>(
    `http://${globalThis.location.hostname}:8000/label`,
  );

  const availableLabels = label
    ? label.filter(
      (l) => !selectedLabels.some((sel) => sel.label_id === l.label_id),
    )
    : [];

  const handleSelectLabel = (id: number) => {
    const found = label?.find((l) => l.label_id === id);
    if (found) {
      setSelectedLabels((prev) => [...prev, found]);
    }
  };

  const handleRemoveLabel = (id: number) => {
    setSelectedLabels((prev) => prev.filter((l) => l.label_id !== id));
  };

  const handleAddFile = (file: File) => {
    setLampiran((prev) => [...prev, file]);
  };

  const handleRemoveFile = (index: number) => {
    setLampiran((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setRequiredInputIsEmpty(false);
    setSuccess(false);

    if (judulArtikelBaru.trim() === "" || isiArtikelBaru.trim() === "") {
      setRequiredInputIsEmpty(true);
      return;
    }

    const formData = new FormData();
    formData.append("judul", judulArtikelBaru);
    formData.append("isi", isiArtikelBaru);

    for (const label of selectedLabels) {
      formData.append("label_id", String(label.label_id));
    }

    for (const file of lampiran) {
      formData.append("lampiran", file);
    }

    try {
      const response = await fetch(
        `http://${globalThis.location.hostname}:8000/artikel`,
        { method: "POST", body: formData },
      );

      if (response.ok) {
        setJudulArtikelBaru("");
        setIsiArtikelBaru("");
        setSelectedLabels([]);
        setLampiran([]);
        setSuccess(true);
        refreshArtikelList();
      } else {
        console.error(await response.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const seconds = 5;
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, seconds * 1000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  const fetchArtikelPage = async (
    cursor: number | null,
    labelId: number | "" = labelFilter,
  ) => {
    setIsLoadingArtikel(true);

    try {
      const url = new URL(
        `http://${globalThis.location.hostname}:8000/artikel`,
      );
      if (cursor !== null) url.searchParams.set("cursor", String(cursor));
      url.searchParams.set("limit", "9");
      if (labelId !== "") url.searchParams.set("label_id", String(labelId));

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { items, next_cursor }: {
        items: ArtikelWithLabel[];
        next_cursor: number | null;
      } = await response.json();

      setArtikelList((prev) => (cursor === null ? items : [...prev, ...items]));
      setNextCursor(next_cursor);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingArtikel(false);
      setHasLoadedOnce(true);
    }
  };

  useEffect(() => {
    setArtikelList([]);
    setNextCursor(null);
    fetchArtikelPage(null, labelFilter);
  }, [labelFilter]);

  const handleLoadMore = () => {
    if (nextCursor !== null) {
      fetchArtikelPage(nextCursor);
    }
  };

  // After a successful new article submission, refresh the list from page 1
  // so the newly created article (highest ID) appears at the top.
  const refreshArtikelList = () => {
    setArtikelList([]);
    setNextCursor(null);
    fetchArtikelPage(null);
  };

  return (
    <Primitive>
      <div className="flex flex-col gap-8 px-32">
        {isLoggedIn && (
          <RoundedSection title="Buat Artikel Baru" contentClassName="gap-4">
            <TextInput
              label="Judul"
              name="judul-artikel-baru"
              id="judul-artikel-baru"
              value={judulArtikelBaru}
              onChangeHandler={(e) => {
                setJudulArtikelBaru(e.target.value);
              }}
              placeholder="Contoh: Rekrutmen Turnamen Voli Tingkat Kelurahan"
            />
            <TextAreaInput
              label="Isi Artikel"
              name="isi-artikel-baru"
              id="isi-artikel-baru"
              value={isiArtikelBaru}
              onChangeHandler={(e) => {
                setIsiArtikelBaru(e.target.value);
              }}
              rows={16}
            />
            <ManyFileInput
              label="Lampiran"
              name="lampiran-artikel-baru"
              id="lampiran-artikel-baru"
              files={lampiran}
              onAdd={handleAddFile}
              onRemove={handleRemoveFile}
              placeholder="Unggah lampiran"
              accept=".png,.jpeg,.jpg"
            />
            {label && (
              <div className="flex flex-col gap-2">
                <DropdownInput
                  label="Label"
                  name="selected-label"
                  id="selected-label"
                  value=""
                  options={availableLabels}
                  getId={(label) => label.label_id}
                  getLabel={(label) =>
                    label.nama}
                  onChangeHandler={handleSelectLabel}
                  placeholder="Pilih label untuk artikel"
                />
                {selectedLabels.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedLabels.map((l) => (
                      <span
                        key={l.label_id}
                        className="flex items-center gap-2 border border-black bg-black text-white rounded-full px-3 py-1 text-sm select-none"
                      >
                        {l.nama}
                        <Button
                          type="button"
                          onClick={() => handleRemoveLabel(l.label_id)}
                          className="leading-none hover:text-red-400"
                          aria-label={`Hapus label ${l.nama}`}
                          variant="red"
                        >
                          Hapus
                        </Button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div className="flex gap-2">
              <Button variant="black" className="w-max" onClick={handleSubmit}>
                Unggah Artikel
              </Button>
              {requiredInputIsEmpty && (
                <div className="bg-red-500 text-white font-bold px-4 py-2 w-max rounded-2xl">
                  Judul dan Isi wajib diisi
                </div>
              )}
              {success && (
                <div className="bg-green-800 text-white font-bold px-4 py-2 w-max rounded-2xl">
                  Artikel berhasil diunggah
                </div>
              )}
            </div>
          </RoundedSection>
        )}
        {label && (
          <DropdownInput
            label="Filter Label"
            name="filter-label"
            id="filter-label"
            value={labelFilter}
            options={label}
            getId={(l) => l.label_id}
            getLabel={(l) => l.nama}
            onChangeHandler={setLabelFilter}
            placeholder="Semua Label"
          />
        )}
        <div className="grid grid-cols-3 gap-8">
          {artikelList.map((artikel) => (
            <ArticleSection
              articleId={artikel.artikel_id}
              title={artikel.judul}
              uploadDate={artikel.waktu_upload * 1000}
              key={artikel.artikel_id}
            >
              {artikel.labels.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {artikel.labels.map((l) => (
                    <span
                      key={l.label_id}
                      className="text-xs font-bold bg-black text-white rounded-full px-2 py-1"
                    >
                      {l.nama}
                    </span>
                  ))}
                </div>
              )}
              {artikel.isi}
            </ArticleSection>
          ))}
        </div>

        {hasLoadedOnce && artikelList.length === 0 && (
          <p className="text-center text-gray-500">Belum ada artikel.</p>
        )}

        {nextCursor !== null && (
          <div className="flex justify-center">
            <Button
              variant="black"
              onClick={handleLoadMore}
              disabled={isLoadingArtikel}
            >
              {isLoadingArtikel ? "Memuat..." : "Muat Lebih Banyak"}
            </Button>
          </div>
        )}
      </div>
    </Primitive>
  );
};

export default Pengumuman;
