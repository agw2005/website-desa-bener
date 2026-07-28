import { useState } from "react";
import AparaturDesa from "../components/reusable/AparaturDesa.tsx";
import Button from "../components/reusable/Button.tsx";
import Primitive from "../components/reusable/Primitive.tsx";
import RoundedSection from "../components/reusable/RoundedSection.tsx";
import Schedule from "../components/reusable/Schedule.tsx";
import useFetch from "../hooks/useFetch.tsx";
import type { Aparatur } from "../types/Aparatur.d.ts";
import TextInput from "../components/reusable/inputs/TextInput.tsx";
import { isValidEmail } from "../helpers/isValidEmail.ts";

const Kontak = () => {
  const [indexAparaturDesa, setIndexAparaturDesa] = useState(0);
  const [inputNama, setInputNama] = useState("");
  const [inputSurel, setInputSurel] = useState("");
  const [namaIsEmpty, setNamaIsEmpty] = useState(false);
  const [emailIsNotValid, setEmailisNotValid] = useState(false);
  const jumlahKomentar = 16;

  const {
    data: aparaturDesa,
    isLoading: _aparaturDesaIsLoading,
    isError: _aparaturDesaIsError,
  } = useFetch<Omit<Aparatur, "kata_sandi" | "foto">>(
    `http://${globalThis.location.hostname}:8000/aparatur`,
  );

  return (
    <Primitive>
      <div className="flex flex-col gap-8 px-32">
        <div className="flex gap-8">
          <div className="flex flex-col flex-1 gap-8">
            {aparaturDesa && (
              <RoundedSection
                title={`APARATUR DESA`}
                contentClassName="flex flex-col gap-3 items-center"
              >
                <AparaturDesa
                  name={aparaturDesa[indexAparaturDesa]?.nama}
                  position={aparaturDesa[indexAparaturDesa]?.jabatan}
                  phone={aparaturDesa[indexAparaturDesa]?.telepon}
                  photo={`http://${globalThis.location.hostname}:8000/aparatur/foto/${
                    aparaturDesa[indexAparaturDesa]?.aparatur_id
                  }`}
                />
                <p>{indexAparaturDesa + 1}/{aparaturDesa.length}</p>
                <div className="flex justify-around w-full self-stretch">
                  <Button
                    variant="black"
                    onClick={() => {
                      indexAparaturDesa < 1
                        ? setIndexAparaturDesa((_prev) =>
                          aparaturDesa.length - 1
                        )
                        : setIndexAparaturDesa((prev) => prev - 1);
                    }}
                  >
                    SEBELUM
                  </Button>
                  <Button
                    variant="black"
                    onClick={() => {
                      indexAparaturDesa === aparaturDesa.length - 1
                        ? setIndexAparaturDesa((_prev) => 0)
                        : setIndexAparaturDesa((prev) => prev + 1);
                    }}
                  >
                    BERIKUT
                  </Button>
                </div>
              </RoundedSection>
            )}
            <RoundedSection
              title={`KOMENTAR`}
              contentClassName="flex flex-col gap-3"
            >
              <TextInput
                label="NAMA"
                name="nama-komentator"
                id="nama-komentator"
                value={inputNama}
                onChangeHandler={(e) => {
                  setInputNama(e.target.value);
                }}
              />
              <TextInput
                label="SUREL"
                name="surel-komentator"
                id="surel-komentator"
                value={inputSurel}
                onChangeHandler={(e) => {
                  setInputSurel(e.target.value);
                }}
              />
              <Button
                variant="black"
                onClick={() => {
                  setNamaIsEmpty(false);
                  setEmailisNotValid(false);
                  if (inputNama.trim() === "") {
                    setNamaIsEmpty(true);
                    return;
                  }

                  if (!isValidEmail(inputSurel)) {
                    setEmailisNotValid(true);
                    return;
                  }
                }}
              >
                UNGGAH
              </Button>

              {namaIsEmpty && (
                <div className="bg-red-500 text-white font-bold px-4 py-2 text-center rounded-2xl">
                  Nama wajib diisi
                </div>
              )}
              {emailIsNotValid && (
                <div className="bg-red-500 text-white font-bold px-4 py-2 text-center rounded-2xl">
                  Surel tidak valid
                </div>
              )}
            </RoundedSection>
          </div>
          <RoundedSection
            title={`${jumlahKomentar} KOMENTAR`}
            titleClassName="flex-4"
            contentClassName="flex flex-col gap-4"
          >
            <Schedule title="Nama komentator" date={new Date()}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
              culpa necessitatibus debitis impedit aut alias eveniet rerum!
              Explicabo, quas, fugit reprehenderit itaque libero suscipit
              quaerat sequi, cum excepturi hic praesentium.
            </Schedule>
            <Schedule title="Nama komentator" date={new Date()}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
              culpa necessitatibus debitis impedit aut alias eveniet rerum!
              Explicabo, quas, fugit reprehenderit itaque libero suscipit
              quaerat sequi, cum excepturi hic praesentium.
            </Schedule>
            <Schedule title="Nama komentator" date={new Date()}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
              culpa necessitatibus debitis impedit aut alias eveniet rerum!
              Explicabo, quas, fugit reprehenderit itaque libero suscipit
              quaerat sequi, cum excepturi hic praesentium.
            </Schedule>
            <Schedule title="Nama komentator" date={new Date()}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
              culpa necessitatibus debitis impedit aut alias eveniet rerum!
              Explicabo, quas, fugit reprehenderit itaque libero suscipit
              quaerat sequi, cum excepturi hic praesentium.
            </Schedule>
            <Schedule title="Nama komentator" date={new Date()}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
              culpa necessitatibus debitis impedit aut alias eveniet rerum!
              Explicabo, quas, fugit reprehenderit itaque libero suscipit
              quaerat sequi, cum excepturi hic praesentium.
            </Schedule>
            <Schedule title="Nama komentator" date={new Date()}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
              culpa necessitatibus debitis impedit aut alias eveniet rerum!
              Explicabo, quas, fugit reprehenderit itaque libero suscipit
              quaerat sequi, cum excepturi hic praesentium.
            </Schedule>
            <Schedule title="Nama komentator" date={new Date()}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
              culpa necessitatibus debitis impedit aut alias eveniet rerum!
              Explicabo, quas, fugit reprehenderit itaque libero suscipit
              quaerat sequi, cum excepturi hic praesentium.
            </Schedule>
          </RoundedSection>
        </div>
      </div>
    </Primitive>
  );
};

export default Kontak;
