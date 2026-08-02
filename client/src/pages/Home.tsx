import Primitive from "../components/reusable/Primitive.tsx";
import SimpleSection from "../components/reusable/SimpleSection.tsx";
import ManualCarousel from "../components/reusable/ManualCarousel.tsx";
import useFetch from "../hooks/useFetch.tsx";
import type { DeskripsiSekilas } from "../types/Profil.d.ts";
import type { Aparatur } from "../types/Aparatur.d.ts";
import { Link } from "react-router";
import { dateToText } from "../helpers/dateToText.ts";
import useArticle from "../hooks/useArticle.tsx";

const Home = () => {
  const {
    data: profilSekilas,
    isLoading: _profilSekilasIsLoading,
    isError: _profilSekilasIsError,
  } = useFetch<DeskripsiSekilas>(
    `http://${globalThis.location.hostname}:8000/profil/deskripsi`,
  );

  const {
    data: aparaturDesa,
    isLoading: _aparaturDesaIsLoading,
    isError: _aparaturDesaIsError,
  } = useFetch<Omit<Aparatur, "kata_sandi" | "foto">>(
    `http://${globalThis.location.hostname}:8000/aparatur`,
  );

  const aparaturItems = aparaturDesa?.map((aparatur) => ({
    id: aparatur.aparatur_id,
    title: aparatur.nama,
    subtitle: aparatur.jabatan,
    photo:
      `http://${globalThis.location.hostname}:8000/aparatur/foto/${aparatur.aparatur_id}`,
  })) ?? [];

  const { data: artikelTerbaru } = useArticle();

  return (
    <Primitive>
      <SimpleSection subtitle="PROFIL SEKILAS">
        {profilSekilas?.[0]?.deskripsi_sekilas ??
          <p className="font-bold">Profil sekilas belum tersedia</p>}
      </SimpleSection>

      <SimpleSection subtitle="APARATUR DESA">
        {aparaturItems.length < 1
          ? <p className="font-bold">Profil sekilas belum tersedia</p>
          : (
            <ManualCarousel
              minCardWidth={180}
              maxVisibleCards={8}
              pixelGap={16}
              items={aparaturItems}
            />
          )}
      </SimpleSection>

      {artikelTerbaru && (
        <SimpleSection subtitle="ARTIKEL TERKINI">
          <div className="my-4 flow-root">
            <Link
              to={`${globalThis.location.origin}/pengumuman/${artikelTerbaru.artikel_id}`}
            >
              <img
                className="rounded-2xl object-cover max-w-1/2 float-left mr-4 | transition duration-300 ease-in-out hover:brightness-75"
                src={`http://${globalThis.location.hostname}:8000/artikel/thumbnail/${artikelTerbaru.artikel_id}`}
                alt="foto-cover-artikel-terkini"
                onError={(e) => {
                  e.currentTarget.src = "/tidak-ada-gambar-box.png";
                  e.currentTarget.onerror = null;
                }}
              />
            </Link>
            <div>
              <div className="mb-4">
                <Link
                  to={`${globalThis.location.origin}/pengumuman/${artikelTerbaru.artikel_id}`}
                  className="font-bold text-2xl"
                >
                  <h2 className="text-black hover:text-blue-900 active:text-blue-800">
                    {artikelTerbaru.judul}
                  </h2>
                  <h3 className="text-black hover:text-blue-900 active:text-blue-800 | text-xs">
                    {dateToText(new Date(artikelTerbaru.waktu_upload * 1000))}
                  </h3>
                </Link>
              </div>
              <p className="text-justify whitespace-pre-line">
                {artikelTerbaru.labels.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {artikelTerbaru.labels.map((l) => (
                      <span
                        key={l.label_id}
                        className="text-xs font-bold bg-black text-white rounded-full px-2 py-1"
                      >
                        {l.nama}
                      </span>
                    ))}
                  </div>
                )}
                {artikelTerbaru.isi}
              </p>
            </div>
          </div>
        </SimpleSection>
      )}
    </Primitive>
  );
};

export default Home;
