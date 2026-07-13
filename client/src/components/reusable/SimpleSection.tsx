import type { ReactNode } from "react";

interface SimpleSectionProps {
  subtitle: string;
  children: ReactNode;
}

const SimpleSection = ({ subtitle, children }: SimpleSectionProps) => {
  return (
    <article className="flex flex-col">
      <section className="bg-amber-500 px-8 py-4 w-max rounded-t-3xl">
        <h1 className="text-white font-bold text-2xl">{subtitle}</h1>
      </section>
      <section className="bg-amber-300 px-8 py-4">
        {children}
      </section>
    </article>
  );
};

export default SimpleSection;
