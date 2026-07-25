import type { ReactNode } from "react";
import Button from "./Button.tsx";
import { Link, useNavigate } from "react-router";
import Breadcrumbs from "./Breadcrumbs.tsx";
import useAuth from "../../hooks/useAuth.tsx";

interface PrimitiveProps {
  children: ReactNode;
}

const LINKS = {
  home: "/",
  profil: "/profil",
  data: "/data",
  layanan: "/layanan",
  pengumuman: "/pengumuman",
  wisata: "/wisata",
  kontak: "/kontak",
  kalender: "/kalender",
  manajemen: "/manajemen",
  login: "/login",
};

const Primitive = ({ children }: PrimitiveProps) => {
  const navigate = useNavigate();
  const { isLoggedIn, authIsLoading, authInfo } = useAuth();

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <title>Desa Bener</title>
        <div className="flex bg-amber-500 px-16 pt-8">
          <div className="flex gap-4 items-center">
            <div className="w-24 h-24 p-2 bg-white rounded-2xl flex justify-center items-center overflow-hidden">
              <img
                src="logo-kabupaten-semarang.png"
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
          <div className="flex gap-2 bg-amber-500 px-16 pt-4 pb-12 rounded-b-full bottom-shadow">
            {isLoggedIn && (
              <p className="font-bold text-white">
                ({authIsLoading ? "Loading" : authInfo.identifier})
              </p>
            )}
            <Breadcrumbs />
          </div>
          <nav className="px-8 flex justify-center gap-4 relative bottom-6">
            <Link to={LINKS.home}>
              <Button className="bottom-shadow">BERANDA</Button>
            </Link>
            <Link to={LINKS.profil}>
              <Button className="bottom-shadow">PROFIL</Button>
            </Link>
            <Link to={LINKS.data}>
              <Button className="bottom-shadow">DATA</Button>
            </Link>
            <Link to={LINKS.layanan}>
              <Button className="bottom-shadow">LAYANAN PUBLIK</Button>
            </Link>
            <Link to={LINKS.pengumuman}>
              <Button className="bottom-shadow">PENGUMUMAN</Button>
            </Link>
            <Link to={LINKS.wisata}>
              <Button className="bottom-shadow">WISATA</Button>
            </Link>
            <Link to={LINKS.kontak}>
              <Button className="bottom-shadow">KONTAK ASPIRASI</Button>
            </Link>
            <Link to={LINKS.kalender}>
              <Button className="bottom-shadow">KALENDER</Button>
            </Link>
            {isLoggedIn && !authIsLoading && authInfo.type === "aparatur" && (
              <Link to={LINKS.manajemen}>
                <Button className="bottom-shadow">MANAJEMEN</Button>
              </Link>
            )}
            {isLoggedIn
              ? (
                <Button
                  onClick={() => {
                    localStorage.removeItem("local_token");
                    navigate("/login");
                  }}
                  className="bottom-shadow"
                >
                  LOGOUT
                </Button>
              )
              : (
                <Link to={LINKS.login}>
                  <Button className="bottom-shadow">LOGIN</Button>
                </Link>
              )}
          </nav>
        </div>
        <main className="flex flex-col gap-16 flex-1">
          {children}
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
            <div className="border-4 border-black rounded-full aspect-square size-40 flex items-center justify-center bg-white font-bold overflow-hidden">
              <img
                className="w-full h-full object-contain p-4"
                src="logo-kabupaten-semarang.png"
                alt="logo-desa-bener"
              />
            </div>
            <div className="flex flex-col gap-16">
              <h2 className="text-2xl font-bold text-white text-center">
                PEMERINTAH DESA BENER
              </h2>
              <div className="text-center text-white text-xs px-16 leading-relaxed">
                Jl. Lurik Manunggal<br />Desa Bener<br />Kecamatan
                Tengaran<br />Kabupaten Semarang<br />Jawa Tengah, Indonesia
              </div>
              <div className="text-center text-white text-xs px-12">
                Website resmi Desa Bener untuk informasi publik, layanan
                mandiri, berita desa, dan transparansi pembangunan yang dibuat
                oleh Danial Al-Ghazali Walangadi (2304130143) dari tim UNNES
                GIAT 16 Desa Bener.
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
      </div>
    </>
  );
};

export default Primitive;
