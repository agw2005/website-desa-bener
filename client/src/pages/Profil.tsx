import Primitive from "../components/reusable/Primitive.tsx";
import RoundedSection from "../components/reusable/RoundedSection.tsx";
import useFetch from "../hooks/useFetch.tsx";
import type { Misi } from "../types/Misi.d.ts";
import type { ProfilDesaData } from "../types/Profil.d.ts";
import type { Visi } from "../types/Visi.d.ts";

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

// const VISI =
//   "Terwujudnya Masyaraakat Desa Yang Aman, Tenteram, Maju, Makmur dan berkeadilan menuju kemandirian. Dengan motto mengabdi setulus hati.";

// const MISI = [
//   "Mewujudkan Tata Kelola Pemerintahan Desa yang bersih, jujur, akuntabel,, transparant bebas dari Korupsi, Kolusi dan Nepotisme",
//   "Mewujudkan pengelolaan Sumber Daya Alam dan Sumber Daya manusia yang berkesinambungan",
//   "Menciptakan kondisi desa yang konduksif dan berbudaya yang berjiwa kegotongroyongan",
//   "Meningkatkan kesejahteraan masyarakat melalui peningkatan ketrampilan/life skill",
// ];

const Profil = () => {
  const {
    data: profilDesa,
    isLoading: _profilDesaIsLoading,
    isError: _profilDesaIsError,
  } = useFetch<ProfilDesaData>(
    `http://${globalThis.location.hostname}:8000/profil/data`,
  );

  const { data: visi } = useFetch<Visi>(
    `http://${globalThis.location.hostname}:8000/visi`,
  );

  const { data: misi } = useFetch<Misi>(
    `http://${globalThis.location.hostname}:8000/misi`,
  );

  return (
    <Primitive>
      <div className="flex gap-8 mx-32">
        <div className="flex flex-col gap-8 flex-1">
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
              <ol>
                {visi &&
                  visi.map((visi, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="shrink-0 text-right">
                        {index + 1}.
                      </span>
                      <span>{visi.isi}</span>
                    </li>
                  ))}
              </ol>
            </div>
            <div>
              <h2 className="font-bold text-4xl">MISI</h2>
              <ol>
                {misi &&
                  misi.map((misi, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="shrink-0 text-right">
                        {index + 1}.
                      </span>
                      <span>{misi.isi}</span>
                    </li>
                  ))}
              </ol>
            </div>
          </RoundedSection>
        </div>
        <div className="flex flex-col gap-8 flex-1">
          <RoundedSection title="PETA DESA">
            <img
              className="border-4"
              src={`http://${globalThis.location.hostname}:8000/profil/peta` ||
                "tidak-ada-gambar-box.png"}
              alt="peta-desa"
            />
          </RoundedSection>
          {profilDesa && (
            <RoundedSection title="SEJARAH DESA">
              <p className="text-justify whitespace-pre-line">
                {profilDesa[0].sejarah}
              </p>
            </RoundedSection>
          )}
        </div>
      </div>

      {
        /* <div className="flex flex-col gap-8 px-32">
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
              <ol>
                {visi &&
                  visi.map((visi, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="shrink-0 text-right">
                        {index + 1}.
                      </span>
                      <span>{visi.isi}</span>
                    </li>
                  ))}
              </ol>
            </div>
            <div>
              <h2 className="font-bold text-4xl">MISI</h2>
              <ol>
                {misi &&
                  misi.map((misi, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="shrink-0 text-right">
                        {index + 1}.
                      </span>
                      <span>{misi.isi}</span>
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
              src={`http://${globalThis.location.hostname}:8000/profil/peta` ||
                "tidak-ada-gambar-box.png"}
              alt="peta-desa"
            />
          </RoundedSection>
          {profilDesa && (
            <RoundedSection title="SEJARAH DESA">
              <p className="text-justify whitespace-pre-line">
                {profilDesa[0].sejarah}
              </p>
            </RoundedSection>
          )}
        </div>
      </div> */
      }
    </Primitive>
  );
};

export default Profil;
