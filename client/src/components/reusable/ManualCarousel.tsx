import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import Button from "./Button.tsx";

interface CarouselItem {
  id: number;
  title: string;
  subtitle: string;
  photo: string;
  link?: string;
}

interface ManualCarouselProps {
  items: CarouselItem[];
  pixelGap: number;
  minCardWidth?: number; // e.g. 200 — used to derive how many cards fit
  maxVisibleCards?: number; // upper bound, e.g. 3
  aspectRatio?: string; // e.g. "2 / 3"
  showDelete?: boolean;
  onDelete?: (id: number) => void;
}

const ManualCarousel = (
  {
    items,
    pixelGap,
    minCardWidth = 180,
    maxVisibleCards = 3,
    aspectRatio = "2 / 3",
    showDelete = false,
    onDelete,
  }: ManualCarouselProps,
) => {
  const [index, setIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const cacheBuster = useRef(`?cb=${Date.now()}`);
  const fallbackImage = "/tidak-ada-gambar-4x5.png";
  const imageSrc = (photo: string) =>
    photo ? `${photo}${cacheBuster.current}` : fallbackImage;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const compute = (width: number) => {
      const fit = Math.floor((width + pixelGap) / (minCardWidth + pixelGap));
      const clamped = Math.min(Math.max(fit, 1), maxVisibleCards);
      setVisibleCards(clamped);
    };

    compute(el.clientWidth);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        compute(entry.contentRect.width);
      }
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, [pixelGap, minCardWidth, maxVisibleCards]);

  const maxIndex = Math.max(items.length - visibleCards, 0);

  useEffect(() => {
    setIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const goPrev = () => setIndex((prev) => Math.max(prev - 1, 0));
  const goNext = () => setIndex((prev) => Math.min(prev + 1, maxIndex));

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      <div
        className="flex items-start gap-4 transition-transform duration-500 ease-in-out"
        style={{
          transform:
            `translateX(calc(-${index} * (100% / ${visibleCards} + ${pixelGap}px / ${visibleCards})))`,
        }}
      >
        {items.map((item) => {
          const className =
            `shrink-0 relative rounded-2xl overflow-hidden border-2 border-white shadow block`;
          const style = {
            width: `calc((100% - ${
              pixelGap * (visibleCards - 1)
            }px) / ${visibleCards})`,
            aspectRatio,
          };

          const deleteButton = showDelete && onDelete && (
            <Button
              variant="red"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete(item.id);
              }}
              className="absolute top-2 right-2 z-2 text-sm"
              aria-label={`Hapus ${item.subtitle}`}
            >
              Hapus
            </Button>
          );

          const content = (
            <>
              {deleteButton}
              <img
                src={imageSrc(item.photo)}
                onError={(e) => {
                  e.currentTarget.src = fallbackImage;
                  e.currentTarget.onerror = null;
                }}
                alt={item.subtitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black to-transparent px-3 py-3 text-white">
                <p className="font-bold text-sm leading-tight">
                  {item.title}
                </p>
                <p className="text-xs">{item.subtitle}</p>
              </div>
            </>
          );

          return item.link
            ? (
              <Link
                key={item.id}
                to={item.link}
                className={`${className} transition duration-300 ease-in-out hover:brightness-75`}
                style={style}
              >
                {content}
              </Link>
            )
            : (
              <div key={item.id} className={className} style={style}>
                {content}
              </div>
            );
        })}
      </div>

      {index > 0 && (
        <button
          type="button"
          onClick={goPrev}
          aria-label="Sebelumnya"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors z-10"
        >
          ←
        </button>
      )}

      {index < maxIndex && (
        <button
          type="button"
          onClick={goNext}
          aria-label="Selanjutnya"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors z-10"
        >
          →
        </button>
      )}
    </div>
  );
};

export default ManualCarousel;
