import { useState } from "react";
import TextAreaInput from "../reusable/inputs/TextAreaInput.tsx";
import RoundedSection from "../reusable/RoundedSection.tsx";
import useFetch from "../../hooks/useFetch.tsx";
import { type Visi, type VisiPostPayload } from "../../types/Visi.d.ts";
import { type Misi, type MisiPostPayload } from "../../types/Misi.d.ts";
import Button from "../reusable/Button.tsx";

const VisiMisiManager = () => {
  const [inputVisi, setInputVisi] = useState("");
  const [inputMisi, setInputMisi] = useState("");

  const { data: visi, refetch: refetchVisi } = useFetch<Visi>(
    `http://${globalThis.location.hostname}:8000/visi`,
  );

  const { data: misi, refetch: refetchMisi } = useFetch<Misi>(
    `http://${globalThis.location.hostname}:8000/misi`,
  );

  const handleDelete = async (id: number, type: "visi" | "misi") => {
    const response = await fetch(
      `http://${globalThis.location.hostname}:8000/${type}/${id}`,
      { method: "DELETE" },
    );
    if (!response.ok) console.error(await response.json());
    refetchVisi();
  };

  return (
    <RoundedSection title="Visi & Misi">
      <div className="flex gap-4">
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-amber-700 text-white">
                  <th className="py-2 px-4 font-bold border border-black text-center">
                    No
                  </th>
                  <th className="py-2 px-4 font-bold border border-black text-center">
                    Visi
                  </th>
                </tr>
              </thead>
              <tbody>
                {visi?.map((visi, index) => (
                  <tr key={index} className="border">
                    <td className="border border-black py-2 px-4 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-black py-2 px-4">
                      {visi.isi}
                    </td>
                    <td
                      onClick={async () => {
                        await handleDelete(visi.visi_id, "visi");
                        refetchVisi();
                      }}
                      className="border border-black py-2 px-4 select-none bg-red-700 hover:bg-red-900 active:bg-red-600 text-white font-bold text-center cursor-pointer"
                    >
                      Delete
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TextAreaInput
            label="Tambahkan Visi"
            name="visi"
            id="visi"
            value={inputVisi}
            onChangeHandler={(e) => {
              setInputVisi(e.target.value);
            }}
            rows={4}
          />
          <Button
            variant="black"
            onClick={async () => {
              const payload: VisiPostPayload = { isi: inputVisi };
              const response = await fetch(
                `http://${globalThis.location.hostname}:8000/visi`,
                {
                  method: "POST",
                  body: JSON.stringify(payload),
                },
              );
              if (response.ok) {
                refetchVisi();
                setInputVisi("");
              } else {
                console.error(response.body);
              }
            }}
          >
            Tambahkan Visi
          </Button>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-amber-700 text-white">
                  <th className="py-2 px-4 font-bold border border-black text-center">
                    No
                  </th>
                  <th className="py-2 px-4 font-bold border border-black text-center">
                    Misi
                  </th>
                </tr>
              </thead>
              <tbody>
                {misi?.map((misi, index) => (
                  <tr key={index} className="border">
                    <td className="border border-black py-2 px-4 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-black py-2 px-4">
                      {misi.isi}
                    </td>
                    <td
                      onClick={async () => {
                        await handleDelete(misi.misi_id, "misi");
                        refetchMisi();
                      }}
                      className="border border-black py-2 px-4 select-none bg-red-700 hover:bg-red-900 active:bg-red-600 text-white font-bold text-center cursor-pointer"
                    >
                      Delete
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TextAreaInput
            label="Tambahkan Misi"
            name="misi"
            id="misi"
            value={inputMisi}
            onChangeHandler={(e) => {
              setInputMisi(e.target.value);
            }}
            rows={4}
          />
          <Button
            variant="black"
            onClick={async () => {
              const payload: MisiPostPayload = { isi: inputMisi };
              const response = await fetch(
                `http://${globalThis.location.hostname}:8000/misi`,
                {
                  method: "POST",
                  body: JSON.stringify(payload),
                },
              );
              if (response.ok) {
                refetchMisi();
                setInputMisi("");
              } else {
                console.error(response.body);
              }
            }}
          >
            Tambahkan Misi
          </Button>
        </div>
      </div>
    </RoundedSection>
  );
};

export default VisiMisiManager;
