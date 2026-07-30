import TempatWisata from "../components/non-reusable/TempatWisata.tsx";
import ManualCarousel from "../components/reusable/ManualCarousel.tsx";
import Primitive from "../components/reusable/Primitive.tsx";
import RoundedSection from "../components/reusable/RoundedSection.tsx";
import useAuth from "../hooks/useAuth.tsx";
import type { Wisata } from "../types/Wisata.d.ts";

const Wisata = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Primitive>
      <div className="flex flex-col gap-8 px-32">
        <TempatWisata isLoggedIn={isLoggedIn} />
        <RoundedSection title="UMKM DESA">
          <ManualCarousel
            minCardWidth={180}
            maxVisibleCards={5}
            pixelGap={16}
            aspectRatio="1/1"
            items={[]}
          />
        </RoundedSection>
      </div>
    </Primitive>
  );
};

export default Wisata;
