import Primitive from "../components/reusable/Primitive.tsx";
import SimpleSection from "../components/reusable/SimpleSection.tsx";
import ManualCarousel from "../components/reusable/ManualCarousel.tsx";

const APARATUR_DESA = [
  {
    title: "Kepala Desa",
    subtitle: "Beni Saefudin",
    photo: "example-profile.jpg",
  },
  {
    title: "Kepala Dusun Krajan I",
    subtitle: "Kadus 1",
    photo: "example-profile.jpg",
  },
  {
    title: "Kepala Dusun Krajan II",
    subtitle: "Kadus 2",
    photo: "example-profile.jpg",
  },
  {
    title: "Kepala Dusun Cebongan",
    subtitle: "Kadus 3",
    photo: "example-profile.jpg",
  },
  {
    title: "Kepala Dusun Tuguh",
    subtitle: "Kadus 4",
    photo: "example-profile.jpg",
  },
  {
    title: "Kepala Dusun Karangbalong",
    subtitle: "Kadus 5",
    photo: "example-profile.jpg",
  },
  {
    title: "Kepala Dusun Kadipurwo",
    subtitle: "Kadus 6",
    photo: "example-profile.jpg",
  },
  {
    title: "Sekretaris I",
    subtitle: "Sekdes 1",
    photo: "example-profile.jpg",
  },
  {
    title: "Sekretaris II",
    subtitle: "Sekdes 2",
    photo: "example-profile.jpg",
  },
];

const Home = () => {
  return (
    <Primitive>
      <SimpleSection subtitle="PROFIL SEKILAS">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam et,
        rerum beatae quas repellendus unde dolorem rem consequuntur soluta
        corporis saepe. Velit tenetur ad vitae sunt minima ea, repudiandae
        accusantium. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Officia recusandae voluptatem, quo officiis excepturi molestiae
        architecto beatae fugit itaque dolore, quaerat, optio sunt non et
        dolorem tempora porro aut vel?
      </SimpleSection>

      <SimpleSection subtitle="APARATUR DESA">
        <ManualCarousel visibleCards={7} pixelGap={16} items={APARATUR_DESA} />
      </SimpleSection>

      <SimpleSection subtitle="LAYANAN MANDIRI">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam et,
        rerum beatae quas repellendus unde dolorem rem consequuntur soluta
        corporis saepe. Velit tenetur ad vitae sunt minima ea, repudiandae
        accusantium. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Officia recusandae voluptatem, quo officiis excepturi molestiae
        architecto beatae fugit itaque dolore, quaerat, optio sunt non et
        dolorem tempora porro aut vel?
      </SimpleSection>

      <SimpleSection subtitle="ARTIKEL TERKINI">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam et,
        rerum beatae quas repellendus unde dolorem rem consequuntur soluta
        corporis saepe. Velit tenetur ad vitae sunt minima ea, repudiandae
        accusantium. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Officia recusandae voluptatem, quo officiis excepturi molestiae
        architecto beatae fugit itaque dolore, quaerat, optio sunt non et
        dolorem tempora porro aut vel?
      </SimpleSection>
    </Primitive>
  );
};

export default Home;
