import type { RouterContext } from "@oak/oak/router";
import type { MisiPostPayload } from "../types/Misi.d.ts";
import type { VisiPostPayload } from "../types/Visi.d.ts";
import type { Komentar } from "../types/Komentar.d.ts";
import type { Wisata } from "../types/Wisata.d.ts";
import type { KontakUmkm, Umkm } from "../types/Umkm.d.ts";
import type { Pelayanan } from "../types/Pelayanan.d.ts";
import { executeQuery } from "../helpers/executeQuery.ts";
import { executeTransaction } from "../helpers/executeTransaction.ts";

export const postKontakUmkm = async (ctx: RouterContext<"/:id">) => {
  const umkmId = Number(ctx.params.id);

  if (!Number.isInteger(umkmId)) {
    ctx.response.status = 400;
    ctx.response.body = { error: `ID UMKM tidak valid.` };
    return;
  }

  const form = await ctx.request.body.formData();
  const jenis_kontak = form.get("jenis_kontak");
  const isi_kontak = form.get("isi_kontak");
  const tautan_kontak = form.get("tautan_kontak");

  if (
    typeof jenis_kontak !== "string" ||
    typeof isi_kontak !== "string" ||
    typeof tautan_kontak !== "string"
  ) {
    ctx.response.status = 400;
    ctx.response.body = { error: `Input kontak harus berupa teks.` };
    return;
  }

  if (
    jenis_kontak.trim() === "" ||
    isi_kontak.trim() === "" ||
    tautan_kontak.trim() === ""
  ) {
    ctx.response.status = 400;
    ctx.response.body = { error: `Input kontak tidak boleh kosong.` };
    return;
  }

  try {
    const created = await executeTransaction(async (connection) => {
      const umkmCheck = await connection.queryObject<Pick<Umkm, "umkm_id">>(
        `SELECT umkm_id FROM Umkm WHERE umkm_id = $1;`,
        [umkmId],
      );

      if (umkmCheck.rows.length === 0) {
        return null;
      }

      const result = await connection.queryObject<
        KontakUmkm & { umkm_id: number }
      >(
        `INSERT INTO Kontak_Umkm (umkm_id, jenis_kontak, isi, tautan)
         VALUES ($1, $2, $3, $4)
         RETURNING kontak_umkm_id, umkm_id, jenis_kontak, isi, tautan;`,
        [
          umkmId,
          jenis_kontak.trim(),
          isi_kontak.trim(),
          tautan_kontak.trim(),
        ],
      );

      return result.rows[0];
    });

    if (created === null) {
      ctx.response.status = 404;
      ctx.response.body = { error: `UMKM tidak ditemukan.` };
      return;
    }

    ctx.response.status = 201;
    ctx.response.body = created;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: `Gagal menyimpan kontak UMKM.` };
  }
};

export const postSyaratPelayanan = async (
  ctx: RouterContext<"/:id/syarat">,
) => {
  const pelayananId = Number(ctx.params.id);

  if (!Number.isInteger(pelayananId) || pelayananId <= 0) {
    ctx.response.status = 400;
    ctx.response.body = { error: "ID pelayanan tidak valid." };
    return;
  }

  const form = await ctx.request.body.formData();
  const isi = form.get("isi");
  const tautan = form.get("tautan");

  if (typeof isi !== "string" || isi.trim() === "") {
    ctx.response.status = 400;
    ctx.response.body = { error: "Isi syarat wajib diisi." };
    return;
  }

  try {
    const rows = await executeQuery<{ syarat_pelayanan_id: number }>(
      `INSERT INTO Syarat_Pelayanan (pelayanan_id, isi, tautan)
       VALUES ($1, $2, $3)
       RETURNING syarat_pelayanan_id;`,
      [
        pelayananId,
        isi.trim(),
        typeof tautan === "string" && tautan.trim() !== ""
          ? tautan.trim()
          : null,
      ],
    );

    ctx.response.status = 201;
    ctx.response.body = { syarat_pelayanan_id: rows[0].syarat_pelayanan_id };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menambahkan syarat." };
  }
};

