import { RouterContext } from "@oak/oak/router";
import { pool } from "./dbpool.ts";
import type { DeskripsiSekilas, ProfilDesaData } from "./types/Profil.d.ts";
import { decodeBase64 } from "@std/encoding/base64";
import {
  create,
  getNumericDate,
  type Header,
  type Payload,
  verify,
} from "@zaubrik/djwt";
import { Aparatur } from "./types/Aparatur.d.ts";
import { Umum } from "./types/Umum.d.ts";
import { LoggedInInfo, LoginInfo } from "./types/Login.d.ts";
import { Dusun } from "./types/Dusun.d.ts";

export const healthCheck = (ctx: RouterContext<"/">) => {
  ctx.response.status = 200;
  ctx.response.body = "Healthy";
};

// GET HANDLERS

export const deskripsiSekilas = async (ctx: RouterContext<"/deskripsi">) => {
  const connection = await pool.connect();
  const result = await connection.queryObject<DeskripsiSekilas>(
    "SELECT deskripsi_sekilas FROM Profil LIMIT 1;",
  );
  ctx.response.status = 200;
  ctx.response.body = result.rows;
  connection.release();
};

export const aparaturDesa = async (ctx: RouterContext<"/">) => {
  const connection = await pool.connect();
  const result = await connection.queryObject<
    Omit<Aparatur, "kata_sandi" | "foto">
  >(
    "SELECT aparatur_id, nama, jabatan, telepon FROM Aparatur;",
  );

  ctx.response.status = 200;
  ctx.response.body = result.rows;
  connection.release();
};

export const fotoAparaturDesa = async (ctx: RouterContext<"/foto/:id">) => {
  const id = ctx.params.id;

  if (!id) {
    ctx.response.status = 400;
    ctx.response.body = { message: "Missing id parameter" };
    return;
  }

  const connection = await pool.connect();

  try {
    const result = await connection.queryObject<{ foto: Uint8Array | null }>(
      "SELECT foto FROM Aparatur WHERE aparatur_id = $1;",
      [id],
    );

    if (result.rows.length === 0 || !result.rows[0].foto) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Foto not found" };
      return;
    }

    const foto = result.rows[0].foto;

    ctx.response.status = 200;
    ctx.response.headers.set("Content-Type", "image/jpeg");
    ctx.response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable",
    );
    ctx.response.body = foto;
  } finally {
    connection.release();
  }
};

export const namaDusun = async (ctx: RouterContext<"/nama">) => {
  const connection = await pool.connect();
  const result = await connection.queryObject<
    { dusun_id: number; nama: string }
  >(
    "SELECT dusun_id, nama FROM Dusun;",
  );

  ctx.response.status = 200;
  ctx.response.body = result.rows;
  connection.release();
};

export const getDusun = async (ctx: RouterContext<"/">) => {
  const connection = await pool.connect();

  const result = await connection.queryObject<Dusun>(
    "SELECT * FROM Dusun;",
  );

  ctx.response.status = 200;
  ctx.response.body = result.rows;
  connection.release();
};

export const getOneDusun = async (ctx: RouterContext<"/:id">) => {
  const id = ctx.params.id;

  const connection = await pool.connect();

  const result = await connection.queryObject<Dusun>(
    "SELECT * FROM Dusun WHERE dusun_id = $1;",
    [id],
  );

  ctx.response.status = 200;
  ctx.response.body = result.rows;
  connection.release();
};

export const getProfilDesa = async (ctx: RouterContext<"/data">) => {
  const connection = await pool.connect();

  const result = await connection.queryObject<ProfilDesaData>(
    "SELECT kode_desa, kecamatan, kabupaten_kota, provinsi, tahun_pembentukan, luas, koordinat, tipologi, klasifikasi, kategori, batas_timur, batas_barat, batas_selatan batas_utara, sejarah FROM Profil LIMIT 1;",
  );

  ctx.response.status = 200;
  ctx.response.body = result.rows;
  connection.release();
};

// POST HANDLERS

