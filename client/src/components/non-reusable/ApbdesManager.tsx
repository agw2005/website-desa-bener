import { useState } from "react";
import Button from "../reusable/Button.tsx";
import RoundedSection from "../reusable/RoundedSection.tsx";
import OneFileInput from "../reusable/inputs/OneFileInput.tsx";
import { type JoinedApbdes } from "../../types/Apbdes.d.ts";
import useFetch from "../../hooks/useFetch.tsx";

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
  } = useFetch<JoinedApbdes>(
    `http://${globalThis.location.hostname}:8000/apbdes/${selectedYear}`,
  );

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

  return (
    <RoundedSection title="APBDes">
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
          <div className="bg-white flex items-center px-4 py-2 rounded-2xl font-bold select-none">
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
                  ({(apbdes.besar_file / (1024)).toFixed(2)} KB){" "}
                  {apbdes.nama_file}
                </li>
              </a>
            );
          })}
        </ul>
        <OneFileInput
          label="File"
          name="file-apbdes"
          id="file-apbdes"
          onChangeHandler={handleFileChange}
          accept="*"
          fileName={inputFile?.name}
        />
        <Button variant="black" onClick={handleAddApbdesFile}>Lampirkan</Button>
      </div>
    </RoundedSection>
  );
};

export default ApbdesManager;
