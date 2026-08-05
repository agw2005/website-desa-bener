const serverRoot = import.meta.env.VITE_SERVER_ROOT ?? "";

const buildUrl = (path: string): string => `${serverRoot}${path}`;

export const serverApi = {
  get: {
    health: () => buildUrl("/"),
    verify: () => buildUrl("/verifikasi"),
    pelayanan: {
      one: (id: number | string) => buildUrl(`/pelayanan/${id}`),
      all: () => buildUrl("/pelayanan/lengkap"),
    },
    umkm: {
      one: (id: number | string) => buildUrl(`/umkm/${id}`),
      all: () => buildUrl("/umkm"),
      photo: (id: number | string) => buildUrl(`/umkm/foto/${id}`),
    },
    wisata: {
      photo: (id: number | string) => buildUrl(`/wisata/${id}`),
      all: () => buildUrl("/wisata"),
    },
    komentar: {
      all: () => buildUrl("/komentar"),
    },
    artikel: {
      one: (id: number | string) => buildUrl(`/artikel/${id}`),
      all: () => buildUrl("/artikel"),
      latest: () => buildUrl("/artikel/terbaru"),
      thumbnail: (id: number | string) => buildUrl(`/artikel/thumbnail/${id}`),
      attachment: (id: number | string) => buildUrl(`/artikel/lampiran/${id}`),
    },
    label: {
      all: () => buildUrl("/label"),
    },
    apbdes: {
      one: (year: number | string) => buildUrl(`/apbdes/${year}`),
      attachments: (id: number | string) => buildUrl(`/apbdes/file/${id}`),
    },
    misi: () => buildUrl("/misi"),
    visi: () => buildUrl("/visi"),
    aparatur: {
      all: () => buildUrl("/aparatur"),
      photo: (id: number | string) => buildUrl(`/aparatur/foto/${id}`),
    },
    profil: {
      all: () => buildUrl("/profil"),
      calendar: () => buildUrl("/profil/kalender"),
      map: () => buildUrl("/profil/peta"),
      data: () => buildUrl("/profil/data"),
      description: () => buildUrl("/profil/deskripsi"),
    },
    dusun: {
      all: () => buildUrl("/dusun"),
      one: (id: number | string) => buildUrl(`/dusun/${id}`),
      names: () => buildUrl("/dusun/nama"),
    },
  },
  post: {
    pelayanan: {
      parent: () => buildUrl("/pelayanan"),
      children: (id: number | string) => buildUrl(`/pelayanan/${id}/syarat`),
    },
    umkm: {
      parent: () => buildUrl("/umkm"),
      button: (id: number | string) => buildUrl(`/umkm/${id}`),
    },
    wisata: () => buildUrl("/wisata"),
    komentar: () => buildUrl("/komentar"),
    artikel: () => buildUrl("/artikel"),
    label: (nama: string) => buildUrl(`/label?nama=${nama}`),
    apbdes: (year: number | string) => buildUrl(`/apbdes/${year}`),
    misi: () => buildUrl("/misi"),
    visi: () => buildUrl("/visi"),
    aparatur: {
      new: () => buildUrl("/aparatur"),
      login: () => buildUrl("/aparatur/login"),
    },
    dusun: (nama: string) => buildUrl(`/dusun?nama=${nama}`),
  },
  delete: {
    pelayanan: {
      syarat: (id: number | string) => buildUrl(`/syarat/${id}`),
      one: (id: number | string) => buildUrl(`/pelayanan/${id}`),
    },
    umkm: (id: number | string) => buildUrl(`/umkm/${id}`),
    wisata: (id: number | string) => buildUrl(`/wisata/${id}`),
    komentar: (id: number | string) => buildUrl(`/komentar/${id}`),
    artikel: (id: number | string) => buildUrl(`/artikel/${id}`),
    label: (id: number | string) => buildUrl(`/label/${id}`),
    apbdes: (id: number | string) => buildUrl(`/apbdes/${id}`),
    misi: (id: number | string) => buildUrl(`/misi/${id}`),
    visi: (id: number | string) => buildUrl(`/visi/${id}`),
    aparatur: (id: number | string) => buildUrl(`/aparatur/${id}`),
    dusun: (id: number | string) => buildUrl(`/dusun/${id}`),
  },
  patch: {
    profil: () => buildUrl("/profil"),
    dusun: (id: number | string) => buildUrl(`/dusun/${id}`),
    umkm: (id: number | string) => buildUrl(`/umkm/${id}`),
  },
};
