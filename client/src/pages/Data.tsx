import Primitive from "../components/reusable/Primitive.tsx";
import RoundedSection from "../components/reusable/RoundedSection.tsx";

const Data = () => {
  return (
    <Primitive>
      <div className="flex flex-col gap-8 px-32">
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
                <tr className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Krajan 1</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                </tr>
                <tr className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Krajan 2</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                </tr>
                <tr className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Cebongan</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                </tr>
                <tr className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Karangbalong</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                </tr>
                <tr className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Kadipurwo</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Tuguh</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Total</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
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
                <tr className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Krajan 1</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                </tr>
                <tr className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Krajan 2</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                </tr>
                <tr className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Cebongan</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                </tr>
                <tr className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Karangbalong</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                </tr>
                <tr className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Kadipurwo</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Tuguh</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Total</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
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
                <tr className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Krajan 1</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                </tr>
                <tr className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Krajan 2</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                </tr>
                <tr className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Cebongan</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                </tr>
                <tr className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Karangbalong</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                </tr>
                <tr className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Kadipurwo</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Tuguh</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Total</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
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
                <tr className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Krajan 1</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                </tr>
                <tr className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Krajan 2</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                </tr>
                <tr className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Cebongan</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                </tr>
                <tr className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Karangbalong</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                </tr>
                <tr className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Kadipurwo</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Tuguh</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2">Total</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                  <td className="px-4 py-2">99</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </RoundedSection>
      </div>
    </Primitive>
  );
};

export default Data;
