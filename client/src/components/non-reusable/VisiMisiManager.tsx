import { useState } from "react";
import TextAreaInput from "../reusable/inputs/TextAreaInput.tsx";
import RoundedSection from "../reusable/RoundedSection.tsx";
import useFetch from "../../hooks/useFetch.tsx";
import type { Visi } from "../../types/Visi.d.ts";
import type { Misi } from "../../types/Misi.d.ts";
import Button from "../reusable/Button.tsx";
import { authFetch } from "../../helpers/authFetch.ts";
import { serverApi } from "../../helpers/serverApi.ts";

const VisiMisiManager = () => {
  const [inputVisi, setInputVisi] = useState("");
  const [inputMisi, setInputMisi] = useState("");
  const [postMessage, setPostMessage] = useState("");

  const { data: visi, refetch: refetchVisi } = useFetch<Visi>(
    serverApi.get.visi(),
  );

  const { data: misi, refetch: refetchMisi } = useFetch<Misi>(
    serverApi.get.misi(),
  );

  const handleDelete = async (id: number, type: "visi" | "misi") => {
    const response = await authFetch(
      serverApi.delete[type](id),
      { method: "DELETE" },
    );
    if (!response.ok) console.error(await response.json());
    refetchVisi();
  };

  const handleSubmit = async (type: "visi" | "misi") => {
    setPostMessage("");
    const payload: { isi: string } = type === "visi"
      ? { isi: inputVisi }
      : { isi: inputMisi };

    if (payload.isi.trim() === "") {
      setPostMessage(`Isi ${type} tidak boleh kosong.`);
      return;
    }

    const response = await authFetch(
      serverApi.post[type](),
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
    );
    if (response.ok) {
      type === "visi" ? refetchVisi() : refetchMisi();
      type === "visi" ? setInputVisi("") : setInputMisi("");
    } else {
      console.error(response.body);
    }
  };

  return (
    <RoundedSection title="Visi & Misi" contentClassName="gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col flex-1 gap-4 w-full">
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-75">
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
                      Hapus
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
              await handleSubmit("visi");
            }}
          >
            Tambahkan Visi
          </Button>
        </div>

        <div className="flex flex-col flex-1 gap-4 w-full">
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-75">
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
                      Hapus
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
              await handleSubmit("misi");
            }}
          >
            Tambahkan Misi
          </Button>
        </div>
      </div>

      {postMessage && (
        <div className="px-4 py-4 bg-red-700 font-bold rounded-2xl text-center text-white select-none">
          {postMessage}
        </div>
      )}
    </RoundedSection>
  );
};

export default VisiMisiManager;
