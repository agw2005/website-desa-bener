import TempatWisata from "../components/non-reusable/TempatWisata.tsx";
import UmkmDesa from "../components/non-reusable/UmkmDesa.tsx";
import Primitive from "../components/reusable/Primitive.tsx";
import useAuth from "../hooks/useAuth.tsx";

const Wisata = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Primitive>
      <div className="flex flex-col gap-8 max-w-7/8 self-center">
        <TempatWisata isLoggedIn={isLoggedIn} />
        <UmkmDesa isLoggedIn={isLoggedIn} />
      </div>
    </Primitive>
  );
};

export default Wisata;
