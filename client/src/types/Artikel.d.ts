export interface Artikel {
  artikel_id: number;
  judul: string;
  isi: string;
  waktu_upload: number;
}

export interface ArtikelWithLabel extends Artikel {
  labels: { label_id: number; nama: string }[];
}

export interface LampiranArtikelMetadata {
  lampiran_artikel_id: number;
  nama_file: string;
  besar_file: number;
}

export interface ArtikelDetail extends ArtikelWithLabel {
  lampiran: LampiranArtikelMetadata[];
}
