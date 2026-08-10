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
  minCardWidth?: number;
  maxVisibleCards?: number;
  aspectRatio?: string;
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
  const [containerWidth, setContainerWidth] = useState(0);
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
      setContainerWidth(width);
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

  const cardWidthPx = containerWidth > 0
    ? (containerWidth - pixelGap * (visibleCards - 1)) / visibleCards
    : 0;
  const stepPx = cardWidthPx + pixelGap;

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      <div
        className="flex items-start gap-4 transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(${-index * stepPx}px)`,
        }}
      >
        {items.map((item) => {
          const className =
            `shrink-0 relative rounded-2xl overflow-hidden border-2 border-white shadow block group`;
          const style = {
            width: `${cardWidthPx}px`,
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
              <div
                className={`w-full h-full ${
                  item.link
                    ? "transition duration-300 ease-in-out group-hover:brightness-75"
                    : ""
                }`}
              >
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
              </div>
              {deleteButton}
            </>
          );

          return item.link
            ? (
              <Link
                key={item.id}
                to={item.link}
                className={className}
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
