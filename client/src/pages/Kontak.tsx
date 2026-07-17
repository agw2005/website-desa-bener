import { useState } from "react";
import AparaturDesa from "../components/reusable/AparaturDesa.tsx";
import Button from "../components/reusable/Button.tsx";
import Primitive from "../components/reusable/Primitive.tsx";
import RoundedSection from "../components/reusable/RoundedSection.tsx";
import Schedule from "../components/reusable/Schedule.tsx";

interface AparaturDesa {
  name: string;
  position: string;
  phone: string;
}

const EXAMPLE_APARATUR_DESA: AparaturDesa[] = [
  { name: "Beni Saefudin", position: "Kepala Desa", phone: "0281-3254-69994" },
  {
    name: "Buni Bener Kesra",
    position: "Sekretaris Desa",
    phone: "0822-2048-2073",
  },
];

const Kontak = () => {
  const [aparaturDesa, setAparaturDesa] = useState(0);
  const jumlahKomentar = 16;

  return (
    <Primitive>
      <div className="flex flex-col gap-8 px-32">
        <div className="flex gap-8">
          <div className="flex flex-col flex-1 gap-8">
            <RoundedSection
              title={`APARATUR DESA`}
              contentClassName="flex flex-col gap-3 items-center"
            >
              <AparaturDesa
                name={EXAMPLE_APARATUR_DESA[aparaturDesa].name}
                position={EXAMPLE_APARATUR_DESA[aparaturDesa].position}
                phone={EXAMPLE_APARATUR_DESA[aparaturDesa].phone}
              />
              {aparaturDesa + 1}/{EXAMPLE_APARATUR_DESA.length}
              <div className="flex justify-around w-full self-stretch">
                <Button
                  variant="black"
                  onClick={() => {
                    aparaturDesa < 1
                      ? setAparaturDesa((_prev) =>
                        EXAMPLE_APARATUR_DESA.length - 1
                      )
                      : setAparaturDesa((prev) => prev - 1);
                  }}
                >
                  SEBELUM
                </Button>
                <Button
                  variant="black"
                  onClick={() => {
                    aparaturDesa === EXAMPLE_APARATUR_DESA.length - 1
                      ? setAparaturDesa((_prev) => 0)
                      : setAparaturDesa((prev) => prev + 1);
                  }}
                >
                  BERIKUT
                </Button>
              </div>
            </RoundedSection>
            <RoundedSection
              title={`KOMENTAR`}
              contentClassName="flex flex-col gap-3"
            >
              <label className="flex">
                <div className="border px-4 py-2 text-white font-bold border-black bg-black rounded-l-2xl select-none">
                  NAMA
                </div>
                <input
                  className="border outline-none w-full px-4 py-2 rounded-r-2xl bg-white"
                  type="text"
                  name="nama"
                  id="nama"
                />
              </label>
              <label className="flex">
                <div className="border px-4 py-2 text-white font-bold border-black bg-black rounded-l-2xl select-none">
                  SUREL
                </div>
                <input
                  className="border outline-none w-full px-4 py-2 rounded-r-2xl bg-white"
                  type="text"
                  name="surel"
                  id="surel"
                />
              </label>
              <label>
                <textarea
                  name="komentar"
                  id="komentar"
                  className="border outline-none w-full px-4 py-2 rounded-2xl bg-white min-h-32"
                >
                </textarea>
              </label>
              <Button variant="black">
                UNGGAH
              </Button>
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
