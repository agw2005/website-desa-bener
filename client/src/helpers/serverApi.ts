const serverRoot = import.meta.env.VITE_SERVER_ROOT ?? "";

const buildUrl = (path: string): string => `${serverRoot}${path}`;

export const serverApi = {
  get: {
    health: () => buildUrl("/"), // NOT USED BUT KEEP
    verify: () => buildUrl("/verifikasi"), // USED (2)
    pelayanan: {
      one: (id: number | string) => buildUrl(`/pelayanan/${id}`), // USED
      all: () => buildUrl("/pelayanan/lengkap"), // USED (2)
    },
    umkm: {
      one: (id: number | string) => buildUrl(`/umkm/${id}`), // USED
      all: () => buildUrl("/umkm"), // USED
      photo: (id: number | string) => buildUrl(`/umkm/foto/${id}`), // USED (2)
    },
    wisata: {
      photo: (id: number | string) => buildUrl(`/wisata/${id}`), // USED
      all: () => buildUrl("/wisata"), // USED
    },
    komentar: {
      all: () => buildUrl("/komentar"), // USED
    },
    artikel: {
      one: (id: number | string) => buildUrl(`/artikel/${id}`), // USED
      all: () => buildUrl("/artikel"), // USED
      latest: () => buildUrl("/artikel/terbaru"), // USED
      thumbnail: (id: number | string) => buildUrl(`/artikel/thumbnail/${id}`), // USED (3)
      attachments: (id: number | string) => buildUrl(`/artikel/lampiran/${id}`), // NOT USED (NOT IMPLEMENTED)
    },
    label: {
      all: () => buildUrl("/label"), // USED (2)
    },
    apbdes: {
      one: (year: number | string) => buildUrl(`/apbdes/${year}`), // USED
      attachments: (id: number | string) => buildUrl(`/apbdes/file/${id}`), // USED (2)
    },
    misi: () => buildUrl("/misi"), // USED (2)
    visi: () => buildUrl("/visi"), // USED (2)
    aparatur: {
      all: () => buildUrl("/aparatur"), // USED (3)
      photo: (id: number | string) => buildUrl(`/aparatur/foto/${id}`), // USED (2)
    },
    profil: {
      all: () => buildUrl("/profil"), // USED
      calendar: () => buildUrl("/profil/kalender"), // USED
      map: () => buildUrl("/profil/peta"), // USED
      data: () => buildUrl("/profil/data"), // USED
      description: () => buildUrl("/profil/deskripsi"), // USED
    },
    dusun: {
      all: () => buildUrl("/dusun"), // USED (2)
      one: (id: number | string) => buildUrl(`/dusun/${id}`), // USED
      names: () => buildUrl("/dusun/nama"), // USED
    },
  },
  post: {
    pelayanan: {
      parent: () => buildUrl("/pelayanan"), // USED
      children: (id: number | string) => buildUrl(`/pelayanan/${id}/syarat`), // USED
    },
    umkm: () => buildUrl("/umkm"), // USED
    wisata: () => buildUrl("/wisata"), // USED
    komentar: () => buildUrl("/komentar"), // USED
    artikel: () => buildUrl("/artikel"), // USED
    label: (nama: string) => buildUrl(`/label?nama=${nama}`), // USED
    apbdes: (year: number | string) => buildUrl(`/apbdes/${year}`), // USED
    misi: () => buildUrl("/misi"), // USED
    visi: () => buildUrl("/visi"), // USED
    aparatur: {
      new: () => buildUrl("/aparatur"), // USED
      login: () => buildUrl("/aparatur/login"), // USED
    },
    dusun: (nama: string) => buildUrl(`/dusun?nama=${nama}`), // USED
  },
  delete: {
    pelayanan: {
      syarat: (id: number | string) => buildUrl(`/syarat/${id}`), // USED
      one: (id: number | string) => buildUrl(`/pelayanan/${id}`), // USED
    },
    umkm: (id: number | string) => buildUrl(`/umkm/${id}`), // USED
    wisata: (id: number | string) => buildUrl(`/wisata/${id}`), // USED
    komentar: (id: number | string) => buildUrl(`/komentar/${id}`), // USED
    artikel: (id: number | string) => buildUrl(`/artikel/${id}`), // USED
    label: (id: number | string) => buildUrl(`/label/${id}`), // USED
    apbdes: (id: number | string) => buildUrl(`/apbdes/${id}`), // USED
    misi: (id: number | string) => buildUrl(`/misi/${id}`), // USED
    visi: (id: number | string) => buildUrl(`/visi/${id}`), // USED
    aparatur: (id: number | string) => buildUrl(`/aparatur/${id}`), // USED
    dusun: (id: number | string) => buildUrl(`/dusun/${id}`), // USED
  },
  patch: {
    profil: () => buildUrl("/profil"), // USED
    dusun: (id: number | string) => buildUrl(`/dusun/${id}`), // USED
  },
};
