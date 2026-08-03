import { useState } from "react";
import RoundedSection from "../reusable/RoundedSection.tsx";
import TextInput from "../reusable/inputs/TextInput.tsx";
import DropdownInput from "../reusable/inputs/DropdownInput.tsx";
import Button from "../reusable/Button.tsx";
import useFetch from "../../hooks/useFetch.tsx";
import type { Pelayanan } from "../../types/Pelayanan.d.ts";
import { authFetch } from "../../helpers/authFetch.ts";
import PelayananEditForm from "./PelayananEditForm.tsx";
import { serverApi } from "../../helpers/serverApi.ts";

const PelayananManager = () => {
  const [inputJudulPelayanan, setInputJudulPelayanan] = useState("");
  const [selectedPelayanan, setSelectedPelayanan] = useState<number | "">("");
  const [requiredInputIsEmpty, setRequiredInputIsEmpty] = useState(false);

  const {
    data: pelayananList,
    refetch: refetchPelayananList,
  } = useFetch<Pelayanan>(
    serverApi.get.pelayanan.all(),
  );

  const handleAddPelayanan = async () => {
    setRequiredInputIsEmpty(false);

    if (!inputJudulPelayanan.trim()) {
      setRequiredInputIsEmpty(true);
      return;
    }

    const formData = new FormData();
    formData.append("judul", inputJudulPelayanan);

    const response = await authFetch(
      serverApi.post.pelayanan.parent(),
      { method: "POST", body: formData },
    );

    if (response.ok) {
      setInputJudulPelayanan("");
      refetchPelayananList();
    } else {
      console.error(await response.json());
    }
  };

  const handleDeletePelayanan = async (id: number) => {
    const response = await authFetch(
      serverApi.delete.pelayanan.one(id),
      { method: "DELETE" },
    );
    if (!response.ok) {
      console.error(await response.json());
      return;
    }
    if (selectedPelayanan === id) setSelectedPelayanan("");
    refetchPelayananList();
  };

  return (
    <RoundedSection title="Pelayanan">
      <div className="flex gap-8">
        <div className="flex flex-col gap-2 w-max px-8 py-4 border-3 rounded-2xl h-max">
          <h2 className="text-2xl font-bold">Tambah Pelayanan Baru</h2>
          <TextInput
            label="Judul Pelayanan"
            name="judul-pelayanan-baru"
            id="judul-pelayanan-baru"
            value={inputJudulPelayanan}
            onChangeHandler={(e) => setInputJudulPelayanan(e.target.value)}
            placeholder="Contoh: Surat Keterangan Domisili"
          />
          <Button variant="black" onClick={handleAddPelayanan}>
            Tambah Pelayanan Baru
          </Button>
          {requiredInputIsEmpty && (
            <div className="w-max px-4 py-2 bg-red-600 text-white font-bold rounded-2xl">
              Judul pelayanan wajib diisi
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <h2 className="text-2xl font-bold">Kelola Pelayanan</h2>
          {pelayananList && (
            <DropdownInput
              label="Pelayanan"
              name="selected-pelayanan"
              id="selected-pelayanan"
              value={selectedPelayanan}
              options={pelayananList}
              getId={(p) => p.pelayanan_id}
              getLabel={(p) => p.judul}
              onChangeHandler={setSelectedPelayanan}
              placeholder="Pilih Pelayanan"
            />
          )}
          {selectedPelayanan !== "" && (
            <PelayananEditForm
              key={selectedPelayanan}
              pelayananId={selectedPelayanan}
              refetchPelayananList={refetchPelayananList}
              onDelete={() => handleDeletePelayanan(selectedPelayanan)}
            />
          )}
        </div>
      </div>
    </RoundedSection>
  );
};

export default PelayananManager;
