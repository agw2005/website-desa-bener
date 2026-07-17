import Primitive from "../components/reusable/Primitive.tsx";
import RoundedSection from "../components/reusable/RoundedSection.tsx";

const Wisata = () => {
  return (
    <Primitive>
      <div className="flex flex-col gap-8 px-32">
        <RoundedSection title="UMKM DESA">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius fugiat
          itaque quae nobis voluptas, dignissimos neque, quas ab autem eaque
          culpa. Sapiente nulla aliquam voluptatibus architecto, labore ratione
          non consequuntur!
        </RoundedSection>
        <RoundedSection title="TEMPAT WISATA">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius fugiat
          itaque quae nobis voluptas, dignissimos neque, quas ab autem eaque
          culpa. Sapiente nulla aliquam voluptatibus architecto, labore ratione
          non consequuntur!
        </RoundedSection>
      </div>
    </Primitive>
  );
};

export default Wisata;
