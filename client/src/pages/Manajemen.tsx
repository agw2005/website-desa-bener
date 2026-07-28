import Primitive from "../components/reusable/Primitive.tsx";
import AparaturManager from "../components/non-reusable/AparaturManager.tsx";
import DusunManager from "../components/non-reusable/DusunManager.tsx";
import ProfilDesaManager from "../components/non-reusable/ProfilDesaManager.tsx";
import VisiMisiManager from "../components/non-reusable/VisiMisiManager.tsx";
import ApbdesManager from "../components/non-reusable/ApbdesManager.tsx";
import ArtikelManager from "../components/non-reusable/ArtikelManager.tsx";

const Manajemen = () => {
  return (
    <Primitive>
      <div className="flex flex-col gap-8 px-32">
        <AparaturManager />
        <DusunManager />
        <ProfilDesaManager />
        <VisiMisiManager />
        <ApbdesManager />
        <ArtikelManager />
      </div>
    </Primitive>
  );
};

export default Manajemen;
