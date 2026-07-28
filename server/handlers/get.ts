import type { RouterContext } from "@oak/oak/router";
import type { DeskripsiSekilas, ProfilDesaData } from "../types/Profil.d.ts";
import type { Aparatur } from "../types/Aparatur.d.ts";
import type { Dusun } from "../types/Dusun.d.ts";
import type { Visi } from "../types/Visi.d.ts";
import type { Misi } from "../types/Misi.d.ts";
import type { JoinedApbdes } from "../types/Apbdes.d.ts";
import { pool } from "../dbpool.ts";
import { getExtension } from "../helpers/getExtension.ts";
import { contentType } from "@std/media-types/content-type";
import { Label } from "../types/Label.d.ts";

export const getLabel = async (ctx: RouterContext<"/">) => {
  const connection = await pool.connect();
  const result = await connection.queryObject<Label>(
    "SELECT * FROM Label;",
  );

  ctx.response.status = 200;
  ctx.response.body = result.rows;
  connection.release();
};

export const deskripsiSekilas = async (ctx: RouterContext<"/deskripsi">) => {
  const connection = await pool.connect();
  const result = await connection.queryObject<DeskripsiSekilas>(
    "SELECT deskripsi_sekilas FROM Profil LIMIT 1;",
  );
  ctx.response.status = 200;
  ctx.response.body = result.rows;
  connection.release();
};

export const getKalender = async (ctx: RouterContext<"/kalender">) => {
  const connection = await pool.connect();
  const result = await connection.queryObject<{ tautan_kalender: string }>(
    "SELECT tautan_kalender FROM Profil LIMIT 1;",
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

    const contentType = foto[0] === 0xFF && foto[1] === 0xD8 && foto[2] === 0xFF
      ? "image/jpeg"
      : "image/png";

    ctx.response.status = 200;
    ctx.response.headers.set("Content-Type", contentType);
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

export const petaDesa = async (ctx: RouterContext<"/peta">) => {
  const connection = await pool.connect();

  try {
    const result = await connection.queryObject<{ peta: Uint8Array | null }>(
      "SELECT peta FROM Profil LIMIT 1;",
    );

    if (result.rows.length === 0 || !result.rows[0].peta) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Peta desa not found" };
      return;
    }

    const peta = result.rows[0].peta;

    const contentType = peta[0] === 0xFF && peta[1] === 0xD8 && peta[2] === 0xFF
      ? "image/jpeg"
      : "image/png";

    ctx.response.status = 200;
    ctx.response.headers.set("Content-Type", contentType);
    ctx.response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable",
    );
    ctx.response.body = peta;
  } finally {
    connection.release();
  }
};

export const getProfil = async (ctx: RouterContext<"/">) => {
  const connection = await pool.connect();

  const result = await connection.queryObject<ProfilDesaData>(
    "SELECT profil_id, deskripsi_sekilas, kode_desa, kecamatan, kabupaten_kota, provinsi, tahun_pembentukan, luas, koordinat, tipologi, klasifikasi, kategori, batas_timur, batas_barat, batas_selatan batas_utara, sejarah, tautan_kalender FROM Profil LIMIT 1;",
  );

  ctx.response.status = 200;
  ctx.response.body = result.rows;
  connection.release();
};

export const getVisi = async (ctx: RouterContext<"/">) => {
  const connection = await pool.connect();

  const result = await connection.queryObject<Visi>(
    "SELECT * FROM Visi;",
  );

  ctx.response.status = 200;
  ctx.response.body = result.rows;
  connection.release();
};

export const getMisi = async (ctx: RouterContext<"/">) => {
  const connection = await pool.connect();

  const result = await connection.queryObject<Misi>(
    "SELECT * FROM Misi;",
  );

  ctx.response.status = 200;
  ctx.response.body = result.rows;
  connection.release();
};

export const getApbdesAtYear = async (ctx: RouterContext<"/:year">) => {
  const year = Number(ctx.params.year);

  const connection = await pool.connect();

  const result = await connection.queryObject<JoinedApbdes>(
    `
      SELECT
        Apbdes.apbdes_id AS apbdes_id,
        tahun,
        apbdes_file_id,
        nama_file,
        besar_file
      FROM Apbdes
      LEFT JOIN Lampiran_Apbdes
        ON Apbdes.apbdes_id = Lampiran_Apbdes.apbdes_id
      WHERE Apbdes.tahun = $1;
    `,
    [year],
  );

  ctx.response.status = 200;
  ctx.response.body = result.rows;
  connection.release();
};

export const getApbdesFile = async (ctx: RouterContext<"/file/:id">) => {
  const id = Number(ctx.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    ctx.response.status = 400;
    ctx.response.body = { error: "ID lampiran tidak valid." };
    return;
  }

  const connection = await pool.connect();
  try {
    const result = await connection.queryObject<
      { nama_file: string; isi_file: Uint8Array }
    >(
      "SELECT nama_file, isi_file FROM Lampiran_Apbdes WHERE apbdes_file_id = $1",
      [id],
    );

    if (result.rows.length === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Lampiran tidak ditemukan." };
      return;
    }

    const { nama_file: namaFile, isi_file: isiFile } = result.rows[0];
    const extension = getExtension(namaFile);
    const fileContentType = contentType(extension);

    if (!fileContentType) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Lampiran tidak memiliki MIME type valid." };
      return;
    }

    ctx.response.status = 200;
    ctx.response.headers.set(
      "Content-Type",
      fileContentType,
    );
    ctx.response.headers.set(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(namaFile)}"`,
    );
    ctx.response.body = isiFile;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil lampiran." };
  } finally {
    connection.release();
  }
};
