import { useState } from "react";
import TextInput from "../reusable/inputs/TextInput.tsx";
import Button from "../reusable/Button.tsx";
import usePelayanan from "../../hooks/usePelayanan.tsx";
import { authFetch } from "../../helpers/authFetch.ts";
import { serverApi } from "../../helpers/serverApi.ts";

interface PelayananEditFormProps {
  pelayananId: number;
  refetchPelayananList: () => void;
  onDelete: () => void;
}

const PelayananEditForm = (
  { pelayananId, refetchPelayananList, onDelete }: PelayananEditFormProps,
) => {
  const { data: pelayanan, refetch: refetchPelayanan } = usePelayanan(
    pelayananId,
  );

  const [inputIsiSyarat, setInputIsiSyarat] = useState("");
  const [inputTautanSyarat, setInputTautanSyarat] = useState("");
  const [postMessage, setPostMessage] = useState("");

  const handleAddSyarat = async () => {
    setPostMessage("");

    if (inputIsiSyarat.trim() === "") {
      setPostMessage("Isi syarat wajib diisi.");
      return;
    }

    const formData = new FormData();
    formData.append("isi", inputIsiSyarat);
    formData.append("tautan", inputTautanSyarat);

    const response = await authFetch(
      serverApi.post.pelayanan.children(pelayananId),
      { method: "POST", body: formData },
    );

    if (response.ok) {
      setInputIsiSyarat("");
      setInputTautanSyarat("");
      refetchPelayanan();
      refetchPelayananList();
    } else {
      setPostMessage("Gagal menambahkan syarat.");
      console.error(await response.json());
    }
  };

  const handleDeleteSyarat = async (syaratId: number) => {
    const response = await authFetch(
      serverApi.delete.pelayanan.syarat(syaratId),
      { method: "DELETE" },
    );
    if (!response.ok) console.error(await response.json());
    refetchPelayanan();
    refetchPelayananList();
  };

  if (!pelayanan) return <p>Memuat data pelayanan...</p>;

  return (
    <div className="flex flex-col gap-4 border-3 rounded-2xl p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h3 className="font-bold text-xl">{pelayanan.judul}</h3>
        <Button variant="red" onClick={onDelete}>
          Hapus Pelayanan
        </Button>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-125">
          <thead>
            <tr className="bg-amber-700 text-white">
              <th className="py-2 px-4 font-bold border border-black text-center w-12">
                No
              </th>
              <th className="py-2 px-4 font-bold border border-black text-center">
                Syarat
              </th>
              <th className="py-2 px-4 font-bold border border-black text-center">
                Tautan
              </th>
              {/* Added missing table header for the delete action column */}
              <th className="py-2 px-4 font-bold border border-black text-center">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {pelayanan.syarat.map((s, index) => (
              <tr key={s.syarat_pelayanan_id} className="border">
                <td className="border border-black py-2 px-4 text-center">
                  {index + 1}
                </td>
                <td className="border border-black py-2 px-4">{s.isi}</td>
                <td className="border border-black py-2 px-4">
                  {s.tautan
                    ? (
                      <a
                        href={s.tautan}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline break-all"
                      >
                        Tautan
                      </a>
                    )
                    : <span className="text-gray-400">-</span>}
                </td>
                <td
                  onClick={() =>
                    handleDeleteSyarat(s.syarat_pelayanan_id)}
                  className="border border-black py-2 px-4 select-none bg-red-700 hover:bg-red-900 active:bg-red-600 text-white font-bold text-center cursor-pointer"
                >
                  Hapus
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-2">
        <TextInput
          label="Isi Syarat"
          name="isi-syarat-baru"
          id="isi-syarat-baru"
          value={inputIsiSyarat}
          onChangeHandler={(e) => setInputIsiSyarat(e.target.value)}
          placeholder="Contoh: Fotokopi KTP"
        />
        <TextInput
          label="Tautan (opsional)"
          name="tautan-syarat-baru"
          id="tautan-syarat-baru"
          value={inputTautanSyarat}
          onChangeHandler={(e) => setInputTautanSyarat(e.target.value)}
          placeholder="Contoh: tautan formulir unduhan"
        />
        <Button
          variant="black"
          className="w-full sm:w-max"
          onClick={handleAddSyarat}
        >
          Tambah Syarat
        </Button>
        {postMessage && (
          <div className="px-4 py-2 bg-red-600 text-white font-bold rounded-2xl w-full sm:w-max">
            {postMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default PelayananEditForm;
