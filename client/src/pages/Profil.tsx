import Primitive from "../components/reusable/Primitive.tsx";
import RoundedSection from "../components/reusable/RoundedSection.tsx";
import useFetch from "../hooks/useFetch.tsx";
import type { ProfilDesaData } from "../types/Profil.d.ts";

// const _PROFIL_DESA = {
//   kodeDesa: 111111,
//   kecamatan: "Tengaran",
//   kabupatenKota: "Kabupaten Semarang",
//   provinsi: "Jawa Tengah",
//   tahunPembentukan: 2007,
//   luas: 4.261,
//   koordinat: "29.15 BT / 28.19 LU",
//   tipologi: "PERLADANGAN",
//   klasifikasi: "SWADAYA",
//   kategori: "MADYA",
//   batasTimur: "Boyan Tanjung, Mujan",
//   batasBarat: "Riam Piyang",
//   batasSelatan: "Pemawan",
//   batasUtara: "Tubang Jaya",
// };

const VISI =
  "Terwujudnya Masyaraakat Desa Yang Aman, Tenteram, Maju, Makmur dan berkeadilan menuju kemandirian. Dengan motto mengabdi setulus hati.";

const MISI = [
  "Mewujudkan Tata Kelola Pemerintahan Desa yang bersih, jujur, akuntabel,, transparant bebas dari Korupsi, Kolusi dan Nepotisme",
  "Mewujudkan pengelolaan Sumber Daya Alam dan Sumber Daya manusia yang berkesinambungan",
  "Menciptakan kondisi desa yang konduksif dan berbudaya yang berjiwa kegotongroyongan",
  "Meningkatkan kesejahteraan masyarakat melalui peningkatan ketrampilan/life skill",
];

const SEJARAH =
  "Terjadinya Desa Prayungan, hampir bersamaan dengan jaman kerajaan majapahit, Jalan ceritanya adalah sebagaimana berikut : Kyai Tjok Brosot begitulah orang tua terdahulu di Desa Menyebutkan, hidup dengan seorang istri bernama Nyai Tani. Kehidupan keluarga ini bahagia dan sejahtera, disamping saling mengasihi mereka pun rajin bertani, mereka memiliki seorang pembantu yang sangat sakti dan bijaksana bernama Sungging Purbongkoro. Menurut Dongeng Sesepuh Desa, bahwa rumah Kyai Tjok Brosot  terletak di suatu tempat yang dinamakan Desa Juma, Pendoponya (tempat untuk menerima tamu) di dayohan (prayungan), dapurnya di mejuwet, sawahnya di Desa Pratun yang di sebut sawah lembak. Istri Tjok Brosot (Nyai Tani) terkenal dengan kecantikannya, sehingga banyak orang-orang yang ingin merebutnya dari Tjok Brosot. Pada suatu hari datanglah seorang tamu/dayoh, yaitu Putro Kyai Sendang Drajat Sedayu. Kedatangnya bermaksud untuk mengadu kesaktiannya dengan Tjok Brosot, disamping itu tamu tersebut juga ingin merebut Nyai Tani dari tangan Tjok Brosot. Kyai Tjok Brosot sangat termashur dengan kesaktiannya baik dalam ilmu bela diri maupun ilmu pertanian. Dalam hikayatnya diceritakan kesaktian Kyai Tjok Brosot di bidang pertanian adalah setiap beliau menanam padi pasti hasilnya melimpah ruah dan ulen padinya panjangnya satu lengan lebih, sehingga tiada yang mampu menyaingi hasil panen dari Kyai Tjok Brosot. Mengetahui demikian Putro Kyai Sendang pun tidak kehilangan akal, dia menantang Kyai Tjok Brosot adu kesaktian dengannya, barang siapa yang mampu menanam padi meskipun tumbuhan padinya pendek tetapi hasilnya melimpah dan ulen padinya panjang, Kyai Tjok Brosot menganggap itu hal yang mudah dan menyanggupinya, beliau berkata : (Tak ladeni apa sing dadi kekarepanmu lan menawa aku kalah Nyai Tani dak pasrahke Sliramu, ananging yen ora gelem karo sliramu Nyai Tani ojo dipekso) Maka dimulailah pertandingan menanam padi tersebut. Setelah beberapa bulan menunggu tanaman Padi yang tumbuh ternyata yang menang adalah Putro Kyai Sendang Drajat, dan dengan berat hati Kyai Tjok Brosot pun menepati janjinya untuk menyerahkan Nyai Tani ke tangan Putro Kyai Sendang Drajat. Akan tetapi Nyai Tani tidak bersedia dibawa oleh Putro Kyai Sendang Drajat, sehingga diapun dipaksa akan dibawa pergi. Mendengar hal tersebut Kyai Tjok Brosot pun marah dan mengadu kesaktian bela dirinya dengan Putro Kyai Sendang Drajat Sedayu, Perang pun berlangsung dengan sengit dan lama secara Uyang uyungan, dan tempat berlangsungnya perang tersebut ahkirnya diberi nama Prayungan sampai sekarang ini. Jadi Asal-Usul Nama Prayungan berasal dari nama \“Perang Uyang-Uyungan\”.";

