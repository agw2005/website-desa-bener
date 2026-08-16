import {
  create,
  getNumericDate,
  type Header,
  type Payload,
  verify,
} from "@zaubrik/djwt";
import type { LoggedInInfo, LoginInfo } from "../types/Login.d.ts";
import type { RouterContext } from "@oak/oak/router";
import type { Aparatur } from "../types/Aparatur.d.ts";
import { getJwtKey } from "../helpers/getJwtKey.ts";
import { executeQuery } from "../helpers/executeQuery.ts";

const getAparaturByName = async (nama: string): Promise<Aparatur | null> => {
  const rows = await executeQuery<Aparatur>(
    "SELECT * FROM Aparatur WHERE nama = $1 LIMIT 1;",
    [nama],
  );
  return rows[0] ?? null;
};

export const requestJwtAparatur = async (ctx: RouterContext<"/login">) => {
  let request: LoginInfo;
  try {
    request = await ctx.request.body.json();
  } catch {
    ctx.response.status = 400;
    ctx.response.body = { error: "Body permintaan tidak valid." };
    return;
  }

  const { identifier: namaAparatur, kata_sandi: kataSandi } = request;

  if (
    typeof namaAparatur !== "string" || typeof kataSandi !== "string" ||
    namaAparatur.trim() === "" || kataSandi.trim() === ""
  ) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Nama dan kata sandi wajib diisi." };
    return;
  }

  const aparaturCandidate = await getAparaturByName(namaAparatur);
  const passwordMatches = aparaturCandidate?.kata_sandi === kataSandi;

  if (!aparaturCandidate || !passwordMatches) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Nama atau kata sandi salah." };
    return;
  }

  const jwtKey = await getJwtKey();
  const jwtHeader: Header = { alg: "HS512", typ: "JWT" };
  const jwtPayload: Payload = {
    iss: "System",
    exp: getNumericDate(60 * 60 * 9),
    id: aparaturCandidate.aparatur_id,
    identifier: aparaturCandidate.nama,
  };

  const jwt = await create(jwtHeader, jwtPayload, jwtKey);

  ctx.response.status = 200;
  ctx.response.body = { jwt };
};

export const verifyJwt = async (ctx: RouterContext<"/verifikasi">) => {
  const authHeader = ctx.request.headers.get("Authorization");

  if (!authHeader) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Tidak ada token otorisasi." };
    return;
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Format token tidak valid." };
    return;
  }

  try {
    const jwtKey = await getJwtKey();
    const decoded = await verify(token, jwtKey) as unknown as LoggedInInfo;

    ctx.response.status = 200;
    ctx.response.body = decoded;
  } catch (err) {
    console.error(err);
    ctx.response.status = 401;
    ctx.response.body = { error: "Token tidak valid atau kedaluwarsa." };
  }
};