export const postDusun = async (ctx: RouterContext<"/">) => {
  const nama = ctx.request.url.searchParams.get("nama");

  if (!nama) {
    ctx.response.status = 400;
    ctx.response.body = {
      error: "Field nama wajib diisi.",
    };
    return;
  }

  const connection = await pool.connect();

  try {
    const result = await connection.queryObject<{ dusun_id: number }>(
      `INSERT INTO
       Dusun (nama, rt, populasi, keluarga, laki, perempuan, umkm, islam, protestanisme, katolisisme, hinduisme, buddhisme, konfusianisme, tunadaksa, tunanetra, tunarungu, tunawicara, tunagrahita, tunalaras, kps, ks_satu, ks_dua, ks_tuga, ks_tiga_plus)
       VALUES ($1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
       RETURNING dusun_id`,
      [nama],
    );

    ctx.response.status = 201;
    ctx.response.body = { dusun_id: result.rows[0].dusun_id };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menyimpan data dusun." };
  } finally {
    connection.release();
  }
};

export const postUmum = async (ctx: RouterContext<"/">) => {
  const form = await ctx.request.body.formData();
  const nama = form.get("nama");
  const nik = form.get("nik");
  const kataSandi = form.get("kata_sandi");

  if (
    typeof nama !== "string" || nama.trim() === "" ||
    typeof nik !== "string" || nik.trim() === "" ||
    typeof kataSandi !== "string" || kataSandi.trim() === ""
  ) {
    ctx.response.status = 400;
    ctx.response.body = {
      error: "Field nama, nik, dan kata_sandi wajib diisi.",
    };
    return;
  }

  const connection = await pool.connect();

  try {
    const result = await connection.queryObject<{ umum_id: number }>(
      `INSERT INTO
       Umum (nama, nik, kata_sandi)
       VALUES ($1, $2, $3)
       RETURNING umum_id`,
      [nama, nik, kataSandi],
    );

    ctx.response.status = 201;
    ctx.response.body = { umum_id: result.rows[0].umum_id };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menyimpan data warga umum." };
  } finally {
    connection.release();
  }
};

export const postAparatur = async (ctx: RouterContext<"/">) => {
  const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const form = await ctx.request.body.formData();
  const nama = form.get("nama");
  const jabatan = form.get("jabatan");
  const telepon = form.get("telepon");
  const kataSandi = form.get("kata_sandi");
  const foto = form.get("foto");

  if (
    typeof nama !== "string" || nama.trim() === "" ||
    typeof jabatan !== "string" || jabatan.trim() === "" ||
    typeof telepon !== "string" || telepon.trim() === "" ||
    typeof kataSandi !== "string" || kataSandi.trim() === ""
  ) {
    ctx.response.status = 400;
    ctx.response.body = {
      error: "Field nama, jabatan, telepon, dan kata_sandi wajib diisi.",
    };
    return;
  }

  if (!(foto instanceof File)) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Field foto wajib berupa file." };
    return;
  }

  if (!ALLOWED_IMAGE_TYPES.includes(foto.type)) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Foto harus berformat JPEG, PNG, atau WebP." };
    return;
  }

  if (foto.size > MAX_FILE_SIZE) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Ukuran foto maksimal 5MB." };
    return;
  }

  const fotoBytes = new Uint8Array(await foto.arrayBuffer());

  const connection = await pool.connect();

  try {
    const result = await connection.queryObject<{ aparatur_id: number }>(
      `INSERT INTO
       Aparatur (nama, jabatan, telepon, foto, kata_sandi)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING aparatur_id`,
      [nama, jabatan, telepon, fotoBytes, kataSandi],
    );

    ctx.response.status = 201;
    ctx.response.body = { aparatur_id: result.rows[0].aparatur_id };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menyimpan data aparatur." };
  } finally {
    connection.release();
  }
};

