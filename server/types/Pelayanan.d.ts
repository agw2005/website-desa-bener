export interface Pelayanan {
  pelayanan_id: number;
  judul: string;
}

export interface SyaratPelayanan {
  syarat_pelayanan_id: number;
  isi: string;
  tautan: string | null;
}

export interface PelayananDetail extends Pelayanan {
  syarat: SyaratPelayanan[];
}
