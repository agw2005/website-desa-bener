import { useState } from "react";
import Button from "../reusable/Button.tsx";
import RoundedSection from "../reusable/RoundedSection.tsx";
import OneFileInput from "../reusable/inputs/OneFileInput.tsx";
import useApbdes from "../../hooks/useApbdes.tsx";

const ApbdesManager = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [inputFile, setInputFile] = useState<null | File>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setInputFile(file);
    else setInputFile(null);
  };

  const {
    data: apbdesTahun,
    refetch: refetchApbdesTahun,
  } = useApbdes(selectedYear);

  const handleAddApbdesFile = async () => {
    if (!inputFile) return;

    const formData = new FormData();
    formData.append("file", inputFile);

    try {
      const response = await fetch(
        `http://${globalThis.location.hostname}:8000/apbdes/${selectedYear}`,
        { method: "POST", body: formData },
      );

      if (response.ok) {
        setInputFile(null);
        refetchApbdesTahun();
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDeleteApbdes = async (id: number) => {
    const response = await fetch(
      `http://${globalThis.location.hostname}:8000/apbdes/${id}`,
      { method: "DELETE" },
    );
    if (!response.ok) console.error(await response.json());
    refetchApbdesTahun();
  };

  return (
    <RoundedSection title="APBDes">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Button
            variant="black"
            onClick={() => setSelectedYear((prev) => prev - 1)}
          >
            -
          </Button>
          <div className="bg-white flex items-center px-4 py-2 rounded-2xl font-bold select-none">
            {selectedYear}
          </div>
          <Button
            variant="black"
            onClick={() => setSelectedYear((prev) => prev + 1)}
          >
            +
          </Button>
        </div>
        {apbdesTahun?.lampiran.length < 1
          ? <p>Tidak ada lampiran untuk tahun {apbdesTahun?.tahun}</p>
          : (
            <ul className="list-disc list-inside w-max">
              {apbdesTahun?.lampiran.map((lampiran) => (
                <li key={lampiran.apbdes_file_id} className="font-bold">
                  <a
                    href={`http://${globalThis.location.hostname}:8000/apbdes/file/${lampiran.apbdes_file_id}`}
                    className="text-blue-600 hover:text-blue-900 active:text-blue-700"
                  >
                    ({(lampiran.besar_file / (1024 * 1024)).toFixed(2)} MB){" "}
                    {lampiran.nama_file}
                  </a>
                  <span
                    className="text-red-600 hover:text-red-900 active:text-red-700 | mx-2 cursor-pointer"
                    onClick={() =>
                      handleDeleteApbdes(lampiran.apbdes_file_id)}
                  >
                    Hapus
                  </span>
                </li>
              ))}
            </ul>
          )}
        <OneFileInput
          label="File"
          name="file-apbdes"
          id="file-apbdes"
          onChangeHandler={handleFileChange}
          accept="*"
          fileName={inputFile?.name}
          placeholder="Unggah dokumen APBDes"
        />
        <Button variant="black" onClick={handleAddApbdesFile}>Lampirkan</Button>
      </div>
    </RoundedSection>
  );
};

export default ApbdesManager;
