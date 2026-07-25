export interface LoginInfo {
  identifier: string;
  kata_sandi: string;
}

export interface LoggedInInfo {
  iss: string;
  exp: number;
  id: number;
  identifier: string;
  type: "aparatur" | "umum";
}
