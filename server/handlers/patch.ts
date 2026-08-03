import type { RouterContext } from "@oak/oak/router";
import { pool } from "../dbpool.ts";
import { safeDecodeURI } from "../helpers/safeDecodeURI.ts";

export const patchDusun = async (ctx: RouterContext<"/:id">) => {
  const DUSUN_TEXT_FIELDS = ["nama"] as const;

  const DUSUN_INT_FIELDS = [
    "rt",
    "populasi",
    "keluarga",
    "laki",
    "perempuan",
    "umkm",
    "islam",
    "protestanisme",
    "katolisisme",
    "hinduisme",
    "buddhisme",
    "konfusianisme",
    "tunadaksa",
    "tunanetra",
    "tunarungu",
    "tunawicara",
    "tunagrahita",
    "tunalaras",
    "kps",
    "ks_satu",
    "ks_dua",
    "ks_tiga",
    "ks_tiga_plus",
  ] as const;

  const id = Number(ctx.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    ctx.response.status = 400;
    ctx.response.body = { error: "ID dusun tidak valid." };
    return;
  }

  let body: Record<string, unknown>;

  try {
    body = await ctx.request.body.json();
  } catch {
    ctx.response.status = 400;
    ctx.response.body = { error: "Body permintaan tidak valid." };
    return;
  }

  const setClauses: string[] = [];
  const values: unknown[] = [];
  let paramIndex = 1;

  const addField = (field: string, value: unknown) => {
    setClauses.push(`${field} = $${paramIndex}`);
    values.push(value);
    paramIndex++;
  };

  for (const field of DUSUN_TEXT_FIELDS) {
    const value = body[field];
    if (typeof value === "string" && value.trim() !== "") {
      addField(field, value.trim());
    }
  }

  for (const field of DUSUN_INT_FIELDS) {
    const raw = body[field];
    if (raw === undefined || raw === null || raw === "") continue;

    const parsed = typeof raw === "number"
      ? raw
      : Number.parseInt(String(raw), 10);
    if (!Number.isInteger(parsed) || parsed < 0) {
      ctx.response.status = 400;
      ctx.response.body = {
        error: `Field ${field} harus berupa angka bulat non-negatif.`,
      };
      return;
    }
    addField(field, parsed);
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
    values.push(id);

    const result = await connection.queryObject(
      `UPDATE Dusun SET ${
        setClauses.join(", ")
      } WHERE dusun_id = $${paramIndex}`,
      values,
    );

    if (result.rowCount === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Data dusun tidak ditemukan." };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = { message: "Data dusun berhasil diperbarui." };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal memperbarui data dusun." };
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
      addField(
        field,
        field === "tautan_kalender"
          ? safeDecodeURI(value.trim())
          : value.trim(),
      );
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
