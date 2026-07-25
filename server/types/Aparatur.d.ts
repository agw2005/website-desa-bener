export interface Aparatur {
  aparatur_id: number;
  nama: string;
  jabatan: string;
  telepon: string;
  foto: Uint8Array;
  kata_sandi: string;
}

export interface JwtPayload {
  iss: string;
  exp: number;
  identifier: string;
  type: "aparatur" | "warga";
}
