import Button from "./components/reusable/Button.tsx";

function App() {
  return (
    <>
      <title>{globalThis.location.pathname}</title>
      <div className="flex bg-amber-500 px-16 pt-8">
        <div className="flex gap-4 items-center">
          <div className="w-24 h-24 p-2 bg-white rounded-2xl flex justify-center items-center overflow-hidden">
            <img
              src="contoh-logo.png"
              alt="logo-desa-bener"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-white font-bold text-2xl">DESA BENER</h1>
            <h2 className="text-white">
              Kec. Tengaran, Kab. Semarang<br />Provinsi Jawa Tengah
            </h2>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-50">
        <div className="flex bg-amber-500 px-16 pt-4 pb-12 rounded-b-full">
          <h2 className="font-bold text-white">Bread &gt; Crumbs</h2>
        </div>
        <nav className="px-32 flex justify-center gap-4 relative bottom-6">
          <Button>PROFIL</Button>
          <Button>DATA</Button>
          <Button>LAYANAN PUBLIK</Button>
          <Button>PENGUMUMAN</Button>
          <Button>WISATA</Button>
          <Button>KONTAK ASPIRASI</Button>
          <Button>KALENDER</Button>
          <Button>LOGIN</Button>
        </nav>
      </div>

      <main className="flex flex-col gap-16">
        <article className="flex flex-col">
          <section className="bg-amber-500 px-8 py-4 w-max rounded-t-3xl">
            <h1 className="text-white font-bold text-2xl">PROFIL SEKILAS</h1>
          </section>
          <section className="bg-amber-300 px-8 py-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam et,
            rerum beatae quas repellendus unde dolorem rem consequuntur soluta
            corporis saepe. Velit tenetur ad vitae sunt minima ea, repudiandae
            accusantium. Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Officia recusandae voluptatem, quo officiis excepturi
            molestiae architecto beatae fugit itaque dolore, quaerat, optio sunt
            non et dolorem tempora porro aut vel?
          </section>
        </article>

        <article className="flex flex-col">
          <section className="bg-amber-500 px-8 py-4 w-max rounded-t-3xl">
            <h1 className="text-white font-bold text-2xl">APARATUR DESA</h1>
          </section>
          <section className="bg-amber-300 px-8 py-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam et,
            rerum beatae quas repellendus unde dolorem rem consequuntur soluta
            corporis saepe. Velit tenetur ad vitae sunt minima ea, repudiandae
            accusantium. Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Officia recusandae voluptatem, quo officiis excepturi
            molestiae architecto beatae fugit itaque dolore, quaerat, optio sunt
            non et dolorem tempora porro aut vel?
          </section>
        </article>

        <article className="flex flex-col">
          <section className="bg-amber-500 px-8 py-4 w-max rounded-t-3xl">
            <h1 className="text-white font-bold text-2xl">LAYANAN MANDIRI</h1>
          </section>
          <section className="bg-amber-300 px-8 py-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam et,
            rerum beatae quas repellendus unde dolorem rem consequuntur soluta
            corporis saepe. Velit tenetur ad vitae sunt minima ea, repudiandae
            accusantium. Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Officia recusandae voluptatem, quo officiis excepturi
            molestiae architecto beatae fugit itaque dolore, quaerat, optio sunt
            non et dolorem tempora porro aut vel?
          </section>
        </article>

        <article className="flex flex-col">
          <section className="bg-amber-500 px-8 py-4 w-max rounded-t-3xl">
            <h1 className="text-white font-bold text-2xl">ARTIKEL TERKINI</h1>
          </section>
          <section className="bg-amber-300 px-8 py-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam et,
            rerum beatae quas repellendus unde dolorem rem consequuntur soluta
            corporis saepe. Velit tenetur ad vitae sunt minima ea, repudiandae
            accusantium. Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Officia recusandae voluptatem, quo officiis excepturi
            molestiae architecto beatae fugit itaque dolore, quaerat, optio sunt
            non et dolorem tempora porro aut vel?
          </section>
        </article>
      </main>

      <footer className="bg-black mt-32 pt-8 pb-8 px-16 flex gap-16 relative">
        <section className="flex flex-col flex-1">
          <div className="bg-white flex justify-center p-4 font-bold">
            LOKASI BALAI DESA
          </div>
          <div className="bg-amber-500 flex justify-center items-center text-white text-xs">
            <iframe
              className="h-75 w-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d298.368306004403!2d110.51549963254276!3d-7.376758441336304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a79ff3320be0f%3A0xb019462c2379b0a0!2sKantor%20Kelurahan%20Desa%20Bener!5e0!3m2!1sen!2sro!4v1783912345330!5m2!1sen!2sro"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            >
            </iframe>
          </div>
        </section>

        <section className="flex flex-col flex-1 items-center justify-between -mt-32">
          <div className="border-4 border-black rounded-full aspect-square size-40 flex items-center justify-center bg-white font-bold text-sm">
            <img className="mt-2" src="contoh-logo.png" alt="logo-desa-bener" />
          </div>
          <div className="flex flex-col gap-16">
            <h2 className="text-2xl font-bold text-white text-center">
              PEMERINTAH DESA BENER
            </h2>
            <div className="text-center text-white text-xs px-16 leading-relaxed">
              Jl. Dukuh Cebongan<br />Desa Bener<br />Kecamatan
              Tengaran<br />Kabupaten Semarang<br />Jawa Tengah, Indonesia
            </div>
            <div className="text-center text-white text-xs px-12">
              Website resmi Desa Bener untuk informasi publik, layanan mandiri,
              berita desa, dan transparansi pembangunan yang dibuat oleh Danial
              Al-Ghazali Walangadi (2304130143) dari tim UNNES GIAT 16 Desa
              Bener.
            </div>
          </div>
        </section>

        <section className="flex flex-col flex-1">
          <div className="bg-white flex justify-center p-4 font-bold">
            WILAYAH DESA
          </div>
          <div className="bg-amber-500 flex justify-center items-center text-white text-xs">
            <iframe
              className="h-75 w-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15827.278982398184!2d110.51010771128858!3d-7.374090151845335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a79fe13e0b6d7%3A0xa502080478e8be7b!2sBener%2C%20Tengaran%2C%20Semarang%20Regency%2C%20Central%20Java%2C%20Indonesia!5e0!3m2!1sen!2sro!4v1783912132479!5m2!1sen!2sro"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            >
            </iframe>
          </div>
        </section>
      </footer>
    </>
  );
}

export default App;
