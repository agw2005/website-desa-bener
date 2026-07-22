import ManualCarousel from "../components/reusable/ManualCarousel.tsx";
import Primitive from "../components/reusable/Primitive.tsx";
import RoundedSection from "../components/reusable/RoundedSection.tsx";

const Wisata = () => {
  return (
    <Primitive>
      <div className="flex flex-col gap-8 px-32">
        <RoundedSection title="TEMPAT WISATA">
          <ManualCarousel
            visibleCards={3}
            pixelGap={16}
            items={[
              {
                title: "Kerajinan Bambu",
                subtitle: "UMKM Desa Sukamaju",
                photo: "/tidak-ada-gambar-box.png",
              },
              {
                title: "Batik Tulis",
                subtitle: "UMKM Desa Sukamaju",
                photo: "/tidak-ada-gambar-box.png",
              },
              {
                title: "Batik Tulis",
                subtitle: "UMKM Desa Sukamaju",
                photo: "/tidak-ada-gambar-box.png",
              },
              {
                title: "Batik Tulis",
                subtitle: "UMKM Desa Sukamaju",
                photo: "/tidak-ada-gambar-box.png",
              },
              {
                title: "Batik Tulis",
                subtitle: "UMKM Desa Sukamaju",
                photo: "/tidak-ada-gambar-box.png",
              },
            ]}
          />
        </RoundedSection>
        <RoundedSection title="UMKM DESA">
          <ManualCarousel
            visibleCards={3}
            pixelGap={16}
            items={[
              {
                title: "Kerajinan Bambu",
                subtitle: "UMKM Desa Sukamaju",
                photo: "/tidak-ada-gambar-box.png",
                link: `${globalThis.location.pathname}/umkm/0`,
              },
              {
                title: "Batik Tulis",
                subtitle: "UMKM Desa Sukamaju",
                photo: "/tidak-ada-gambar-box.png",
                link: `${globalThis.location.pathname}/umkm/1`,
              },
              {
                title: "Batik Tulis",
                subtitle: "UMKM Desa Sukamaju",
                photo: "/tidak-ada-gambar-box.png",
                link: `${globalThis.location.pathname}/umkm/1`,
              },
              {
                title: "Batik Tulis",
                subtitle: "UMKM Desa Sukamaju",
                photo: "/tidak-ada-gambar-box.png",
                link: `${globalThis.location.pathname}/umkm/1`,
              },
              {
                title: "Batik Tulis",
                subtitle: "UMKM Desa Sukamaju",
                photo: "/tidak-ada-gambar-box.png",
                link: `${globalThis.location.pathname}/umkm/1`,
              },
            ]}
          />
        </RoundedSection>
      </div>
    </Primitive>
  );
};

export default Wisata;
