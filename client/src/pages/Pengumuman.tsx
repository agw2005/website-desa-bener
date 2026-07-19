import Primitive from "../components/reusable/Primitive.tsx";
import ArticleSection from "../components/reusable/ArticleSection.tsx";

const PLACEHOLDER_CONTENT =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius fugiat itaque quae nobis voluptas, dignissimos neque, quas ab autem eaque culpa. Sapiente nulla aliquam voluptatibus architecto, labore ratione non consequuntur!";

const Pengumuman = () => {
  return (
    <Primitive>
      <div className="grid grid-cols-3 px-32 gap-8">
        {[...Array(8)].map((_, index) => (
          <ArticleSection
            articleId={index}
            title="ARTIKEL"
            uploadDate={(new Date()).getTime()}
          >
            {PLACEHOLDER_CONTENT}
          </ArticleSection>
        ))}
      </div>
    </Primitive>
  );
};

export default Pengumuman;
