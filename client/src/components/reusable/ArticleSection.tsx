import type { ReactNode } from "react";

interface ArticleSectionProps {
  title: string;
  children: ReactNode;
}

const ArticleSection = ({ title, children }: ArticleSectionProps) => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col gap-8 bg-amber-300 p-8 rounded-3xl">
        <div className="flex flex-col gap-2">
          <img
            src="https://picsum.photos/id/237/200"
            alt={`Image for article ${title}`}
            className="w-full max-h-98 object-cover rounded-xl"
          />
          <h2 className="font-bold text-2xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
};

export default ArticleSection;
