import Primitive from "../components/reusable/Primitive.tsx";
import SimpleSection from "../components/reusable/SimpleSection.tsx";
import ManualCarousel from "../components/reusable/ManualCarousel.tsx";
import useFetch from "../hooks/useFetch.tsx";
import type { DeskripsiSekilas } from "../types/Profil.d.ts";
import type { Aparatur } from "../types/Aparatur.d.ts";

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
    title: aparatur.nama,
    subtitle: aparatur.jabatan,
    photo:
      `http://${globalThis.location.hostname}:8000/aparatur/foto/${aparatur.aparatur_id}`,
  })) ?? [];

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

      <SimpleSection subtitle="ARTIKEL TERKINI">
        <div className="flex gap-8 my-4">
          <img
            className="rounded-2xl flex-1 object-cover w-full h-full self-center"
            src="example-artikel-terkini.png"
            alt="foto-cover-artikel-terkini"
          />
          <p>
            Karanganyar Bersholawat menjadi salah satu rangkaian kegiatan dalam
            Sedekah Bumi yang diselenggarakan pada Kamis, 9 Juli 2026, di
            Lapangan Sumringah, Desa Karanganyar, mulai pukul 20.00 WIB.
            Kegiatan ini dihadiri oleh perangkat desa, tokoh agama, mahasiswa
            KKN Universitas Jenderal Soedirman (Unsoed), serta masyarakat dari
            berbagai kalangan. Suasana religius semakin khidmat dengan lantunan
            sholawat yang diiringi oleh Grup Hadroh Sabilul Jannah, sehingga
            jamaah dapat mengikuti rangkaian acara dengan penuh kekhusyukan.
            <br />
            <br />
            Sholawat bersama ini diselenggarakan sebagai wujud rasa syukur
            masyarakat kepada Allah SWT atas segala nikmat, kesehatan,
            keselamatan, serta hasil yang telah diperoleh, khususnya rezeki dan
            hasil panen yang menjadi sumber penghidupan masyarakat. Kegiatan ini
            juga menjadi ikhtiar bersama untuk memohon keberkahan, ketenteraman,
            dan kemudahan dalam menjalani kehidupan pada masa yang akan datang.
            <br />
            <br />
            Acara diawali dengan pembukaan dan sambutan dari kepala desa.
            Rangkaian kegiatan kemudian dilanjutkan dengan pembacaan sholawat
            dan doa bersama yang diiringi oleh Grup Hadroh Sabilul Jannah.
            Seluruh peserta mengikuti setiap rangkaian kegiatan dengan tertib
            dan penuh khidmat hingga acara selesai.
            <br />
            <br />
            Antusiasme masyarakat terlihat dari banyaknya warga yang hadir dan
            memenuhi Lapangan Sumringah. Kehadiran berbagai unsur masyarakat,
            mulai dari anak-anak, remaja, hingga orang tua, mencerminkan
            semangat kebersamaan dalam menjaga tradisi serta memperkuat
            nilai-nilai keagamaan yang telah diwariskan secara turun-temurun.
            <br />
            <br />
            Karanganyar Bersholawat menjadi sarana mempererat silaturahmi
            antarmasyarakat sekaligus memperkuat kebersamaan di tengah kehidupan
            bermasyarakat. Momentum ini juga mencerminkan komitmen masyarakat
            Desa Karanganyar dalam menjaga tradisi keagamaan yang selaras dengan
            nilai-nilai budaya lokal sebagai identitas desa.
            <br />
            <br />
            Karanganyar Bersholawat tidak hanya memperkuat nilai-nilai
            keagamaan, tetapi juga menjadi bagian dari upaya melestarikan
            tradisi Sedekah Bumi sebagai warisan budaya yang terus dijaga oleh
            masyarakat Desa Karanganyar. Kegiatan ini diharapkan dapat
            mempererat persaudaraan, meningkatkan kepedulian sosial, serta
            menumbuhkan semangat gotong royong dalam membangun kehidupan
            masyarakat yang harmonis.
          </p>
        </div>
      </SimpleSection>
    </Primitive>
  );
};

export default Home;
