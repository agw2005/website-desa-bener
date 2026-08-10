import type { ReactNode } from "react";

interface SimpleSectionProps {
  subtitle: string;
  children: ReactNode;
}

const SimpleSection = ({ subtitle, children }: SimpleSectionProps) => {
  return (
    <article className="flex flex-col w-full">
      <section className="bg-amber-500 px-4 sm:px-8 py-3 sm:py-4 max-w-full w-max rounded-t-3xl">
        <h1 className="text-white font-bold text-xl sm:text-2xl wrap-break-word">
          {subtitle}
        </h1>
      </section>
      <section className="bg-amber-300 px-4 sm:px-8 py-3 sm:py-4 w-full">
        {children}
      </section>
    </article>
  );
};

export default SimpleSection;
