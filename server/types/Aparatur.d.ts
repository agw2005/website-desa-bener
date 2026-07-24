export interface LoginInfo {
  nama: string;
  kata_sandi: string;
}

export interface JwtPayload {
  iss: string;
  exp: number;
  name: string;
}
