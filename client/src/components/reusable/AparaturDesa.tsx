interface AparaturDesaProps {
  name: string;
  position: string;
  phone: string;
}

const AparaturDesa = ({ name, position, phone }: AparaturDesaProps) => {
  return (
    <div className="flex flex-col gap-2">
      <img src="tidak-ada-gambar-2x3.png" alt="foto-aparatur-desa" />
      <div className="flex flex-col gap-1 items-center">
        <h2 className="font-bold">{name}</h2>
        <h3 className="font-bold text-xs">{position}</h3>
        <h3 className="font-bold text-xs">{phone}</h3>
      </div>
    </div>
  );
};

export default AparaturDesa;