export const patchProfil = async (ctx: RouterContext<"/">) => {
  const PROFIL_TEXT_FIELDS = [
    "deskripsi_sekilas",
    "kecamatan",
    "kabupaten_kota",
    "provinsi",
    "koordinat",
    "tipologi",
    "klasifikasi",
    "kategori",
    "batas_timur",
    "batas_barat",
    "batas_selatan",
    "batas_utara",
    "sejarah",
    "tautan_kalender",
  ] as const;

  const PROFIL_INT_FIELDS = ["kode_desa", "tahun_pembentukan"] as const;
  const PROFIL_DECIMAL_FIELDS = ["luas"] as const;

  const form = await ctx.request.body.formData();

  const setClauses: string[] = [];
  const values: unknown[] = [];
  let paramIndex = 1;

  const addField = (field: string, value: unknown) => {
    setClauses.push(`${field} = $${paramIndex}`);
    values.push(value);
    paramIndex++;
  };

  // Text fields: skip if missing OR empty string after trimming
  for (const field of PROFIL_TEXT_FIELDS) {
    const value = form.get(field);
    if (typeof value === "string" && value.trim() !== "") {
      addField(field, value.trim());
    }
  }

  // Int fields: skip if missing, empty, or not a valid integer
  for (const field of PROFIL_INT_FIELDS) {
    const value = form.get(field);
    if (typeof value === "string" && value.trim() !== "") {
      const parsed = Number.parseInt(value, 10);
      if (Number.isNaN(parsed)) {
        ctx.response.status = 400;
        ctx.response.body = {
          error: `Field ${field} harus berupa angka bulat.`,
        };
        return;
      }
      addField(field, parsed);
    }
  }

  // Decimal fields: same pattern
  for (const field of PROFIL_DECIMAL_FIELDS) {
    const value = form.get(field);
    if (typeof value === "string" && value.trim() !== "") {
      const parsed = Number.parseFloat(value);
      if (Number.isNaN(parsed)) {
        ctx.response.status = 400;
        ctx.response.body = { error: `Field ${field} harus berupa angka.` };
        return;
      }
      addField(field, parsed);
    }
  }

  // File field: skip if not provided, or if it's an empty file input
  const peta = form.get("peta");
  if (peta instanceof File && peta.size > 0) {
    if (!["image/jpeg", "image/png", "image/jpg"].includes(peta.type)) {
      ctx.response.status = 400;
      ctx.response.body = {
        error: "Peta harus berformat JPEG, PNG, atau JPG.",
      };
      return;
    }
    if (peta.size > 5 * 1024 * 1024) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Ukuran peta maksimal 5MB." };
      return;
    }
    addField("peta", new Uint8Array(await peta.arrayBuffer()));
  }

  if (setClauses.length === 0) {
    ctx.response.status = 400;
    ctx.response.body = {
      error: "Tidak ada field yang dikirim untuk diperbarui.",
    };
    return;
  }

  const connection = await pool.connect();
  try {
    const existing = await connection.queryObject<{ profil_id: number }>(
      "SELECT profil_id FROM Profil LIMIT 1",
    );

    if (existing.rows.length === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Data profil desa belum tersedia." };
      return;
    }

    const profilId = existing.rows[0].profil_id;
    values.push(profilId);

    await connection.queryObject(
      `UPDATE Profil SET ${
        setClauses.join(", ")
      } WHERE profil_id = $${paramIndex}`,
      values,
    );

    ctx.response.status = 200;
    ctx.response.body = { message: "Profil desa berhasil diperbarui." };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal memperbarui data profil desa." };
  } finally {
    connection.release();
  }
};

// DELETE HANDLERS

export const deleteAparatur = async (ctx: RouterContext<"/:id">) => {
  const id = Number(ctx.params.id);

  const connection = await pool.connect();
  try {
    const result = await connection.queryObject(
      "DELETE FROM Aparatur WHERE aparatur_id = $1",
      [id],
    );

    if (result.rowCount === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Data aparatur tidak ditemukan." };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = { message: "Data aparatur berhasil dihapus." };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menghapus data aparatur." };
  } finally {
    connection.release();
  }
};

// LOGIN HANDLERS

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

const getWargaByNik = async (nik: string): Promise<Umum | null> => {
  const connection = await pool.connect();
  try {
    const result = await connection.queryObject<Umum>(
      "SELECT * FROM Umum WHERE nik = $1 LIMIT 1",
      [nik],
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
    type: "aparatur",
  };

  const jwt = await create(jwtHeader, jwtPayload, jwtKey);

  ctx.response.status = 200;
  ctx.response.body = { jwt };
};

export const requestJwtWargaUmum = async (ctx: RouterContext<"/login">) => {
  let request: LoginInfo;
  try {
    request = await ctx.request.body.json();
  } catch {
    ctx.response.status = 400;
    ctx.response.body = { error: "Body permintaan tidak valid." };
    return;
  }

  const { identifier: nikWarga, kata_sandi: kataSandi } = request;

  if (
    typeof nikWarga !== "string" || typeof kataSandi !== "string" ||
    nikWarga.trim() === "" || kataSandi.trim() === ""
  ) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Nama dan kata sandi wajib diisi." };
    return;
  }

  const wargaCandidate = await getWargaByNik(nikWarga);

  const passwordMatches = wargaCandidate?.kata_sandi === kataSandi;

  if (!wargaCandidate || !passwordMatches) {
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
    id: wargaCandidate.umum_id,
    identifier: wargaCandidate.nik,
    type: "warga",
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
