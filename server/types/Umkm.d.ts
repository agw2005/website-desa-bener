export interface Umkm {
  umkm_id: number;
  nama: string;
  deskripsi: string;
  dusun_id: number | null;
  foto: Uint8Array;
}

export interface KontakUmkm {
  kontak_umkm_id: number;
  jenis_kontak: string;
  isi: string;
  tautan: string;
}

export interface UmkmDetail extends Umkm {
  kontak: KontakUmkm[];
}
