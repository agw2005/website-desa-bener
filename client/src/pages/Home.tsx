import Primitive from "../components/reusable/Primitive.tsx";
import SimpleSection from "../components/reusable/SimpleSection.tsx";
import ManualCarousel from "../components/reusable/ManualCarousel.tsx";
import NumberInput from "../components/reusable/inputs/NumberInput.tsx";
import { useState } from "react";
import PasswordInput from "../components/reusable/inputs/PasswordInput.tsx";
import Button from "../components/reusable/Button.tsx";

const APARATUR_DESA = [
  {
    title: "Kepala Desa",
    subtitle: "Beni Saefudin",
    photo: "example-profile.jpg",
  },
  {
    title: "Kepala Dusun Krajan I",
    subtitle: "Kadus 1",
    photo: "example-profile.jpg",
  },
  {
    title: "Kepala Dusun Krajan II",
    subtitle: "Kadus 2",
    photo: "example-profile.jpg",
  },
  {
    title: "Kepala Dusun Cebongan",
    subtitle: "Kadus 3",
    photo: "example-profile.jpg",
  },
  {
    title: "Kepala Dusun Tuguh",
    subtitle: "Kadus 4",
    photo: "example-profile.jpg",
  },
  {
    title: "Kepala Dusun Karangbalong",
    subtitle: "Kadus 5",
    photo: "example-profile.jpg",
  },
  {
    title: "Kepala Dusun Kadipurwo",
    subtitle: "Kadus 6",
    photo: "example-profile.jpg",
  },
  {
    title: "Sekretaris I",
    subtitle: "Sekdes 1",
    photo: "example-profile.jpg",
  },
  {
    title: "Sekretaris II",
    subtitle: "Sekdes 2",
    photo: "example-profile.jpg",
  },
];

const PROFIL_SEKILAS =
  'Desa Prayungan memiliki akar sejarah yang erat dengan era Kerajaan Majapahit, di mana asal-usul namanya diambil dari peristiwa "Perang Uyang-Uyungan". Menurut kisah turun-temurun, perang sengit dan lama tersebut melibatkan seorang tokoh sakti setempat bernama Kyai Tjok Brosot melawan Putra Kyai Sendang Drajat Sedayu, yang dipicu oleh perebutan istri Kyai Tjok Brosot yang berparas cantik, Nyai Tani, setelah sebuah sayembara menanam padi. Tempat di mana pertempuran hebat secara uyang-uyungan (saling mengejar/berkelit) itu berlangsung kini abadi menjadi nama Desa Prayungan, yang pada awalnya berfungsi sebagai area pendopo atau tempat menerima tamu (dayohan) milik keluarga Kyai Tjok Brosot.';

const LAYANAN_MANDIRI = [
  "Surat Pengantar SKCK",
  "Surat Keterangan Kelahiran & Kematian",
  "Surat Keterangan Kependudukan",
  "Surat Keterangan Pindah",
];

const Home = () => {
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Primitive>
      <SimpleSection subtitle="PROFIL SEKILAS">
        {PROFIL_SEKILAS}
      </SimpleSection>

      <SimpleSection subtitle="APARATUR DESA">
        <ManualCarousel visibleCards={7} pixelGap={16} items={APARATUR_DESA} />
      </SimpleSection>

      <SimpleSection subtitle="LAYANAN MANDIRI">
        <div className="flex gap-8">
          <div className="bg-blue-300 flex-1 border p-4 rounded-2xl">
            <h3 className="text-xl font-bold">LAYANAN YANG TERSEDIA</h3>
            <ul className="list-disc">
              {LAYANAN_MANDIRI.map((layanan, index) => (
                <li key={index} className="list-inside">{layanan}</li>
              ))}
            </ul>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <NumberInput
              label="NIK"
              name="nik-umum"
              id="nik-umum"
              value={nik}
              onChangeHandler={(e) => setNik(e.currentTarget.value)}
            />
            <PasswordInput
              label="Kata Sandi"
              name="password-umum"
              id="password-umum"
              value={password}
              onChangeHandler={(e) => setPassword(e.currentTarget.value)}
            />
            <Button
              className="w-max"
              onClick={() => {
                console.log({ nik, password });
              }}
              variant="black"
            >
              Login
            </Button>
          </div>
          <div className="bg-red-500 flex-1 p-4 rounded-2xl flex items-center justify-center font-bold text-4xl">
            <h3 className="text-center">HUBUNGI DESA UNTUK PEMBUATAN AKUN</h3>
          </div>
        </div>
      </SimpleSection>

      <SimpleSection subtitle="ARTIKEL TERKINI">
        <div className="flex gap-8 my-4">
          <img
            className="rounded-2xl flex-1"
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
