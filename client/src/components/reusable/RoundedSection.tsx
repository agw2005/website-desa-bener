import { type ReactNode, useEffect, useRef, useState } from "react";

interface RoundedSectionProps {
  title: string;
  children: ReactNode;
  titleClassName?: string;
  contentClassName?: string;
}

const RoundedSection = ({
  title,
  children,
  contentClassName = "",
  titleClassName = "",
}: RoundedSectionProps) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isSameWidth, setIsSameWidth] = useState(false);

  useEffect(() => {
    const titleEl = titleRef.current;
    const contentEl = contentRef.current;

    if (!titleEl || !contentEl) return;

    const observer = new ResizeObserver(() => {
      const titleWidth = titleEl.getBoundingClientRect().width;
      const contentWidth = contentEl.getBoundingClientRect().width;

      setIsSameWidth(Math.abs(titleWidth - contentWidth) < 1);
    });

    observer.observe(titleEl);
    observer.observe(contentEl);

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`flex flex-col w-full ${titleClassName}`}>
      <div
        ref={titleRef}
        className="bg-amber-500 px-4 sm:px-8 py-3 sm:py-4 rounded-t-3xl max-w-full w-max text-white font-bold text-md md:text-xl lg:text-2xl wrap-break-word"
      >
        {title}
      </div>
      <div
        ref={contentRef}
        className={`flex flex-col bg-amber-300 p-4 sm:p-8 rounded-b-3xl w-full ${
          !isSameWidth ? "rounded-tr-3xl" : ""
        } ${contentClassName}`}
      >
        {children}
      </div>
    </section>
  );
};

export default RoundedSection;
