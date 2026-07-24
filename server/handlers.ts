import { RouterContext } from "@oak/oak/router";
import { pool } from "./dbpool.ts";

export const healthCheck = (ctx: RouterContext<"/">) => {
  ctx.response.status = 200;
  ctx.response.body = "Healthy";
};

export const profilSekilas = async (ctx: RouterContext<"/profil-sekilas">) => {
  const connection = await pool.connect();
  const result = await connection.queryArray<DeskripsiSekilas[]>(
    "SELECT deskripsi_sekilas FROM Profil LIMIT 1;",
  );
  ctx.response.status = 200;
  ctx.response.body = result.rows;
  connection.release();
};

// POST HANDLERS

export const postAparatur = async (ctx: RouterContext<"/">) => {
  const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const form = await ctx.request.body.formData();
  const nama = form.get("nama");
  const jabatan = form.get("jabatan");
  const telepon = form.get("telepon");
  const kata_sandi = form.get("kata_sandi");
  const foto = form.get("foto");

  if (
    typeof nama !== "string" || nama.trim() === "" ||
    typeof jabatan !== "string" || jabatan.trim() === "" ||
    typeof telepon !== "string" || telepon.trim() === "" ||
    typeof kata_sandi !== "string" || kata_sandi.trim() === ""
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
      [nama, jabatan, telepon, fotoBytes, kata_sandi],
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
