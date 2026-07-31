import { useState } from "react";
import RoundedSection from "../reusable/RoundedSection.tsx";
import TextInput from "../reusable/inputs/TextInput.tsx";
import DropdownInput from "../reusable/inputs/DropdownInput.tsx";
import Button from "../reusable/Button.tsx";
import useFetch from "../../hooks/useFetch.tsx";
import DusunEditForm from "./DusunEditForm.tsx";
import type { Dusun } from "../../types/Dusun.d.ts";

const DusunManager = () => {
  const [inputNamaDusun, setInputNamaDusun] = useState("");
  const [selectedDusun, setSelectedDusun] = useState<number | "">("");
  const [requiredInputIsEmpty, setRequiredInputIsEmpty] = useState(false);

  const {
    data: namaDusun,
    refetch: refetchNamaDusun,
  } = useFetch<Pick<Dusun, "dusun_id" | "nama">>(
    `http://${globalThis.location.hostname}:8000/dusun/nama`,
  );

  const handleAddDusun = async () => {
    setRequiredInputIsEmpty(false);

    if (!inputNamaDusun.trim()) {
      setRequiredInputIsEmpty(true);
      return;
    }

    const response = await fetch(
      `http://${globalThis.location.hostname}:8000/dusun?nama=${inputNamaDusun}`,
      {
        method: "POST",
      },
    );

    if (response.ok) {
      setInputNamaDusun("");
      refetchNamaDusun();
    } else {
      console.error(await response.json());
    }
  };

  return (
    <RoundedSection title="Dusun">
      <div className="flex gap-8">
        <div className="flex flex-col gap-2 w-max px-8 py-4 border-3 rounded-2xl h-max">
          <h2 className="text-2xl font-bold">Tambah Dusun Baru</h2>
          <TextInput
            label="Nama Dusun"
            name="nama-dusun-baru"
            id="nama-dusun-baru"
            value={inputNamaDusun}
            onChangeHandler={(e) => setInputNamaDusun(e.target.value)}
            placeholder="Contoh: Karangbalong"
          />
          <Button variant="black" onClick={handleAddDusun}>
            Tambah Dusun Baru
          </Button>
          {requiredInputIsEmpty && (
            <div className="w-max px-4 py-2 bg-red-600 text-white font-bold rounded-2xl">
              Nama dusun wajib diisi
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <h2 className="text-2xl font-bold">Data Per-dusun</h2>
          {namaDusun && (
            <DropdownInput
              label="Dusun"
              name="selected-dusun"
              id="selected-dusun"
              value={selectedDusun}
              options={namaDusun}
              getId={(dusun) => dusun.dusun_id}
              getLabel={(dusun) => dusun.nama}
              onChangeHandler={setSelectedDusun}
              placeholder="Pilih Dusun"
            />
          )}
          {selectedDusun !== "" && (
            <DusunEditForm key={selectedDusun} dusunId={selectedDusun} />
          )}
        </div>
      </div>
    </RoundedSection>
  );
};

export default DusunManager;
