import type { ReactNode } from "react";

interface CardProps {
  image?: string | null;
  alt: string;
  title: string;
  aspect: "2x3" | "4x5" | "box";
  children: ReactNode;
}

const Card = ({ image, alt, title, aspect, children }: CardProps) => {
  const fallbackImage = `/tidak-ada-gambar-${aspect}.png`;
  const imageSrc = image || fallbackImage;
  const aspectClass = aspect === "2x3"
    ? "aspect-[2/3]"
    : (aspect === "4x5" ? "aspect-[4/5]" : "aspect-square");

  return (
    <div className="w-full p-4 rounded-xl bg-amber-600 text-white flex flex-col">
      <img
        src={imageSrc}
        alt={alt}
        onError={(e) => {
          e.currentTarget.src = fallbackImage;
          e.currentTarget.onerror = null;
        }}
        className={`w-full object-cover rounded-2xl mb-4 ${aspectClass}`}
      />
      <h3 className="font-bold text-justify">{title}</h3>
      <div className="flex flex-col gap-2 text-sm text-justify grow">
        {children}
      </div>
    </div>
  );
};

export default Card;
