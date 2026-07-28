export interface Artikel {
  artikel_id: number;
  judul: string;
  isi: string;
  waktu_upload: number;
}

export interface ArtikelWithLabel extends Artikel {
  labels: { label_id: number; nama: string }[];
}