export const postPelayanan = async (ctx: RouterContext<"/">) => {
  const form = await ctx.request.body.formData();

  const judul = form.get("judul");

  if (typeof judul !== "string" || judul.trim() === "") {
    ctx.response.status = 400;
    ctx.response.body = { error: "Judul pelayanan wajib diisi." };
    return;
  }

  const isiSyaratList = form.getAll("isi_syarat");
  const tautanSyaratList = form.getAll("tautan_syarat");

  if (isiSyaratList.length !== tautanSyaratList.length) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Data syarat tidak konsisten." };
    return;
  }

  for (const isi of isiSyaratList) {
    if (typeof isi !== "string" || isi.trim() === "") {
      ctx.response.status = 400;
      ctx.response.body = { error: "Setiap syarat wajib memiliki isi." };
      return;
    }
  }

  try {
    const pelayananId = await executeTransaction(async (connection) => {
      const created = await connection.queryObject<
        Pick<Pelayanan, "pelayanan_id">
      >(
        "INSERT INTO Pelayanan (judul) VALUES ($1) RETURNING pelayanan_id;",
        [judul.trim()],
      );
      const id = created.rows[0].pelayanan_id;

      for (let i = 0; i < isiSyaratList.length; i++) {
        const isi = isiSyaratList[i];
        const tautan = tautanSyaratList[i];

        if (typeof isi !== "string" || typeof tautan !== "string") {
          throw new Error("Format data syarat tidak valid.");
        }

        await connection.queryObject(
          `INSERT INTO Syarat_Pelayanan (pelayanan_id, isi, tautan)
           VALUES ($1, $2, $3);`,
          [id, isi.trim(), tautan.trim() === "" ? null : tautan.trim()],
        );
      }

      return id;
    });

    ctx.response.status = 201;
    ctx.response.body = { pelayanan_id: pelayananId };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menyimpan data pelayanan." };
  }
};

export const postUmkm = async (ctx: RouterContext<"/">) => {
  const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const form = await ctx.request.body.formData();

  const nama = form.get("nama");
  const deskripsi = form.get("deskripsi");
  const dusunIdRaw = form.get("dusun_id");
  const foto = form.get("foto");

  if (typeof nama !== "string" || nama.trim() === "") {
    ctx.response.status = 400;
    ctx.response.body = { error: "Nama UMKM wajib diisi." };
    return;
  }

  if (typeof deskripsi !== "string" || deskripsi.trim() === "") {
    ctx.response.status = 400;
    ctx.response.body = { error: "Deskripsi UMKM wajib diisi." };
    return;
  }

  let dusunId: number | null = null;
  if (typeof dusunIdRaw === "string" && dusunIdRaw.trim() !== "") {
    dusunId = Number(dusunIdRaw);
    if (!Number.isInteger(dusunId)) {
      ctx.response.status = 400;
      ctx.response.body = { error: "ID dusun tidak valid." };
      return;
    }
  }

  if (!(foto instanceof File)) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Foto UMKM wajib diunggah." };
    return;
  }

  if (!ALLOWED_IMAGE_TYPES.includes(foto.type)) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Foto harus berformat JPEG, PNG, atau JPG." };
    return;
  }

  if (foto.size > MAX_FILE_SIZE) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Ukuran foto maksimal 5MB." };
    return;
  }

  const jenisKontakList = form.getAll("jenis_kontak");
  const isiKontakList = form.getAll("isi_kontak");
  const tautanKontakList = form.getAll("tautan_kontak");

  if (
    jenisKontakList.length !== isiKontakList.length ||
    jenisKontakList.length !== tautanKontakList.length
  ) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Data kontak tidak konsisten." };
    return;
  }

  const fotoBytes = new Uint8Array(await foto.arrayBuffer());

  try {
    const umkmId = await executeTransaction(async (connection) => {
      const created = await connection.queryObject<Pick<Umkm, "umkm_id">>(
        `INSERT INTO Umkm (nama, dusun_id, deskripsi, foto)
         VALUES ($1, $2, $3, $4)
         RETURNING umkm_id;`,
        [nama.trim(), dusunId, deskripsi.trim(), fotoBytes],
      );
      const id = created.rows[0].umkm_id;

      for (let i = 0; i < jenisKontakList.length; i++) {
        const jenisKontak = jenisKontakList[i];
        const isiKontak = isiKontakList[i];
        const tautanKontak = tautanKontakList[i];

        if (
          typeof jenisKontak !== "string" || typeof isiKontak !== "string" ||
          typeof tautanKontak !== "string"
        ) {
          throw new Error("Format data kontak tidak valid.");
        }

        await connection.queryObject(
          `INSERT INTO Kontak_Umkm (umkm_id, jenis_kontak, isi, tautan)
           VALUES ($1, $2, $3, $4);`,
          [id, jenisKontak, isiKontak, tautanKontak],
        );
      }

      return id;
    });

    ctx.response.status = 201;
    ctx.response.body = { umkm_id: umkmId };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menyimpan data UMKM." };
  }
};

