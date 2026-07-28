import type { RouterContext } from "@oak/oak/router";
import type { MisiPostPayload } from "../types/Misi.d.ts";
import type { VisiPostPayload } from "../types/Visi.d.ts";
import { pool } from "../dbpool.ts";

export const postLabel = async (ctx: RouterContext<"/">) => {
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
    const result = await connection.queryObject<{ label_id: number }>(
      `INSERT INTO
       Label (nama)
       VALUES ($1)
       RETURNING label_id`,
      [nama],
    );

    ctx.response.status = 201;
    ctx.response.body = { label_id: result.rows[0].label_id };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menyimpan data label." };
  } finally {
    connection.release();
  }
};

export const postApbdesFileAtYear = async (ctx: RouterContext<"/:year">) => {
  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const year = Number(ctx.params.year);

  if (!Number.isInteger(year) || year < 1900 || year > 2100) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Tahun tidak valid." };
    return;
  }

  const form = await ctx.request.body.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Field file wajib berupa berkas." };
    return;
  }

  if (file.size > MAX_FILE_SIZE) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Ukuran berkas maksimal 10MB." };
    return;
  }

  const connection = await pool.connect();
  try {
    const existing = await connection.queryObject<{ apbdes_id: number }>(
      "SELECT apbdes_id FROM Apbdes WHERE tahun = $1",
      [year],
    );

    let apbdesId: number;

    if (existing.rows.length > 0) {
      apbdesId = existing.rows[0].apbdes_id;
    } else {
      const created = await connection.queryObject<{ apbdes_id: number }>(
        "INSERT INTO Apbdes (tahun) VALUES ($1) RETURNING apbdes_id",
        [year],
      );
      apbdesId = created.rows[0].apbdes_id;
    }

    const fileBytes = new Uint8Array(await file.arrayBuffer());

    const inserted = await connection.queryObject<{ apbdes_file_id: number }>(
      `INSERT INTO Lampiran_Apbdes (apbdes_id, nama_file, besar_file, isi_file)
       VALUES ($1, $2, $3, $4)
       RETURNING apbdes_file_id`,
      [apbdesId, file.name, file.size, fileBytes],
    );

    ctx.response.status = 201;
    ctx.response.body = {
      apbdes_id: apbdesId,
      apbdes_file_id: inserted.rows[0].apbdes_file_id,
    };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menyimpan lampiran APBDes." };
  } finally {
    connection.release();
  }
};

export const postVisi = async (ctx: RouterContext<"/">) => {
  const request: VisiPostPayload = await ctx.request.body.json();

  const connection = await pool.connect();

  const result = await connection.queryObject<{ visi_id: number }>(
    "INSERT INTO Visi (isi) VALUES ($1) RETURNING visi_id;",
    [request.isi],
  );

  ctx.response.status = 200;
  ctx.response.body = result.rows;
  connection.release();
};

export const postMisi = async (ctx: RouterContext<"/">) => {
  const request: MisiPostPayload = await ctx.request.body.json();

  const connection = await pool.connect();

  const result = await connection.queryObject<{ misi_id: number }>(
    "INSERT INTO Misi (isi) VALUES ($1) RETURNING misi_id;",
    [request.isi],
  );

  ctx.response.status = 200;
  ctx.response.body = result.rows;
  connection.release();
};

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
       Dusun (nama, rt, populasi, keluarga, laki, perempuan, umkm, islam, protestanisme, katolisisme, hinduisme, buddhisme, konfusianisme, tunadaksa, tunanetra, tunarungu, tunawicara, tunagrahita, tunalaras, kps, ks_satu, ks_dua, ks_tiga, ks_tiga_plus)
       VALUES ($1, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)
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
    typeof kataSandi !== "string" || kataSandi.trim() === ""
  ) {
    ctx.response.status = 400;
    ctx.response.body = {
      error: "Field nama, jabatan, dan kata_sandi wajib diisi.",
    };
    return;
  }

  let fotoBytes = null;

  if (
    foto instanceof File && !ALLOWED_IMAGE_TYPES.includes(foto.type)
  ) {
    ctx.response.status = 400;
    ctx.response.body = {
      error: "Foto harus berformat JPEG, PNG, atau WebP.",
    };
    return;
  }

  if (foto instanceof File && foto.size > MAX_FILE_SIZE) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Ukuran foto maksimal 5MB." };
    return;
  }

  fotoBytes = foto instanceof File
    ? new Uint8Array(await foto.arrayBuffer())
    : null;

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
