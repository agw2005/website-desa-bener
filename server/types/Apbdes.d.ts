export interface Apbdes {
  apbdes_id: number;
  tahun: number;
}

export interface LampiranApbdes {
  apbdes_file_id: number;
  apbdes_id: number;
  nama_file: string;
  besar_file: number;
  isi_file: Uint8Array;
}

export interface ApbdesDetail extends Apbdes {
  lampiran: Omit<LampiranApbdes, "apbdes_id" | "isi_file">[];
}