export const postWisata = async (ctx: RouterContext<"/">) => {
  const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const form = await ctx.request.body.formData();
  const nama = form.get("nama");
  const deskripsi = form.get("deskripsi");
  const foto = form.get("foto");

  if (
    typeof nama !== "string" || nama.trim() === "" ||
    typeof deskripsi !== "string" || deskripsi.trim() === ""
  ) {
    ctx.response.status = 400;
    ctx.response.body = {
      error: "Field nama dan deskripsi wajib diisi.",
    };
    return;
  }

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

  const fotoBytes = foto instanceof File
    ? new Uint8Array(await foto.arrayBuffer())
    : null;

  try {
    const rows = await executeQuery<Pick<Wisata, "wisata_id">>(
      `INSERT INTO
       Wisata (nama, deskripsi, foto)
       VALUES ($1, $2, $3)
       RETURNING wisata_id;`,
      [nama, deskripsi, fotoBytes],
    );

    ctx.response.status = 201;
    ctx.response.body = { wisata_id: rows[0].wisata_id };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menyimpan data tempat wisata." };
  }
};

export const postKomentar = async (ctx: RouterContext<"/">) => {
  const body: Omit<Komentar, "komentar_id" | "waktu_upload"> = await ctx
    .request.body.json();

  if (!body.nama) {
    ctx.response.status = 400;
    ctx.response.body = {
      error: "Field nama wajib diisi.",
    };
    return;
  }

  const waktuUpload = Math.floor(Date.now() / 1000);

  try {
    const rows = await executeQuery<{ komentar_id: number }>(
      `INSERT INTO
       Komentar  (nama, surel, isi, waktu_upload)
       VALUES    ($1  , $2   , $3 , $4          )
       RETURNING komentar_id;`,
      [body.nama, body.surel, body.isi, waktuUpload],
    );

    ctx.response.status = 201;
    ctx.response.body = { komentar_id: rows[0].komentar_id };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menyimpan data label." };
  }
};

