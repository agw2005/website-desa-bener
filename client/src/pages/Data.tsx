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
                        <td className="px-4 py-2">{dusun.nama || "N/A"}</td>
                        <td className="px-4 py-2">{dusun.rt || "N/A"}</td>
                        <td className="px-4 py-2">{dusun.populasi || "N/A"}</td>
                        <td className="px-4 py-2">{dusun.keluarga || "N/A"}</td>
                        <td className="px-4 py-2">{dusun.laki || "N/A"}</td>
                        <td className="px-4 py-2">
                          {dusun.perempuan || "N/A"}
                        </td>
                        <td className="px-4 py-2">{dusun.umkm || "N/A"}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="odd:bg-white even:bg-slate-50 hover:bg-slate-100 font-bold">
                    <td className="px-4 py-2">Total</td>
                    <td className="px-4 py-2">{totals.rt || 0}</td>
                    <td className="px-4 py-2">{totals.populasi || 0}</td>
                    <td className="px-4 py-2">{totals.keluarga || 0}</td>
                    <td className="px-4 py-2">{totals.laki || 0}</td>
                    <td className="px-4 py-2">{totals.perempuan || 0}</td>
                    <td className="px-4 py-2">{totals.umkm || 0}</td>
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
                        <td className="px-4 py-2">{dusun.nama || "N/A"}</td>
                        <td className="px-4 py-2">{dusun.populasi || "N/A"}</td>
                        <td className="px-4 py-2">{dusun.islam || "N/A"}</td>
                        <td className="px-4 py-2">
                          {dusun.protestanisme || "N/A"}
                        </td>
                        <td className="px-4 py-2">
                          {dusun.katolisisme || "N/A"}
                        </td>
                        <td className="px-4 py-2">
                          {dusun.hinduisme || "N/A"}
                        </td>
                        <td className="px-4 py-2">
                          {dusun.buddhisme || "N/A"}
                        </td>
                        <td className="px-4 py-2">
                          {dusun.konfusianisme || "N/A"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="odd:bg-white even:bg-slate-50 hover:bg-slate-100 font-bold">
                    <td className="px-4 py-2">Total</td>
                    <td className="px-4 py-2">{totals.populasi || 0}</td>
                    <td className="px-4 py-2">{totals.islam || 0}</td>
                    <td className="px-4 py-2">{totals.protestanisme || 0}</td>
                    <td className="px-4 py-2">{totals.katolisisme || 0}</td>
                    <td className="px-4 py-2">{totals.hinduisme || 0}</td>
                    <td className="px-4 py-2">{totals.buddhisme || 0}</td>
                    <td className="px-4 py-2">{totals.konfusianisme || 0}</td>
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
                        <td className="px-4 py-2">{dusun.nama || "N/A"}</td>
                        <td className="px-4 py-2">
                          {dusun.tunadaksa || "N/A"}
                        </td>
                        <td className="px-4 py-2">
                          {dusun.tunanetra || "N/A"}
                        </td>
                        <td className="px-4 py-2">
                          {dusun.tunarungu || "N/A"}
                        </td>
                        <td className="px-4 py-2">
                          {dusun.tunawicara || "N/A"}
                        </td>
                        <td className="px-4 py-2">
                          {dusun.tunagrahita || "N/A"}
                        </td>
                        <td className="px-4 py-2">
                          {dusun.tunalaras || "N/A"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="odd:bg-white even:bg-slate-50 hover:bg-slate-100 font-bold">
                    <td className="px-4 py-2">Total</td>
                    <td className="px-4 py-2">{totals.tunadaksa || 0}</td>
                    <td className="px-4 py-2">{totals.tunanetra || 0}</td>
                    <td className="px-4 py-2">{totals.tunarungu || 0}</td>
                    <td className="px-4 py-2">{totals.tunawicara || 0}</td>
                    <td className="px-4 py-2">{totals.tunagrahita || 0}</td>
                    <td className="px-4 py-2">{totals.tunalaras || 0}</td>
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
                        <td className="px-4 py-2">{dusun.nama || "N/A"}</td>
                        <td className="px-4 py-2">{dusun.kps || "N/A"}</td>
                        <td className="px-4 py-2">{dusun.ks_satu || "N/A"}</td>
                        <td className="px-4 py-2">{dusun.ks_dua || "N/A"}</td>
                        <td className="px-4 py-2">{dusun.ks_tiga || "N/A"}</td>
                        <td className="px-4 py-2">
                          {dusun.ks_tiga_plus || "N/A"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="odd:bg-white even:bg-slate-50 hover:bg-slate-100 font-bold">
                    <td className="px-4 py-2">Total</td>
                    <td className="px-4 py-2">{totals.kps || 0}</td>
                    <td className="px-4 py-2">{totals.ks_satu || 0}</td>
                    <td className="px-4 py-2">{totals.ks_dua || 0}</td>
                    <td className="px-4 py-2">{totals.ks_tiga || 0}</td>
                    <td className="px-4 py-2">{totals.ks_tiga_plus || 0}</td>
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
