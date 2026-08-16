import type { RouterContext } from "@oak/oak/router";
import { safeDecodeURI } from "../helpers/safeDecodeURI.ts";
import type { Umkm } from "../types/Umkm.d.ts";
import { executeTransaction } from "../helpers/executeTransaction.ts";
import { executeQuery } from "../helpers/executeQuery.ts";

export const patchUmkm = async (ctx: RouterContext<"/:id">) => {
  const umkmId = Number(ctx.params.id);

  if (!Number.isInteger(umkmId)) {
    ctx.response.status = 400;
    ctx.response.body = { error: `ID UMKM tidak valid.` };
    return;
  }

  const form = await ctx.request.body.formData();
  const nama = form.get("nama");
  const dusun_id = form.get("dusun_id");
  const deskripsi = form.get("deskripsi");
  const foto = form.get("foto");

  const setClauses: string[] = [];
  const values: unknown[] = [];
  let paramIndex = 1;

  if (nama !== null) {
    if (typeof nama !== "string" || nama.trim() === "") {
      ctx.response.status = 400;
      ctx.response.body = { error: `Nama UMKM tidak boleh kosong.` };
      return;
    }
    setClauses.push(`nama = $${paramIndex++}`);
    values.push(nama.trim());
  }

  if (dusun_id !== null) {
    const dusunIdNum = Number(dusun_id);
    if (typeof dusun_id !== "string" || !Number.isInteger(dusunIdNum)) {
      ctx.response.status = 400;
      ctx.response.body = { error: `ID dusun tidak valid.` };
      return;
    }
    setClauses.push(`dusun_id = $${paramIndex++}`);
    values.push(dusunIdNum);
  }

  if (deskripsi !== null) {
    if (typeof deskripsi !== "string" || deskripsi.trim() === "") {
      ctx.response.status = 400;
      ctx.response.body = { error: `Deskripsi UMKM tidak boleh kosong.` };
      return;
    }
    setClauses.push(`deskripsi = $${paramIndex++}`);
    values.push(deskripsi.trim());
  }

  if (foto !== null) {
    if (!(foto instanceof File)) {
      ctx.response.status = 400;
      ctx.response.body = { error: `Foto UMKM harus berupa file.` };
      return;
    }
    if (!["image/jpeg", "image/png", "image/jpg"].includes(foto.type)) {
      ctx.response.status = 400;
      ctx.response.body = {
        error: "Peta harus berformat JPEG, PNG, atau JPG.",
      };
      return;
    }
    const fotoBytes = new Uint8Array(await foto.arrayBuffer());
    setClauses.push(`foto = $${paramIndex++}`);
    values.push(fotoBytes);
  }

  if (setClauses.length === 0) {
    ctx.response.status = 400;
    ctx.response.body = { error: `Tidak ada data untuk diperbarui.` };
    return;
  }

  try {
    const updated = await executeTransaction(async (connection) => {
      const umkmCheck = await connection.queryObject<Pick<Umkm, "umkm_id">>(
        `SELECT umkm_id FROM Umkm WHERE umkm_id = $1;`,
        [umkmId],
      );

      if (umkmCheck.rows.length === 0) {
        return null;
      }

      values.push(umkmId);
      const result = await connection.queryObject<Omit<Umkm, "foto">>(
        `UPDATE Umkm
         SET ${setClauses.join(", ")}
         WHERE umkm_id = $${paramIndex}
         RETURNING umkm_id, nama, deskripsi, dusun_id;`,
        values,
      );

      return result.rows[0];
    });

    if (updated === null) {
      ctx.response.status = 404;
      ctx.response.body = { error: `UMKM tidak ditemukan.` };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = updated;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: `Gagal memperbarui UMKM.` };
  }
};

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

  try {
    values.push(id);

    const rows = await executeQuery(
      `UPDATE Dusun SET ${
        setClauses.join(", ")
      } WHERE dusun_id = $${paramIndex};`,
      values,
    );

    if (rows.length === 0) {
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
  }
};

export const patchProfil = async (ctx: RouterContext<"/">) => {
  const PROFIL_TEXT_FIELDS = [
    "deskripsi_sekilas",
    "kode_desa",
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

  const PROFIL_INT_FIELDS = ["tahun_pembentukan"] as const;
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

  for (const field of PROFIL_TEXT_FIELDS) {
    const value = form.get(field);
    if (typeof value === "string") {
      const trimmed = value.trim();
      addField(
        field,
        trimmed === ""
          ? null
          : field === "tautan_kalender"
          ? safeDecodeURI(trimmed)
          : trimmed,
      );
    }
  }

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

  try {
    const updated = await executeTransaction(async (connection) => {
      const existing = await connection.queryObject<{ profil_id: number }>(
        "SELECT profil_id FROM Profil LIMIT 1;",
      );

      if (existing.rows.length === 0) {
        return null;
      }

      const profilId = existing.rows[0].profil_id;
      values.push(profilId);

      await connection.queryObject(
        `UPDATE Profil SET ${
          setClauses.join(", ")
        } WHERE profil_id = $${paramIndex};`,
        values,
      );

      return profilId;
    });

    if (updated === null) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Data profil desa belum tersedia." };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = { message: "Profil desa berhasil diperbarui." };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal memperbarui data profil desa." };
  }
};
