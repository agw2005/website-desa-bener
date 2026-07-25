import Primitive from "../components/reusable/Primitive.tsx";
import RoundedSection from "../components/reusable/RoundedSection.tsx";
import ManualCarousel from "../components/reusable/ManualCarousel.tsx";
import { type Aparatur } from "../types/Aparatur.d.ts";
import useFetch from "../hooks/useFetch.tsx";

const Manajemen = () => {
  const {
    data: aparaturDesa,
    isLoading: _aparaturDesaIsLoading,
    isError: _aparaturDesaIsError,
  } = useFetch<Omit<Aparatur, "kata_sandi" | "foto">>(
    `http://${globalThis.location.hostname}:8000/aparatur`,
  );

  const aparaturItems = aparaturDesa?.map((aparatur) => ({
    title: aparatur.nama,
    subtitle: aparatur.jabatan,
    photo:
      `http://${globalThis.location.hostname}:8000/aparatur/foto/${aparatur.aparatur_id}`,
  })) ?? [];

  return (
    <Primitive>
      <div className="flex flex-col gap-8 px-32">
        <RoundedSection title="Aparatur Desa">
          <ManualCarousel
            minCardWidth={180}
            maxVisibleCards={9}
            pixelGap={16}
            items={aparaturItems}
          />
        </RoundedSection>
      </div>
    </Primitive>
  );
};

export default Manajemen;
