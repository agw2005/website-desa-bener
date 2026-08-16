import type { RouterContext } from "@oak/oak/router";
import type { Profil } from "../types/Profil.d.ts";
import type { Aparatur } from "../types/Aparatur.d.ts";
import type { Dusun } from "../types/Dusun.d.ts";
import type { Visi } from "../types/Visi.d.ts";
import type { Misi } from "../types/Misi.d.ts";
import type { ApbdesDetail, LampiranApbdes } from "../types/Apbdes.d.ts";
import { getExtension } from "../helpers/getExtension.ts";
import { contentType } from "@std/media-types/content-type";
import { Label } from "../types/Label.d.ts";
import { Artikel, ArtikelWithLabel } from "../types/Artikel.d.ts";
import { Komentar } from "../types/Komentar.d.ts";
import { bigintToNumber } from "../helpers/bigintToNumber.ts";
import { fetchArtikelDetailById } from "../helpers/fetchArtikelDetailById.ts";
import { Wisata } from "../types/Wisata.d.ts";
import { Umkm, UmkmDetail } from "../types/Umkm.d.ts";
import { PelayananDetail } from "../types/Pelayanan.d.ts";
import { executeQuery } from "../helpers/executeQuery.ts";

export const getPelayananLengkap = async (ctx: RouterContext<"/lengkap">) => {
  try {
    const rows = await executeQuery<PelayananDetail>(
      `
      SELECT
        Pelayanan.pelayanan_id,
        Pelayanan.judul,
        COALESCE(
          (
            SELECT json_agg(json_build_object(
              'syarat_pelayanan_id', Syarat_Pelayanan.syarat_pelayanan_id,
              'isi', Syarat_Pelayanan.isi,
              'tautan', Syarat_Pelayanan.tautan
            ))
            FROM Syarat_Pelayanan
            WHERE Syarat_Pelayanan.pelayanan_id = Pelayanan.pelayanan_id
          ),
          '[]'
        ) AS syarat
      FROM Pelayanan
      ORDER BY Pelayanan.pelayanan_id DESC
      `,
    );

    ctx.response.status = 200;
    ctx.response.body = rows;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil data pelayanan." };
  }
};

export const getPelayananById = async (ctx: RouterContext<"/:id">) => {
  const id = Number(ctx.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    ctx.response.status = 400;
    ctx.response.body = { error: "ID pelayanan tidak valid." };
    return;
  }

  try {
    const rows = await executeQuery<PelayananDetail>(
      `
      SELECT
        Pelayanan.pelayanan_id,
        Pelayanan.judul,
        COALESCE(
          (
            SELECT json_agg(json_build_object(
              'syarat_pelayanan_id', Syarat_Pelayanan.syarat_pelayanan_id,
              'isi', Syarat_Pelayanan.isi,
              'tautan', Syarat_Pelayanan.tautan
            ))
            FROM Syarat_Pelayanan
            WHERE Syarat_Pelayanan.pelayanan_id = Pelayanan.pelayanan_id
          ),
          '[]'
        ) AS syarat
      FROM Pelayanan
      WHERE Pelayanan.pelayanan_id = $1
      `,
      [id],
    );

    if (rows.length === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Pelayanan tidak ditemukan." };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = rows[0];
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil data pelayanan." };
  }
};

export const getUmkmList = async (ctx: RouterContext<"/">) => {
  try {
    const rows = await executeQuery<Omit<Umkm, "foto">>(
      "SELECT umkm_id, nama, deskripsi, dusun_id FROM Umkm ORDER BY umkm_id DESC",
    );

    ctx.response.status = 200;
    ctx.response.body = rows;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil data UMKM." };
  }
};

export const getUmkmById = async (ctx: RouterContext<"/:id">) => {
  const id = Number(ctx.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    ctx.response.status = 400;
    ctx.response.body = { error: "ID UMKM tidak valid." };
    return;
  }

  try {
    const rows = await executeQuery<Omit<UmkmDetail, "foto">>(
      `
      SELECT
        Umkm.umkm_id,
        Umkm.nama,
        Umkm.deskripsi,
        Umkm.dusun_id,
        COALESCE(
          (
            SELECT json_agg(json_build_object(
              'kontak_umkm_id', Kontak_Umkm.kontak_umkm_id,
              'jenis_kontak', Kontak_Umkm.jenis_kontak,
              'isi', Kontak_Umkm.isi,
              'tautan', Kontak_Umkm.tautan
            ))
            FROM Kontak_Umkm
            WHERE Kontak_Umkm.umkm_id = Umkm.umkm_id
          ),
          '[]'
        ) AS kontak
      FROM Umkm
      WHERE Umkm.umkm_id = $1;
      `,
      [id],
    );

    if (rows.length === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: "UMKM tidak ditemukan." };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = rows[0];
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil data UMKM." };
  }
};

export const getUmkmFoto = async (ctx: RouterContext<"/foto/:id">) => {
  const id = Number(ctx.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    ctx.response.status = 400;
    ctx.response.body = { error: "ID UMKM tidak valid." };
    return;
  }

  try {
    const rows = await executeQuery<Pick<Umkm, "foto">>(
      "SELECT foto FROM Umkm WHERE umkm_id = $1;",
      [id],
    );

    if (rows.length === 0 || !rows[0]?.foto) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Foto tidak ditemukan" };
      return;
    }

    const foto = rows[0].foto;

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
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil foto." };
  }
};

