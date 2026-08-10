import type { ReactNode } from "react";
import { useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <title>Desa Bener</title>

        <div className="flex bg-amber-500 px-4 sm:px-8 lg:px-16 pt-6 lg:pt-8">
          <div className="flex gap-3 sm:gap-4 items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 p-2 bg-white rounded-2xl flex justify-center items-center overflow-hidden shrink-0">
              <img
                src="/logo-kabupaten-semarang.png"
                alt="logo-desa-bener"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/tidak-ada-gambar-box.png";
                  e.currentTarget.onerror = null;
                }}
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-white font-bold text-lg sm:text-xl lg:text-2xl">
                DESA BENER
              </h1>
              <h2 className="text-white text-xs sm:text-sm">
                Kec. Tengaran, Kab. Semarang<br />Provinsi Jawa Tengah
              </h2>
            </div>
          </div>
        </div>

        <div className="sticky top-0 z-50">
          <div className="flex gap-2 items-center bg-amber-500 px-4 sm:px-8 lg:px-16 pt-3 lg:pt-4 pb-6 lg:pb-12 rounded-b-2xl lg:rounded-b-full bottom-shadow">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="lg:hidden shrink-0 text-white font-bold px-3 py-1 rounded-lg border-2 border-white bg-black"
              aria-label="Buka menu navigasi"
              aria-expanded={menuOpen}
            >
              {menuOpen ? "Tutup" : "Menu"}
            </button>
            {isLoggedIn && (
              <p className="font-bold text-white text-xs sm:text-sm shrink-0">
                ({authIsLoading ? "Loading" : authInfo.identifier})
              </p>
            )}
            <div className="min-w-0">
              <Breadcrumbs />
            </div>
          </div>

          <nav
            className={`px-4 sm:px-8 flex-col lg:flex-row lg:flex flex-wrap justify-center gap-2 sm:gap-3 relative lg:bottom-6 pt-4 lg:pt-0 my-4 lg:my-0 rounded-2xl bg-amber-600 lg:bg-transparent
              ${menuOpen ? "flex pb-4" : "hidden lg:flex"}`}
          >
            <Link to={LINKS.home} onClick={() => setMenuOpen(false)}>
              <Button className="bottom-shadow w-full lg:w-auto text-sm xl:text-md">
                BERANDA
              </Button>
            </Link>
            <Link to={LINKS.profil} onClick={() => setMenuOpen(false)}>
              <Button className="bottom-shadow w-full lg:w-auto text-sm xl:text-md">
                PROFIL
              </Button>
            </Link>
            <Link to={LINKS.data} onClick={() => setMenuOpen(false)}>
              <Button className="bottom-shadow w-full lg:w-auto text-sm xl:text-md">
                DATA
              </Button>
            </Link>
            <Link to={LINKS.layanan} onClick={() => setMenuOpen(false)}>
              <Button className="bottom-shadow w-full lg:w-auto text-sm xl:text-md">
                LAYANAN PUBLIK
              </Button>
            </Link>
            <Link to={LINKS.pengumuman} onClick={() => setMenuOpen(false)}>
              <Button className="bottom-shadow w-full lg:w-auto text-sm xl:text-md">
                PENGUMUMAN
              </Button>
            </Link>
            <Link to={LINKS.wisata} onClick={() => setMenuOpen(false)}>
              <Button className="bottom-shadow w-full lg:w-auto text-sm xl:text-md">
                WISATA
              </Button>
            </Link>
            <Link to={LINKS.kontak} onClick={() => setMenuOpen(false)}>
              <Button className="bottom-shadow w-full lg:w-auto text-sm xl:text-md">
                KONTAK ASPIRASI
              </Button>
            </Link>
            <Link to={LINKS.kalender} onClick={() => setMenuOpen(false)}>
              <Button className="bottom-shadow w-full lg:w-auto text-sm xl:text-md">
                KALENDER
              </Button>
            </Link>
            {isLoggedIn && !authIsLoading && (
              <Link
                to={LINKS.manajemen}
                onClick={() => setMenuOpen(false)}
              >
                <Button className="bottom-shadow w-full lg:w-auto text-sm xl:text-md">
                  MANAJEMEN
                </Button>
              </Link>
            )}
            {isLoggedIn
              ? (
                <Button
                  onClick={() => {
                    localStorage.removeItem("local_token");
                    setMenuOpen(false);
                    navigate("/login");
                  }}
                  className="bottom-shadow w-full lg:w-auto text-sm xl:text-md"
                >
                  LOGOUT
                </Button>
              )
              : (
                <Link to={LINKS.login} onClick={() => setMenuOpen(false)}>
                  <Button className="bottom-shadow w-full lg:w-auto text-sm xl:text-md">
                    LOGIN
                  </Button>
                </Link>
              )}
          </nav>
        </div>

        <main className="flex flex-col gap-8 sm:gap-12 lg:gap-16 flex-1 py-8">
          {children}
        </main>

        <footer className="bg-black mt-16 sm:mt-24 lg:mt-32 pt-8 pb-8 px-4 sm:px-8 lg:px-16 flex flex-col lg:flex-row gap-8 lg:gap-16 relative">
          <section className="flex flex-col flex-1 order-2 lg:order-1">
            <div className="bg-amber-500 flex justify-center p-3 sm:p-4 font-bold text-sm sm:text-base">
              LOKASI BALAI DESA
            </div>
            <div className="bg-white flex justify-center items-center text-xs">
              <iframe
                className="h-56 sm:h-64 lg:h-75 w-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d298.368306004403!2d110.51549963254276!3d-7.376758441336304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a79ff3320be0f%3A0xb019462c2379b0a0!2sKantor%20Kelurahan%20Desa%20Bener!5e0!3m2!1sen!2sro!4v1783912345330!5m2!1sen!2sro"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              >
              </iframe>
            </div>
          </section>

          <section className="flex flex-col flex-1 items-center justify-between order-1 lg:order-2 lg:-mt-32">
            <div className="border-4 border-black rounded-full aspect-square size-28 sm:size-32 lg:size-40 flex items-center justify-center bg-white font-bold overflow-hidden">
              <img
                className="w-full h-full object-contain p-3 lg:p-4"
                src="/logo-kabupaten-semarang.png"
                alt="logo-desa-bener"
                onError={(e) => {
                  e.currentTarget.src = "/tidak-ada-gambar-box.png";
                  e.currentTarget.onerror = null;
                }}
              />
            </div>
            <div className="flex flex-col gap-8 lg:gap-16 mt-6 lg:mt-0">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white text-center">
                PEMERINTAH DESA BENER
              </h2>
              <div className="text-center text-white text-xs px-4 sm:px-8 lg:px-16 leading-relaxed">
                Jl. Lurik Manunggal<br />Desa Bener<br />Kecamatan
                Tengaran<br />Kabupaten Semarang<br />Jawa Tengah, Indonesia
              </div>
              <div className="text-center text-white text-xs px-2 sm:px-8 lg:px-12">
                Website resmi Desa Bener untuk informasi publik, layanan
                mandiri, berita desa, dan transparansi pembangunan yang dibuat
                oleh{" "}
                <a
                  href="https://agw2005.github.io/"
                  className="text-blue-200 hover:text-blue-500 active:text-blue-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Danial Al-Ghazali Walangadi
                </a>{" "}
                (NIM 2304130143) dari tim{" "}
                <a
                  href="https://www.instagram.com/giat16_desabener/"
                  className="text-blue-200 hover:text-blue-500 active:text-blue-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  UNNES GIAT 16 Desa Bener
                </a>.
              </div>
            </div>
          </section>

          <section className="flex flex-col flex-1 order-3">
            <div className="bg-amber-500 flex justify-center p-3 sm:p-4 font-bold text-sm sm:text-base">
              WILAYAH DESA
            </div>
            <div className="bg-white flex justify-center items-center text-white text-xs">
              <iframe
                className="h-56 sm:h-64 lg:h-75 w-full"
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
