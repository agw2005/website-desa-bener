import { useLocation } from "react-router";

const LABELS: Record<string, string> = {
  "": "Beranda",
  profil: "Profil",
  data: "Data",
  layanan: "Layanan Publik",
  pengumuman: "Pengumuman",
  wisata: "Wisata",
  kontak: "Kontak Aspirasi",
  kalender: "Kalender",
  login: "Login",
};

export const useBreadcrumbs = () => {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = [
    { label: LABELS[""], path: "/" },
    ...segments.map((segment, index) => {
      const path = "/" + segments.slice(0, index + 1).join("/");
      return { label: LABELS[segment] ?? segment, path };
    }),
  ];

  return crumbs;
};
