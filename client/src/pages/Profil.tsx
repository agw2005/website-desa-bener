import Primitive from "../components/reusable/Primitive.tsx";
import RoundedSection from "../components/reusable/RoundedSection.tsx";
import { serverApi } from "../helpers/serverApi.ts";
import useFetch from "../hooks/useFetch.tsx";
import type { Misi } from "../types/Misi.d.ts";
import type { ProfilDesaData } from "../types/Profil.d.ts";
import type { Visi } from "../types/Visi.d.ts";

const Profil = () => {
  const {
    data: profilDesa,
    isLoading: _profilDesaIsLoading,
    isError: _profilDesaIsError,
  } = useFetch<ProfilDesaData>(
    serverApi.get.profil.data(),
  );

  const { data: visi } = useFetch<Visi>(serverApi.get.visi());

  const { data: misi } = useFetch<Misi>(serverApi.get.misi());

  return (
    <Primitive>
      <div className="flex flex-col lg:flex-row gap-8 mx-2 md:mx-4 lg:mx-8 xl:mx-32">
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
                  {profilDesa[0].tahun_pembentukan <= 1945
                    ? `${profilDesa[0].tahun_pembentukan} (Pra-kemerdekaan)`
                    : profilDesa[0].tahun_pembentukan}
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
              src={serverApi.get.profil.map()}
              alt="peta-desa"
              onError={(e) => {
                e.currentTarget.src = "/tidak-ada-gambar-box.png";
                e.currentTarget.onerror = null;
              }}
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
    </Primitive>
  );
};

export default Profil;
