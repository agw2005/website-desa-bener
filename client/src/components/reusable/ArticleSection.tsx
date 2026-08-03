import type { ReactNode } from "react";
import { dateToText } from "../../helpers/dateToText.ts";
import { Link } from "react-router";
import { serverApi } from "../../helpers/serverApi.ts";

interface ArticleSectionProps {
  title: string;
  uploadDate: number;
  articleId: number;
  children: ReactNode;
}

const ArticleSection = (
  { title, uploadDate, articleId, children }: ArticleSectionProps,
) => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col gap-4 bg-amber-300 p-8 rounded-3xl">
        <div className="flex flex-col gap-2">
          <Link
            to={`/pengumuman/${articleId}`}
          >
            <img
              src={serverApi.get.artikel.thumbnail(articleId)}
              alt={`Image for article ${title}`}
              className="w-full max-h-98 object-cover rounded-xl | transition duration-300 ease-in-out hover:brightness-75"
              onError={(e) => {
                e.currentTarget.src = "/tidak-ada-gambar-box.png";
                e.currentTarget.onerror = null;
              }}
            />
          </Link>
          <Link
            to={`/pengumuman/${articleId}`}
            className="font-bold text-2xl"
          >
            <h2 className="text-black hover:text-blue-900 active:text-blue-800">
              {title}
            </h2>
            <h3 className="text-black hover:text-blue-900 active:text-blue-800 | text-xs">
              {dateToText(new Date(uploadDate))}
            </h3>
          </Link>
        </div>
        <div className="line-clamp-3 text-sm text-justify">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ArticleSection;
