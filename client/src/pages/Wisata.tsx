import TempatWisata from "../components/non-reusable/TempatWisata.tsx";
import UmkmDesa from "../components/non-reusable/UmkmDesa.tsx";
import Primitive from "../components/reusable/Primitive.tsx";
import useAuth from "../hooks/useAuth.tsx";
import type { Wisata } from "../types/Wisata.d.ts";

const Wisata = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Primitive>
      <div className="flex flex-col gap-8 px-32">
        <TempatWisata isLoggedIn={isLoggedIn} />
        <UmkmDesa isLoggedIn={isLoggedIn} />
      </div>
    </Primitive>
  );
};

export default Wisata;
