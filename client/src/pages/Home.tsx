import Primitive from "../components/reusable/Primitive.tsx";
import SimpleSection from "../components/reusable/SimpleSection.tsx";
import useFetch from "../hooks/useFetch.tsx";
import type { DeskripsiSekilas } from "../types/Profil.d.ts";
import type { Aparatur } from "../types/Aparatur.d.ts";
import { Link } from "react-router";
import { dateToText } from "../helpers/dateToText.ts";
import useArticle from "../hooks/useArticle.tsx";
import { serverApi } from "../helpers/serverApi.ts";
import Card from "../components/reusable/Card.tsx";
import Carousel from "../components/reusable/Carousel.tsx";

const Home = () => {
  const {
    data: profilSekilas,
    isLoading: _profilSekilasIsLoading,
    isError: _profilSekilasIsError,
  } = useFetch<DeskripsiSekilas>(
    serverApi.get.profil.description(),
  );

  const {
    data: aparaturDesa,
    isLoading: aparaturDesaIsLoading,
    isError: _aparaturDesaIsError,
  } = useFetch<Omit<Aparatur, "kata_sandi" | "foto">>(
    serverApi.get.aparatur.all(),
  );

  const { data: artikelTerbaru } = useArticle();

  return (
    <Primitive>
      <SimpleSection subtitle="PROFIL SEKILAS">
        {profilSekilas?.[0]?.deskripsi_sekilas ??
          (
            <p className="font-bold">
              Profil sekilas belum dibuat admin website
            </p>
          )}
      </SimpleSection>

      <SimpleSection subtitle="APARATUR DESA">
        {aparaturDesaIsLoading
          ? <p>Memuat data...</p>
          : aparaturDesa && aparaturDesa.length > 0
          ? (
            <Carousel>
              {aparaturDesa.map((aparatur) => (
                <Card
                  key={aparatur.aparatur_id}
                  image={serverApi.get.aparatur.photo(aparatur.aparatur_id)}
                  alt={aparatur.jabatan}
                  title={aparatur.nama}
                  aspect="2x3"
                >
                  <p>{aparatur.jabatan}</p>
                </Card>
              ))}
            </Carousel>
          )
          : (
            <p className="font-bold">
              Aparatur desa belum dibuat admin website
            </p>
          )}
      </SimpleSection>

      {artikelTerbaru && (
        <SimpleSection subtitle="ARTIKEL TERKINI">
          <div className="my-4 flow-root">
            <Link
              to={`/pengumuman/${artikelTerbaru.artikel_id}`}
            >
              <img
                className="rounded-2xl object-cover max-w-1/2 float-left mr-4 | transition duration-300 ease-in-out hover:brightness-75"
                src={serverApi.get.artikel.thumbnail(artikelTerbaru.artikel_id)}
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
                  to={`/pengumuman/${artikelTerbaru.artikel_id}`}
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
                  <span className="flex flex-wrap gap-2 mb-2">
                    {artikelTerbaru.labels.map((l) => (
                      <span
                        key={l.label_id}
                        className="text-xs font-bold bg-black text-white rounded-full px-2 py-1"
                      >
                        {l.nama}
                      </span>
                    ))}
                  </span>
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
