import type { RouterContext } from "@oak/oak/router";
import type { Profil } from "../types/Profil.d.ts";
import type { Aparatur } from "../types/Aparatur.d.ts";
import type { Dusun } from "../types/Dusun.d.ts";
import type { Visi } from "../types/Visi.d.ts";
import type { Misi } from "../types/Misi.d.ts";
import type { JoinedApbdes } from "../types/Apbdes.d.ts";
import { pool } from "../dbpool.ts";
import { getExtension } from "../helpers/getExtension.ts";
import { contentType } from "@std/media-types/content-type";
import { Label } from "../types/Label.d.ts";
import { Artikel, ArtikelWithLabel } from "../types/Artikel.d.ts";
import { Komentar } from "../types/Komentar.d.ts";
import { bigintToNumber } from "../helpers/bigintToNumber.ts";
import { fetchArtikelDetailById } from "../helpers/fetchArtikelDetailById.ts";
import { Wisata } from "../types/Wisata.d.ts";

export const getFotoTempatWisata = async (
  ctx: RouterContext<"/:id">,
) => {
  const id = ctx.params.id;

  if (!id) {
    ctx.response.status = 400;
    ctx.response.body = { message: "Missing id parameter" };
    return;
  }

  const connection = await pool.connect();

  try {
    const result = await connection.queryObject<
      Pick<Wisata, "foto"> | null
    >(
      "SELECT foto FROM Wisata WHERE wisata_id = $1;",
      [id],
    );

    if (result.rows.length === 0 || !result.rows[0]?.foto) {
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

export const getTempatWisata = async (ctx: RouterContext<"/">) => {
  const connection = await pool.connect();
  try {
    const result = await connection.queryObject<Omit<Wisata, "foto">>(
      "SELECT wisata_id, nama, deskripsi FROM Wisata;",
    );

    if (result.rows.length === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Belum ada tempat wisata." };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = result.rows;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil data tempat wisata." };
  } finally {
    connection.release();
  }
};

export const getArtikelTerbaru = async (ctx: RouterContext<"/terbaru">) => {
  const connection = await pool.connect();
  try {
    const latest = await connection.queryObject<Pick<Artikel, "artikel_id">>(
      "SELECT artikel_id FROM Artikel ORDER BY artikel_id DESC LIMIT 1",
    );

    if (latest.rows.length === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Belum ada artikel." };
      return;
    }

    const item = await fetchArtikelDetailById(
      connection,
      latest.rows[0].artikel_id,
    );

    if (!item) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Artikel tidak ditemukan." };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = item;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil artikel terbaru." };
  } finally {
    connection.release();
  }
};

export const getArtikelLampiran = async (
  ctx: RouterContext<"/lampiran/:id">,
) => {
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
      "SELECT nama_file, isi_file FROM Lampiran_Artikel WHERE lampiran_artikel_id = $1",
      [id],
    );

    if (result.rows.length === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Lampiran tidak ditemukan." };
      return;
    }

    const { nama_file, isi_file } = result.rows[0];
    const extension = getExtension(nama_file);
    const fileContentType = contentType(extension) ??
      "application/octet-stream";

    ctx.response.status = 200;
    ctx.response.headers.set("Content-Type", fileContentType);
    ctx.response.headers.set(
      "Content-Disposition",
      `inline; filename="${encodeURIComponent(nama_file)}"`,
    );
    ctx.response.body = isi_file;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil lampiran." };
  } finally {
    connection.release();
  }
};

export const getArtikelById = async (ctx: RouterContext<"/:id">) => {
  const id = Number(ctx.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    ctx.response.status = 400;
    ctx.response.body = { error: "ID artikel tidak valid." };
    return;
  }

  const connection = await pool.connect();
  try {
    const item = await fetchArtikelDetailById(connection, id);

    if (!item) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Artikel tidak ditemukan." };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = item;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil data artikel." };
  } finally {
    connection.release();
  }
};

export const thumbnail = async (ctx: RouterContext<"/thumbnail/:id">) => {
  const id = ctx.params.id;

  if (!id) {
    ctx.response.status = 400;
    ctx.response.body = { message: "Missing id parameter" };
    return;
  }

  const connection = await pool.connect();

  try {
    const result = await connection.queryObject<
      { isi_file: Uint8Array | null }
    >(
      "SELECT isi_file FROM Lampiran_Artikel WHERE artikel_id = $1;",
      [id],
    );

    if (result.rows.length === 0 || !result.rows[0].isi_file) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Foto not found" };
      return;
    }

    const foto = result.rows[0].isi_file;

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

export const getKomentars = async (ctx: RouterContext<"/">) => {
  const url = new URL(ctx.request.url);
  const cursorParam = url.searchParams.get("cursor");
  const limitParam = url.searchParams.get("limit");

  const limit = limitParam ? Number(limitParam) : 10;

  if (!Number.isInteger(limit) || limit <= 0 || limit > 50) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Parameter limit tidak valid (1-50)." };
    return;
  }

  let cursor: number | null = null;
  if (cursorParam !== null) {
    cursor = Number(cursorParam);
    if (!Number.isInteger(cursor) || cursor <= 0) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Parameter cursor tidak valid." };
      return;
    }
  }

  const connection = await pool.connect();
  try {
    const whereClauses: string[] = [];
    const values: unknown[] = [];
    let paramIndex = 1;

    if (cursor !== null) {
      whereClauses.push(`Komentar.komentar_id < $${paramIndex}`);
      values.push(cursor);
      paramIndex++;
    }

    const whereSql = whereClauses.length > 0
      ? `WHERE ${whereClauses.join(" AND ")}`
      : "";

    values.push(limit + 1);
    const limitParamIndex = paramIndex;

    const result = await connection.queryObject<Komentar>(
      `
      SELECT
        *
      FROM Komentar
      ${whereSql}
      ORDER BY Komentar.komentar_id DESC
      LIMIT $${limitParamIndex}
      `,
      values,
    );

    const hasNextPage = result.rows.length > limit;
    const rawItems = hasNextPage ? result.rows.slice(0, limit) : result.rows;
    const items = rawItems.map((row) => bigintToNumber(row, ["waktu_upload"]));

    const nextCursor = hasNextPage ? items[items.length - 1].komentar_id : null;

    ctx.response.status = 200;
    ctx.response.body = { komentar: items, next_cursor: nextCursor };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil data komentar." };
  } finally {
    connection.release();
  }
};

