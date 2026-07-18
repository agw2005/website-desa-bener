import { useRef, useState } from "react";

interface CarouselItem {
  title: string;
  subtitle: string;
  photo: string;
}

interface AparaturCarouselProps {
  items: CarouselItem[];
  visibleCards: number;
  pixelGap: number;
}

const ManualCarousel = (
  { items, visibleCards, pixelGap }: AparaturCarouselProps,
) => {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const maxIndex = Math.max(items.length - visibleCards, 0);

  const goPrev = () => setIndex((prev) => Math.max(prev - 1, 0));
  const goNext = () => setIndex((prev) => Math.min(prev + 1, maxIndex));

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={trackRef}
        className="flex gap-4 transition-transform duration-500 ease-in-out"
        style={{
          transform:
            `translateX(calc(-${index} * (100% / ${visibleCards} + ${pixelGap}px / ${visibleCards})))`,
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="shrink-0 relative rounded-2xl overflow-hidden border-2 border-white shadow"
            style={{
              width: `calc((100% - ${
                pixelGap * (visibleCards - 1)
              }px) / ${visibleCards})`,
            }}
          >
            <img
              src={item.photo}
              alt={item.subtitle}
              className="w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black to-transparent px-3 py-3 text-white">
              <p className="font-bold text-sm leading-tight">{item.subtitle}</p>
              <p className="text-xs">{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {index > 0 && (
        <button
          type="button"
          onClick={goPrev}
          aria-label="Sebelumnya"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"
        >
          ←
        </button>
      )}

      {index < maxIndex && (
        <button
          type="button"
          onClick={goNext}
          aria-label="Selanjutnya"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"
        >
          →
        </button>
      )}
    </div>
  );
};

export default ManualCarousel;
