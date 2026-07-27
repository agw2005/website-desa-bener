import { useMemo, useState } from "react";
import Primitive from "../components/reusable/Primitive.tsx";
import RoundedSection from "../components/reusable/RoundedSection.tsx";
import useFetch from "../hooks/useFetch.tsx";
import type { Dusun } from "../types/Dusun.d.ts";
import Button from "../components/reusable/Button.tsx";
import type { JoinedApbdes } from "../types/Apbdes.d.ts";

const Data = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const {
    data: dataSemuaDusun,
    isLoading: _dataSemuaDusunIsLoading,
    isError: _dataSemuaDusunIsError,
  } = useFetch<Dusun>(
    `http://${globalThis.location.hostname}:8000/dusun`,
  );

  const {
    data: apbdesTahun,
  } = useFetch<JoinedApbdes>(
    `http://${globalThis.location.hostname}:8000/apbdes/${selectedYear}`,
  );

  const totals = useMemo(() => {
    if (!dataSemuaDusun) return {} as Dusun;
    return dataSemuaDusun.reduce((accumulator, currentDusun) => {
      for (const key in currentDusun) {
        if (typeof currentDusun[key] === "number" && key !== "dusun_id") {
          accumulator[key] = (accumulator[key] || 0) + currentDusun[key];
        }
      }
      return accumulator;
    }, {} as Dusun);
  }, [dataSemuaDusun]);

  return (
    <Primitive>
      {dataSemuaDusun && (
        <div className="flex flex-col gap-8 px-32">
          <RoundedSection title="APBDes (Anggaran Pendapatan dan Belanja Desa)">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Button
                  variant="black"
                  onClick={() => {
                    setSelectedYear((prev) => prev - 1);
                  }}
                >
                  -
                </Button>
                <div className="bg-white text-black font-bold px-4 py-2 flex items-center rounded-2xl select-none">
                  {selectedYear}
                </div>
                <Button
                  variant="black"
                  onClick={() => {
                    setSelectedYear((prev) => prev + 1);
                  }}
                >
                  +
                </Button>
              </div>
              <ul className="list-disc list-inside w-max">
                {apbdesTahun && apbdesTahun.map((apbdes, index) => {
                  return (
                    <a
                      href={`http://${globalThis.location.hostname}:8000/apbdes/file/${apbdes.apbdes_file_id}`}
                    >
                      <li
                        key={index}
                        className="font-bold text-blue-600 hover:text-blue-900 active:text-blue-700"
                      >
                        ({(apbdes.besar_file / (1024 * 1024)).toFixed(2)} MB)
                        {" "}
                        {apbdes.nama_file}
                      </li>
                    </a>
                  );
                })}
              </ul>
            </div>
          </RoundedSection>
          <RoundedSection title="DATA UMUM">
            <div className="overflow-x-auto rounded-lg border shadow-sm">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="px-4 py-2 text-left font-semibold">Dusun</th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Jumlah RT
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Jumlah Populasi
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Jumlah Keluarga
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Jumlah Laki-laki
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Jumlah Perempuan
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Jumlah UMKM
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataSemuaDusun.map((dusun, index) => {
                    return (
                      <tr
                        key={index}
                        className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-slate-100"
                      >
                        <td className="px-4 py-2">{dusun.nama}</td>
                        <td className="px-4 py-2">{dusun.rt}</td>
                        <td className="px-4 py-2">{dusun.populasi}</td>
                        <td className="px-4 py-2">{dusun.keluarga}</td>
                        <td className="px-4 py-2">{dusun.laki}</td>
                        <td className="px-4 py-2">{dusun.perempuan}</td>
                        <td className="px-4 py-2">{dusun.umkm}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="odd:bg-white even:bg-slate-50 hover:bg-slate-100 font-bold">
                    <td className="px-4 py-2">Total</td>
                    <td className="px-4 py-2">{totals.rt}</td>
                    <td className="px-4 py-2">{totals.populasi}</td>
                    <td className="px-4 py-2">{totals.keluarga}</td>
                    <td className="px-4 py-2">{totals.laki}</td>
                    <td className="px-4 py-2">{totals.perempuan}</td>
                    <td className="px-4 py-2">{totals.umkm}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </RoundedSection>
          <RoundedSection title="KEPERCAYAAN">
            <div className="overflow-x-auto rounded-lg border shadow-sm">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="px-4 py-2 text-left font-semibold">Dusun</th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Populasi
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Islam
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Protestanisme
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Katolisisme
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Hinduisme
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Buddhisme
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Konfusianisme
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataSemuaDusun.map((dusun, index) => {
                    return (
                      <tr
                        key={index}
                        className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-slate-100"
                      >
                        <td className="px-4 py-2">{dusun.nama}</td>
                        <td className="px-4 py-2">{dusun.populasi}</td>
                        <td className="px-4 py-2">{dusun.islam}</td>
                        <td className="px-4 py-2">{dusun.protestanisme}</td>
                        <td className="px-4 py-2">{dusun.katolisisme}</td>
                        <td className="px-4 py-2">{dusun.hinduisme}</td>
                        <td className="px-4 py-2">{dusun.buddhisme}</td>
                        <td className="px-4 py-2">{dusun.konfusianisme}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="odd:bg-white even:bg-slate-50 hover:bg-slate-100 font-bold">
                    <td className="px-4 py-2">Total</td>
                    <td className="px-4 py-2">{totals.populasi}</td>
                    <td className="px-4 py-2">{totals.islam}</td>
                    <td className="px-4 py-2">{totals.protestanisme}</td>
                    <td className="px-4 py-2">{totals.katolisisme}</td>
                    <td className="px-4 py-2">{totals.hinduisme}</td>
                    <td className="px-4 py-2">{totals.buddhisme}</td>
                    <td className="px-4 py-2">{totals.konfusianisme}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </RoundedSection>
          <RoundedSection title="PENYANDANG DISABILITAS">
            <div className="overflow-x-auto rounded-lg border shadow-sm">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="px-4 py-2 text-left font-semibold">Dusun</th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Tunadaksa
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Tunanetra
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Tunarungu
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Tunawicara
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Tunagrahita
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Tunalaras
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataSemuaDusun.map((dusun, index) => {
                    return (
                      <tr
                        key={index}
                        className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-slate-100"
                      >
                        <td className="px-4 py-2">{dusun.nama}</td>
                        <td className="px-4 py-2">{dusun.tunadaksa}</td>
                        <td className="px-4 py-2">{dusun.tunanetra}</td>
                        <td className="px-4 py-2">{dusun.tunarungu}</td>
                        <td className="px-4 py-2">{dusun.tunawicara}</td>
                        <td className="px-4 py-2">{dusun.tunagrahita}</td>
                        <td className="px-4 py-2">{dusun.tunalaras}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="odd:bg-white even:bg-slate-50 hover:bg-slate-100 font-bold">
                    <td className="px-4 py-2">Total</td>
                    <td className="px-4 py-2">{totals.tunadaksa}</td>
                    <td className="px-4 py-2">{totals.tunanetra}</td>
                    <td className="px-4 py-2">{totals.tunarungu}</td>
                    <td className="px-4 py-2">{totals.tunawicara}</td>
                    <td className="px-4 py-2">{totals.tunagrahita}</td>
                    <td className="px-4 py-2">{totals.tunalaras}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </RoundedSection>
          <RoundedSection title="KLASIFIKASI SOSIAL KELUARGA">
            <div className="overflow-x-auto rounded-lg border shadow-sm">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="px-4 py-2 text-left font-semibold">Dusun</th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Keluarga Pra Sejahtera (KPS)
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Keluarga Sejahtera I (KS-I)
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Keluarga Sejahtera II (KS-II)
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Keluarga Sejahtera III (KS-III)
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Keluarga Sejahtera III Plus (KS-III Plus)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataSemuaDusun.map((dusun, index) => {
                    return (
                      <tr
                        key={index}
                        className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-slate-100"
                      >
                        <td className="px-4 py-2">{dusun.nama}</td>
                        <td className="px-4 py-2">{dusun.kps}</td>
                        <td className="px-4 py-2">{dusun.ks_satu}</td>
                        <td className="px-4 py-2">{dusun.ks_dua}</td>
                        <td className="px-4 py-2">{dusun.ks_tiga}</td>
                        <td className="px-4 py-2">{dusun.ks_tiga_plus}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="odd:bg-white even:bg-slate-50 hover:bg-slate-100 font-bold">
                    <td className="px-4 py-2">Total</td>
                    <td className="px-4 py-2">{totals.kps}</td>
                    <td className="px-4 py-2">{totals.ks_satu}</td>
                    <td className="px-4 py-2">{totals.ks_dua}</td>
                    <td className="px-4 py-2">{totals.ks_tiga}</td>
                    <td className="px-4 py-2">{totals.ks_tiga_plus}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </RoundedSection>
        </div>
      )}
    </Primitive>
  );
};

export default Data;
