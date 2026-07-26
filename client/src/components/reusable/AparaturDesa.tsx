interface AparaturDesaProps {
  name: string;
  position: string;
  phone: string;
  photo: string;
}

const AparaturDesa = ({ name, position, phone, photo }: AparaturDesaProps) => {
  return (
    <div className="flex flex-col gap-2">
      <img
        className="aspect-2/3 object-cover w-full border-3 rounded-2xl"
        src={photo}
        alt="foto-aparatur-desa"
      />
      <div className="flex flex-col gap-1 items-center">
        <h2 className="font-bold">{name}</h2>
        <h3 className="font-bold text-xs">{position}</h3>
        <h3 className="font-bold text-xs">{phone}</h3>
      </div>
    </div>
  );
};

export default AparaturDesa;
