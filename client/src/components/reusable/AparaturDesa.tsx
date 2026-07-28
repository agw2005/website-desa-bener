import { useRef } from "react";

interface AparaturDesaProps {
  name: string;
  position: string;
  phone: string;
  photo: string | null;
}

const AparaturDesa = ({ name, position, phone, photo }: AparaturDesaProps) => {
  const fallbackImage = "/tidak-ada-gambar-2x3.png";
  const cacheBuster = useRef(`?cb=${Date.now()}`);
  const imageSrc = photo ? `${photo}${cacheBuster.current}` : fallbackImage;

  return (
    <div className="flex flex-col gap-2 w-full">
      <img
        className="aspect-2/3 object-cover border-3 rounded-2xl"
        src={imageSrc}
        alt="foto-aparatur-desa"
        onError={(e) => {
          e.currentTarget.src = fallbackImage;
          e.currentTarget.onerror = null;
        }}
      />
      <div className="flex flex-col gap-1 items-center">
        <h2 className="font-bold">{name || "N/A"}</h2>
        <h3 className="font-bold text-xs">{position}</h3>
        <h3 className="font-bold text-xs">{phone || "N/A"}</h3>
      </div>
    </div>
  );
};

export default AparaturDesa;