export const getArtikels = async (ctx: RouterContext<"/">) => {
  const url = new URL(ctx.request.url);
  const cursorParam = url.searchParams.get("cursor");
  const limitParam = url.searchParams.get("limit");
  const labelIdParam = url.searchParams.get("label_id");

  const limit = Number(limitParam) ? Number(limitParam) : 9;

  if (!Number.isInteger(limit) || limit <= 0 || limit > 50) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Parameter limit tidak valid (1-50)." };
    return;
  }

  let cursor: number | null = null;
  if (cursorParam !== null) {
    cursor = Number(cursorParam);
    if (!Number.isInteger(cursor) || cursor <= 0) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Parameter cursor tidak valid." };
      return;
    }
  }

  let labelIdFilter: number | null = null;
  if (labelIdParam !== null) {
    labelIdFilter = Number(labelIdParam);
    if (!Number.isInteger(labelIdFilter) || labelIdFilter <= 0) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Parameter label_id tidak valid." };
      return;
    }
  }

  const connection = await pool.connect();
  try {
    const whereClauses: string[] = [];
    const values: unknown[] = [];
    let paramIndex = 1;

    if (labelIdFilter !== null) {
      whereClauses.push(
        `EXISTS (SELECT 1 FROM Label_Artikel la WHERE la.artikel_id = Artikel.artikel_id AND la.label_id = $${paramIndex})`,
      );
      values.push(labelIdFilter);
      paramIndex++;
    }

    if (cursor !== null) {
      whereClauses.push(`Artikel.artikel_id < $${paramIndex}`);
      values.push(cursor);
      paramIndex++;
    }

    const whereSql = whereClauses.length > 0
      ? `WHERE ${whereClauses.join(" AND ")}`
      : "";

    values.push(limit + 1);
    const limitParamIndex = paramIndex;

    const result = await connection.queryObject<ArtikelWithLabel>(
      `
      SELECT
        Artikel.artikel_id,
        Artikel.judul,
        Artikel.isi,
        Artikel.waktu_upload,
        COALESCE(
          (
            SELECT json_agg(json_build_object('label_id', Label.label_id, 'nama', Label.nama))
            FROM Label_Artikel
            JOIN Label ON Label.label_id = Label_Artikel.label_id
            WHERE Label_Artikel.artikel_id = Artikel.artikel_id
          ),
          '[]'
        ) AS labels
      FROM Artikel
      ${whereSql}
      ORDER BY Artikel.artikel_id DESC
      LIMIT $${limitParamIndex}
      `,
      values,
    );

    const hasNextPage = result.rows.length > limit;
    const rawItems = hasNextPage ? result.rows.slice(0, limit) : result.rows;
    const items = rawItems.map((row) => bigintToNumber(row, ["waktu_upload"]));
    const nextCursor = hasNextPage ? items[items.length - 1].artikel_id : null;

    ctx.response.status = 200;
    ctx.response.body = { items, next_cursor: nextCursor };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil data artikel." };
  } finally {
    connection.release();
  }
};

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
  const result = await connection.queryObject<
    Pick<Profil, "deskripsi_sekilas">
  >(
    "SELECT deskripsi_sekilas FROM Profil LIMIT 1;",
  );
  ctx.response.status = 200;
  ctx.response.body = result.rows;
  connection.release();
};

export const getKalender = async (ctx: RouterContext<"/kalender">) => {
  const connection = await pool.connect();
  const result = await connection.queryObject<Pick<Profil, "tautan_kalender">>(
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
    const result = await connection.queryObject<Pick<Aparatur, "foto">>(
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

  const result = await connection.queryObject<
    Omit<Profil, "deskripsi_sekilas" | "peta" | "tautan_kalender">
  >(
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

  const result = await connection.queryObject<Omit<Profil, "peta">>(
    "SELECT profil_id, deskripsi_sekilas, kode_desa, kecamatan, kabupaten_kota, provinsi, tahun_pembentukan, luas, koordinat, tipologi, klasifikasi, kategori, batas_timur, batas_barat, batas_selatan, batas_utara, sejarah, tautan_kalender FROM Profil LIMIT 1;",
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
