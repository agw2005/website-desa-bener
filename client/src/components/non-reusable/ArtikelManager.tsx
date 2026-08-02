import { useState } from "react";
import Button from "../reusable/Button.tsx";
import TextInput from "../reusable/inputs/TextInput.tsx";
import RoundedSection from "../reusable/RoundedSection.tsx";
import useFetch from "../../hooks/useFetch.tsx";
import { authFetch } from "../../helpers/authFetch.ts";

const ArtikelManager = () => {
  const [inputLabel, setInputLabel] = useState("");
  const [inputLabelEmpty, setInputLabelEmpty] = useState(false);

  const {
    data: label,
    refetch: refetchLabel,
  } = useFetch<{ label_id: number; nama: string }>(
    `http://${globalThis.location.hostname}:8000/label`,
  );

  const handleAddLabel = async () => {
    setInputLabelEmpty(false);

    if (!inputLabel.trim()) {
      setInputLabelEmpty(true);
      return;
    }

    const response = await authFetch(
      `http://${globalThis.location.hostname}:8000/label?nama=${inputLabel}`,
      {
        method: "POST",
      },
    );

    if (response.ok) {
      setInputLabel("");
      refetchLabel();
    } else {
      console.error(await response.json());
    }
  };

  const handleDelete = async (id: number) => {
    const response = await authFetch(
      `http://${globalThis.location.hostname}:8000/label/${id}`,
      { method: "DELETE" },
    );
    if (!response.ok) console.error(await response.json());
    refetchLabel();
  };

  return (
    <RoundedSection title="Artikel">
      <div className="flex gap-8">
        <div className="flex flex-2 flex-col gap-2 w-max px-8 py-4 border-3 rounded-2xl h-max">
          <h2 className="text-2xl font-bold">Tambah Label Baru</h2>
          <TextInput
            label="Nama Label"
            name="nama-label-baru"
            id="nama-label-baru"
            value={inputLabel}
            onChangeHandler={(e) => setInputLabel(e.target.value)}
            placeholder="Contoh: Karang Taruna"
          />
          <Button variant="black" onClick={handleAddLabel}>
            Tambah Label Artikel Baru
          </Button>
          {inputLabelEmpty && (
            <div className="w-max px-4 py-2 bg-red-600 text-white font-bold rounded-2xl">
              Nama label wajib diisi
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 flex-3">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-amber-700 text-white">
                <th className="py-2 px-4 font-bold border border-black text-center">
                  Label Artikel
                </th>
              </tr>
            </thead>
            <tbody>
              {label?.map((labelItem, index) => (
                <tr key={index} className="border">
                  <td className="border border-black py-2 px-4">
                    {labelItem.nama}
                  </td>
                  <td
                    onClick={async () => {
                      await handleDelete(labelItem.label_id);
                    }}
                    className="border border-black py-2 px-4 select-none bg-red-700 hover:bg-red-900 active:bg-red-600 text-white font-bold text-center cursor-pointer"
                  >
                    Hapus
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </RoundedSection>
  );
};

export default ArtikelManager;