export const postLabel = async (ctx: RouterContext<"/">) => {
  const nama = ctx.request.url.searchParams.get("nama");

  if (!nama) {
    ctx.response.status = 400;
    ctx.response.body = {
      error: "Field nama wajib diisi.",
    };
    return;
  }

  try {
    const rows = await executeQuery<{ label_id: number }>(
      `INSERT INTO
       Label (nama)
       VALUES ($1)
       RETURNING label_id;`,
      [nama],
    );

    ctx.response.status = 201;
    ctx.response.body = { label_id: rows[0].label_id };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menyimpan data label." };
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

  const fileBytes = new Uint8Array(await file.arrayBuffer());

  try {
    const result = await executeTransaction(async (connection) => {
      const existing = await connection.queryObject<{ apbdes_id: number }>(
        "SELECT apbdes_id FROM Apbdes WHERE tahun = $1;",
        [year],
      );

      let apbdesId: number;

      if (existing.rows.length > 0) {
        apbdesId = existing.rows[0].apbdes_id;
      } else {
        const created = await connection.queryObject<{ apbdes_id: number }>(
          "INSERT INTO Apbdes (tahun) VALUES ($1) RETURNING apbdes_id;",
          [year],
        );
        apbdesId = created.rows[0].apbdes_id;
      }

      const inserted = await connection.queryObject<
        { apbdes_file_id: number }
      >(
        `INSERT INTO Lampiran_Apbdes (apbdes_id, nama_file, besar_file, isi_file)
         VALUES ($1, $2, $3, $4)
         RETURNING apbdes_file_id;`,
        [apbdesId, file.name, file.size, fileBytes],
      );

      return {
        apbdes_id: apbdesId,
        apbdes_file_id: inserted.rows[0].apbdes_file_id,
      };
    });

    ctx.response.status = 201;
    ctx.response.body = result;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menyimpan lampiran APBDes." };
  }
};

export const postVisi = async (ctx: RouterContext<"/">) => {
  let request: VisiPostPayload;
  try {
    request = await ctx.request.body.json();
  } catch {
    ctx.response.status = 400;
    ctx.response.body = { error: "Body permintaan tidak valid." };
    return;
  }

  try {
    const rows = await executeQuery<{ visi_id: number }>(
      "INSERT INTO Visi (isi) VALUES ($1) RETURNING visi_id;",
      [request.isi],
    );

    ctx.response.status = 201;
    ctx.response.body = rows[0];
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menyimpan data visi." };
  }
};

export const postMisi = async (ctx: RouterContext<"/">) => {
  let request: MisiPostPayload;
  try {
    request = await ctx.request.body.json();
  } catch {
    ctx.response.status = 400;
    ctx.response.body = { error: "Body permintaan tidak valid." };
    return;
  }

  try {
    const rows = await executeQuery<{ misi_id: number }>(
      "INSERT INTO Misi (isi) VALUES ($1) RETURNING misi_id;",
      [request.isi],
    );

    ctx.response.status = 201;
    ctx.response.body = rows[0];
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menyimpan data misi." };
  }
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

  try {
    const rows = await executeQuery<{ dusun_id: number }>(
      `INSERT INTO
       Dusun (nama, rt, populasi, keluarga, laki, perempuan, umkm, islam, protestanisme, katolisisme, hinduisme, buddhisme, konfusianisme, tunadaksa, tunanetra, tunarungu, tunawicara, tunagrahita, tunalaras, kps, ks_satu, ks_dua, ks_tiga, ks_tiga_plus)
       VALUES ($1, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)
       RETURNING dusun_id;`,
      [nama],
    );

    ctx.response.status = 201;
    ctx.response.body = { dusun_id: rows[0].dusun_id };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menyimpan data dusun." };
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
    typeof kataSandi !== "string" || kataSandi.trim() === "" ||
    nama.trim() === "Admin"
  ) {
    ctx.response.status = 400;
    ctx.response.body = {
      error: "Field nama, jabatan, dan kata_sandi wajib diisi.",
    };
    return;
  }

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

  const fotoBytes = foto instanceof File
    ? new Uint8Array(await foto.arrayBuffer())
    : null;

  try {
    const rows = await executeQuery<{ aparatur_id: number }>(
      `INSERT INTO
       Aparatur (nama, jabatan, telepon, foto, kata_sandi)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING aparatur_id;`,
      [nama, jabatan, telepon, fotoBytes, kataSandi],
    );

    ctx.response.status = 201;
    ctx.response.body = { aparatur_id: rows[0].aparatur_id };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menyimpan data aparatur." };
  }
};

export const postArtikel = async (ctx: RouterContext<"/">) => {
  const ALLOWED_LAMPIRAN_TYPES = ["image/jpeg", "image/png", "image/jpg"];
  const MAX_LAMPIRAN_SIZE = 5 * 1024 * 1024; // 5MB per file

  const form = await ctx.request.body.formData();

  const judul = form.get("judul");
  const isi = form.get("isi");

  if (typeof judul !== "string" || judul.trim() === "") {
    ctx.response.status = 400;
    ctx.response.body = { error: "Judul artikel wajib diisi." };
    return;
  }

  if (typeof isi !== "string" || isi.trim() === "") {
    ctx.response.status = 400;
    ctx.response.body = { error: "Isi artikel wajib diisi." };
    return;
  }

  // Labels: frontend sends repeated "label_id" fields, one per selected label
  const labelIds: number[] = [];
  for (const value of form.getAll("label_id")) {
    if (typeof value === "string") {
      const parsed = Number.parseInt(value, 10);
      if (!Number.isInteger(parsed)) {
        ctx.response.status = 400;
        ctx.response.body = { error: "ID label tidak valid." };
        return;
      }
      labelIds.push(parsed);
    }
  }

  // Attachments: frontend sends repeated "lampiran" file fields
  const lampiranFiles: File[] = [];
  for (const value of form.getAll("lampiran")) {
    if (value instanceof File) {
      if (!ALLOWED_LAMPIRAN_TYPES.includes(value.type)) {
        ctx.response.status = 400;
        ctx.response.body = {
          error:
            `Lampiran "${value.name}" harus berformat JPEG, PNG, atau JPG.`,
        };
        return;
      }
      if (value.size > MAX_LAMPIRAN_SIZE) {
        ctx.response.status = 400;
        ctx.response.body = {
          error: `Lampiran "${value.name}" melebihi ukuran maksimal 5MB.`,
        };
        return;
      }
      lampiranFiles.push(value);
    }
  }

  try {
    const artikelId = await executeTransaction(async (connection) => {
      const waktuUpload = Math.floor(Date.now() / 1000);

      const created = await connection.queryObject<{ artikel_id: number }>(
        `INSERT INTO Artikel (judul, isi, waktu_upload)
         VALUES ($1, $2, $3)
         RETURNING artikel_id;`,
        [judul.trim(), isi.trim(), waktuUpload],
      );
      const id = created.rows[0].artikel_id;

      for (const labelId of labelIds) {
        await connection.queryObject(
          `INSERT INTO Label_Artikel (artikel_id, label_id) VALUES ($1, $2);`,
          [id, labelId],
        );
      }

      for (const file of lampiranFiles) {
        const fileBytes = new Uint8Array(await file.arrayBuffer());
        await connection.queryObject(
          `INSERT INTO Lampiran_Artikel (artikel_id, nama_file, besar_file, isi_file)
           VALUES ($1, $2, $3, $4);`,
          [id, file.name, file.size, fileBytes],
        );
      }

      return id;
    });

    ctx.response.status = 201;
    ctx.response.body = { artikel_id: artikelId };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menyimpan artikel." };
  }
};