export const getFotoTempatWisata = async (
  ctx: RouterContext<"/:id">,
) => {
  const id = ctx.params.id;

  if (!id) {
    ctx.response.status = 400;
    ctx.response.body = { message: "Missing id parameter" };
    return;
  }

  try {
    const rows = await executeQuery<
      Pick<Wisata, "foto"> | null
    >(
      "SELECT foto FROM Wisata WHERE wisata_id = $1;",
      [id],
    );

    if (rows.length === 0 || !rows[0]?.foto) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Foto not found" };
      return;
    }

    const foto = rows[0].foto;

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
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil foto tempat wisata." };
  }
};

export const getTempatWisata = async (ctx: RouterContext<"/">) => {
  try {
    const rows = await executeQuery<Omit<Wisata, "foto">>(
      "SELECT wisata_id, nama, deskripsi FROM Wisata;",
    );

    if (rows.length === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Belum ada tempat wisata." };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = rows;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil data tempat wisata." };
  }
};

export const getArtikelTerbaru = async (ctx: RouterContext<"/terbaru">) => {
  try {
    const rows = await executeQuery<Pick<Artikel, "artikel_id">>(
      "SELECT artikel_id FROM Artikel ORDER BY artikel_id DESC LIMIT 1;",
    );

    if (rows.length === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Belum ada artikel." };
      return;
    }

    const item = await fetchArtikelDetailById(rows[0].artikel_id);

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

  try {
    const rows = await executeQuery<
      { nama_file: string; isi_file: Uint8Array }
    >(
      "SELECT nama_file, isi_file FROM Lampiran_Artikel WHERE lampiran_artikel_id = $1;",
      [id],
    );

    if (rows.length === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Lampiran tidak ditemukan." };
      return;
    }

    const { nama_file, isi_file } = rows[0];
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
  }
};

export const getArtikelById = async (ctx: RouterContext<"/:id">) => {
  const id = Number(ctx.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    ctx.response.status = 400;
    ctx.response.body = { error: "ID artikel tidak valid." };
    return;
  }

  try {
    const item = await fetchArtikelDetailById(id);

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
  }
};

export const thumbnail = async (ctx: RouterContext<"/thumbnail/:id">) => {
  const id = ctx.params.id;

  if (!id) {
    ctx.response.status = 400;
    ctx.response.body = { message: "Missing id parameter" };
    return;
  }

  try {
    const rows = await executeQuery<
      { isi_file: Uint8Array | null }
    >(
      "SELECT isi_file FROM Lampiran_Artikel WHERE artikel_id = $1;",
      [id],
    );

    if (rows.length === 0 || !rows[0].isi_file) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Foto not found" };
      return;
    }

    const foto = rows[0].isi_file;

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
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil thumbnail artikel." };
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

    const rows = await executeQuery<Komentar>(
      `
      SELECT
        *
      FROM Komentar
      ${whereSql}
      ORDER BY Komentar.komentar_id DESC
      LIMIT $${limitParamIndex};
      `,
      values,
    );

    const hasNextPage = rows.length > limit;
    const rawItems = hasNextPage ? rows.slice(0, limit) : rows;
    const items = rawItems.map((row) => bigintToNumber(row, ["waktu_upload"]));

    const nextCursor = hasNextPage ? items[items.length - 1].komentar_id : null;

    ctx.response.status = 200;
    ctx.response.body = { komentar: items, next_cursor: nextCursor };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil data komentar." };
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

    const rows = await executeQuery<ArtikelWithLabel>(
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
      LIMIT $${limitParamIndex};
      `,
      values,
    );

    const hasNextPage = rows.length > limit;
    const rawItems = hasNextPage ? rows.slice(0, limit) : rows;
    const items = rawItems.map((row) => bigintToNumber(row, ["waktu_upload"]));
    const nextCursor = hasNextPage ? items[items.length - 1].artikel_id : null;

    ctx.response.status = 200;
    ctx.response.body = { items, next_cursor: nextCursor };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil data artikel." };
  }
};

export const getLabel = async (ctx: RouterContext<"/">) => {
  try {
    const rows = await executeQuery<Label>(
      "SELECT * FROM Label;",
    );
    ctx.response.status = 200;
    ctx.response.body = rows;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil label." };
  }
};

export const deskripsiSekilas = async (ctx: RouterContext<"/deskripsi">) => {
  try {
    const rows = await executeQuery<
      Pick<Profil, "deskripsi_sekilas">
    >(
      "SELECT deskripsi_sekilas FROM Profil LIMIT 1;",
    );
    ctx.response.status = 200;
    ctx.response.body = rows;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil deskripsi sekilas." };
  }
};

export const getKalender = async (ctx: RouterContext<"/kalender">) => {
  try {
    const rows = await executeQuery<Pick<Profil, "tautan_kalender">>(
      "SELECT tautan_kalender FROM Profil LIMIT 1;",
    );
    ctx.response.status = 200;
    ctx.response.body = rows;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil tautan kalender." };
  }
};

export const aparaturDesa = async (ctx: RouterContext<"/">) => {
  try {
    const rows = await executeQuery<
      Omit<Aparatur, "kata_sandi" | "foto">
    >(
      "SELECT aparatur_id, nama, jabatan, telepon FROM Aparatur WHERE aparatur_id <> 1;",
    );
    ctx.response.status = 200;
    ctx.response.body = rows;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil data aparatur desa." };
  }
};

export const fotoAparaturDesa = async (ctx: RouterContext<"/foto/:id">) => {
  const id = Number(ctx.params.id);

  if (!id) {
    ctx.response.status = 400;
    ctx.response.body = { message: "Missing id parameter" };
    return;
  }

  if (id === 1) {
    ctx.response.status = 403;
    ctx.response.body = { error: "Foto not found" };
    return;
  }

  try {
    const rows = await executeQuery<Pick<Aparatur, "foto">>(
      "SELECT foto FROM Aparatur WHERE aparatur_id = $1;",
      [id],
    );

    if (rows.length === 0 || !rows[0].foto) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Foto not found" };
      return;
    }

    const foto = rows[0].foto;

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
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil foto aparatur desa." };
  }
};

export const namaDusun = async (ctx: RouterContext<"/nama">) => {
  try {
    const rows = await executeQuery<
      Pick<Dusun, "dusun_id" | "nama">
    >(
      "SELECT dusun_id, nama FROM Dusun;",
    );
    ctx.response.status = 200;
    ctx.response.body = rows;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil nama dusun." };
  }
};

export const getDusun = async (ctx: RouterContext<"/">) => {
  try {
    const rows = await executeQuery<Dusun>(
      "SELECT * FROM Dusun;",
    );
    ctx.response.status = 200;
    ctx.response.body = rows;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil data dusun." };
  }
};

export const getOneDusun = async (ctx: RouterContext<"/:id">) => {
  const id = ctx.params.id;

  try {
    const rows = await executeQuery<Dusun>(
      "SELECT * FROM Dusun WHERE dusun_id = $1;",
      [id],
    );
    ctx.response.status = 200;
    ctx.response.body = rows;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil data dusun." };
  }
};

export const getProfilDesa = async (ctx: RouterContext<"/data">) => {
  try {
    const rows = await executeQuery<
      Omit<Profil, "deskripsi_sekilas" | "peta" | "tautan_kalender">
    >(
      `SELECT
      kode_desa,
      kecamatan,
      kabupaten_kota,
      provinsi,
      tahun_pembentukan,
      luas,
      koordinat,
      tipologi,
      klasifikasi,
      kategori,
      batas_timur,
      batas_barat,
      batas_selatan,
      batas_utara,
      sejarah
    FROM Profil LIMIT 1;`,
    );

    ctx.response.status = 200;
    ctx.response.body = rows;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil profil desa." };
  }
};

export const petaDesa = async (ctx: RouterContext<"/peta">) => {
  try {
    const rows = await executeQuery<{ peta: Uint8Array | null }>(
      "SELECT peta FROM Profil LIMIT 1;",
    );

    if (rows.length === 0 || !rows[0].peta) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Peta desa not found" };
      return;
    }

    const peta = rows[0].peta;

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
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil peta desa." };
  }
};

export const getProfil = async (ctx: RouterContext<"/">) => {
  try {
    const rows = await executeQuery<Omit<Profil, "peta">>(
      "SELECT profil_id, deskripsi_sekilas, kode_desa, kecamatan, kabupaten_kota, provinsi, tahun_pembentukan, luas, koordinat, tipologi, klasifikasi, kategori, batas_timur, batas_barat, batas_selatan, batas_utara, sejarah, tautan_kalender FROM Profil LIMIT 1;",
    );

    ctx.response.status = 200;
    ctx.response.body = rows;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil profil desa." };
  }
};

export const getVisi = async (ctx: RouterContext<"/">) => {
  try {
    const rows = await executeQuery<Visi>(
      "SELECT * FROM Visi;",
    );
    ctx.response.status = 200;
    ctx.response.body = rows;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil visi." };
  }
};

export const getMisi = async (ctx: RouterContext<"/">) => {
  try {
    const rows = await executeQuery<Misi>(
      "SELECT * FROM Misi;",
    );
    ctx.response.status = 200;
    ctx.response.body = rows;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal mengambil misi." };
  }
};

export const getApbdesAtYear = async (ctx: RouterContext<"/:year">) => {
  const year = Number(ctx.params.year);

  if (!Number.isInteger(year) || year <= 0) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Tahun tidak valid." };
    return;
  }

  try {
    const rows = await executeQuery<ApbdesDetail>(
      `
      SELECT
        Apbdes.apbdes_id,
        Apbdes.tahun,
        COALESCE(
          (
            SELECT json_agg(json_build_object(
              'apbdes_file_id', Lampiran_Apbdes.apbdes_file_id,
              'nama_file', Lampiran_Apbdes.nama_file,
              'besar_file', Lampiran_Apbdes.besar_file
            ))
            FROM Lampiran_Apbdes
            WHERE Lampiran_Apbdes.apbdes_id = Apbdes.apbdes_id
          ),
          '[]'
        ) AS lampiran
      FROM Apbdes
      WHERE Apbdes.tahun = $1;
      `,
      [year],
    );

    const item = rows[0] ??
      { apbdes_id: null, tahun: year, lampiran: [] };

    ctx.response.status = 200;
    ctx.response.body = item;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = {
      error: `Gagal mengambil data APBDes pada tahun ${year}.`,
    };
  }
};

export const getApbdesFile = async (ctx: RouterContext<"/file/:id">) => {
  const id = Number(ctx.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    ctx.response.status = 400;
    ctx.response.body = { error: "ID lampiran tidak valid." };
    return;
  }

  try {
    const rows = await executeQuery<
      Pick<LampiranApbdes, "nama_file" | "isi_file">
    >(
      "SELECT nama_file, isi_file FROM Lampiran_Apbdes WHERE apbdes_file_id = $1;",
      [id],
    );

    if (rows.length === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Lampiran tidak ditemukan." };
      return;
    }

    const { nama_file: namaFile, isi_file: isiFile } = rows[0];
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
    ctx.response.body = { error: "Gagal mengambil lampiran APBDes." };
  }
};