const Profil = () => {
  const {
    data: profilDesa,
    isLoading: _profilDesaIsLoading,
    isError: _profilDesaIsError,
  } = useFetch<ProfilDesaData>(
    `http://${globalThis.location.hostname}:8000/profil/data`,
  );

  return (
    <Primitive>
      <div className="flex flex-col gap-8 px-32">
        <div className="flex gap-8">
          {profilDesa && (
            <RoundedSection title="PROFIL DESA">
              <ul>
                <li>
                  <strong>Kode Desa (PUM)</strong> : {profilDesa[0].kode_desa}
                </li>
                <li>
                  <strong>Kecamatan</strong> : {profilDesa[0].kecamatan}
                </li>
                <li>
                  <strong>Kabupaten/Kota</strong> :{" "}
                  {profilDesa[0].kabupaten_kota}
                </li>
                <li>
                  <strong>Provinsi</strong> : {profilDesa[0].provinsi}
                </li>
                <li>
                  <strong>Tahun Pembentukan</strong> :{" "}
                  {profilDesa[0].tahun_pembentukan}
                </li>
                <li>
                  <strong>Luas Desa/Kelurahan (Ha)</strong> :{" "}
                  {profilDesa[0].luas}
                </li>
                <li>
                  <strong>Koordinat</strong> : {profilDesa[0].koordinat}
                </li>
                <li>
                  <strong>Tipologi</strong> : {profilDesa[0].tipologi}
                </li>
                <li>
                  <strong>Klasifikasi</strong> : {profilDesa[0].klasifikasi}
                </li>
                <li>
                  <strong>Kategori</strong> : {profilDesa[0].kategori}
                </li>
                <li>
                  <strong>Batas Wilayah</strong> :<br />
                  <ul className="list-disc">
                    <li className="list-inside">
                      <strong>Desa/Kelurahan Timur</strong> :{" "}
                      {profilDesa[0].batas_timur}
                    </li>
                    <li className="list-inside">
                      <strong>Desa/Kelurahan Barat</strong> :{" "}
                      {profilDesa[0].batas_barat}
                    </li>
                    <li className="list-inside">
                      <strong>Desa/Kelurahan Selatan</strong> :{" "}
                      {profilDesa[0].batas_selatan}
                    </li>
                    <li className="list-inside">
                      <strong>Desa/Kelurahan Utara</strong> :{" "}
                      {profilDesa[0].batas_utara}
                    </li>
                  </ul>
                </li>
              </ul>
            </RoundedSection>
          )}
          <RoundedSection title="VISI & MISI" contentClassName="gap-8">
            <div>
              <h2 className="font-bold text-4xl">VISI</h2>
              <p>{VISI}</p>
            </div>
            <div>
              <h2 className="font-bold text-4xl">MISI</h2>
              <ol>
                {MISI.map((misi, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="shrink-0 text-right">
                      {index + 1}.
                    </span>
                    <span>{misi}</span>
                  </li>
                ))}
              </ol>
            </div>
          </RoundedSection>
        </div>
        <div className="flex gap-8">
          <RoundedSection title="PETA DESA">
            <img
              className="border-4"
              src="tidak-ada-gambar-box.png"
              alt="peta-desa"
            />
          </RoundedSection>
          <RoundedSection title="SEJARAH DESA">
            <p className="text-justify">{SEJARAH}</p>
          </RoundedSection>
        </div>
      </div>
    </Primitive>
  );
};

export default Profil;
