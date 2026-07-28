import {
  create,
  getNumericDate,
  type Header,
  type Payload,
  verify,
} from "@zaubrik/djwt";
import type { LoggedInInfo, LoginInfo } from "../types/Login.d.ts";
import type { RouterContext } from "@oak/oak/router";
import { decodeBase64 } from "@std/encoding/base64";
import type { Aparatur } from "../types/Aparatur.d.ts";
import { pool } from "../dbpool.ts";

const getAparaturByName = async (nama: string): Promise<Aparatur | null> => {
  const connection = await pool.connect();
  try {
    const result = await connection.queryObject<Aparatur>(
      "SELECT * FROM Aparatur WHERE nama = $1 LIMIT 1",
      [nama],
    );
    return result.rows[0] ?? null;
  } finally {
    connection.release();
  }
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

  const jwtKeyString = Deno.env.get("JWT_KEY");
  if (!jwtKeyString) throw new Error("JWT_KEY environment variable is missing");
  const jwtKeyBytes = decodeBase64(jwtKeyString);
  const jwtKey = await crypto.subtle.importKey(
    "raw",
    jwtKeyBytes,
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
  );

  const jwtHeader: Header = { alg: "HS512", typ: "JWT" };
  const jwtPayload: Payload = {
    iss: "System",
    exp: getNumericDate(60 * 60 * 9), // 9 hours
    id: aparaturCandidate.aparatur_id,
    identifier: aparaturCandidate.nama,
  };

  const jwt = await create(jwtHeader, jwtPayload, jwtKey);

  ctx.response.status = 200;
  ctx.response.body = { jwt };
};

export const verifyJwt = async (ctx: RouterContext<"/verifikasi">) => {
  const jwtKeyString = Deno.env.get("JWT_KEY");
  if (!jwtKeyString) throw new Error("JWT_KEY environment variable is missing");
  const jwtKeyBytes = decodeBase64(jwtKeyString);

  const jwtKey = await crypto.subtle.importKey(
    "raw",
    jwtKeyBytes,
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
  );

  const headers = ctx.request.headers;
  const authHeader = headers.get("Authorization");

  if (!authHeader) {
    ctx.response.status = 401;
    ctx.response.body = { message: "No authorization detected" };
    return;
  }

  const clientJwtToken = authHeader.split(" ")[1];

  if (!clientJwtToken) {
    ctx.response.status = 401;
    ctx.response.body = { message: "Invalid JWT" };
    return;
  }

  try {
    const decoded = (await verify(
      clientJwtToken,
      jwtKey,
    ) as unknown) as LoggedInInfo;

    if (decoded) {
      ctx.response.status = 200;
      ctx.response.body = decoded;
    } else {
      ctx.response.status = 401;
      ctx.response.body = { message: "JWT is no longer valid" };
    }
  } catch (err) {
    console.error(err);
  }
};
