export interface DeskripsiSekilas {
  deskripsi_sekilas: string;
}

export interface ProfilDesaData {
  kode_desa: number;
  kecamatan: string;
  kabupaten_kota: string;
  provinsi: string;
  tahun_pembentukan: number;
  luas: number;
  koordinat: string;
  tipologi: string;
  klasifikasi: string;
  kategori: string;
  batas_timur: string;
  batas_barat: string;
  batas_selatan: string;
  batas_utara: string;
  sejarah: string;
}

export interface Profil {
  profil_id: number;
  deskripsi_sekilas: string;
  kode_desa: number;
  kecamatan: string;
  kabupaten_kota: string;
  provinsi: string;
  tahun_pembentukan: number;
  luas: number;
  koordinat: string;
  tipologi: string;
  klasifikasi: string;
  kategori: string;
  batas_timur: string;
  batas_barat: string;
  batas_selatan: string;
  batas_utara: string;
  sejarah: string;
  peta: Uint8Array;
  tautan_kalender: string;
}
