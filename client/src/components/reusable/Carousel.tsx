import { useEffect, useRef, useState } from "react";

interface CarouselProps {
  children: React.ReactNode[];
  cardWidthClassName?: string;
  gapClassName?: string;
}

const Carousel = (
  {
    children,
    cardWidthClassName =
      "w-1/2 sm:w-[calc(30%-0.5rem)] md:w-[calc(22%-0.667rem)] lg:w-[calc(15%-0.75rem)]",
    gapClassName = "gap-4",
  }: CarouselProps,
) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();

    el.addEventListener("scroll", updateScrollState, { passive: true });
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [children.length]);

  const scrollByOneCard = (direction: 1 | -1) => {
    const container = scrollRef.current;
    const card = firstCardRef.current;
    if (!container || !card) return;
    const cardRect = card.getBoundingClientRect();
    const style = getComputedStyle(container);
    const gap = Number.parseFloat(style.columnGap || "0");
    const distance = cardRect.width + gap;

    container.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      <div
        ref={scrollRef}
        className={`flex ${gapClassName} overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide`}
      >
        {children.map((child, i) => (
          <div
            key={i}
            ref={i === 0 ? firstCardRef : undefined}
            className={`shrink-0 snap-start flex ${cardWidthClassName}`}
          >
            {child}
          </div>
        ))}
      </div>

      {canScrollPrev && (
        <button
          type="button"
          onClick={() => scrollByOneCard(-1)}
          aria-label="Sebelumnya"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors z-10"
        >
          ←
        </button>
      )}

      {canScrollNext && (
        <button
          type="button"
          onClick={() => scrollByOneCard(1)}
          aria-label="Selanjutnya"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors z-10"
        >
          →
        </button>
      )}
    </div>
  );
};

export default Carousel;
