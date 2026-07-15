import type { ReactNode } from "react";

interface RoundedSectionProps {
  title: string;
  children: ReactNode;
}

const RoundedSection = ({ title, children }: RoundedSectionProps) => {
  return (
    <section className="flex flex-col">
      <div className="bg-amber-500 px-8 py-4 rounded-t-3xl w-max text-white font-bold text-2xl">
        {title}
      </div>
      <div className="flex bg-amber-300 p-8 rounded-b-3xl rounded-tr-3xl">
        {children}
      </div>
    </section>
  );
};

export default RoundedSection;
