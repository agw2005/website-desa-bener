import type { RouterContext } from "@oak/oak/router";
import { pool } from "../dbpool.ts";

export const deleteDusun = async (ctx: RouterContext<"/:id">) => {
  const id = Number(ctx.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    ctx.response.status = 400;
    ctx.response.body = { error: "ID dusun tidak valid." };
    return;
  }

  const connection = await pool.connect();
  try {
    const result = await connection.queryObject(
      "DELETE FROM Dusun WHERE dusun_id = $1",
      [id],
    );

    if (result.rowCount === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Dusun tidak ditemukan." };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = { message: "Dusun berhasil dihapus." };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menghapus dusun." };
  } finally {
    connection.release();
  }
};

export const deleteLampiranApbdes = async (ctx: RouterContext<"/:id">) => {
  const id = Number(ctx.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    ctx.response.status = 400;
    ctx.response.body = { error: "ID lampiran APBDes tidak valid." };
    return;
  }

  const connection = await pool.connect();
  try {
    const result = await connection.queryObject(
      "DELETE FROM Lampiran_Apbdes WHERE apbdes_file_id = $1",
      [id],
    );

    if (result.rowCount === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Lampiran APBDes tidak ditemukan." };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = { message: "Lampiran APBDes berhasil dihapus." };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menghapus lampiran APBDes." };
  } finally {
    connection.release();
  }
};

export const deleteUmkm = async (ctx: RouterContext<"/:id">) => {
  const id = Number(ctx.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    ctx.response.status = 400;
    ctx.response.body = { error: "ID UMKM tidak valid." };
    return;
  }

  const connection = await pool.connect();
  try {
    const result = await connection.queryObject(
      "DELETE FROM Umkm WHERE umkm_id = $1",
      [id],
    );

    if (result.rowCount === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: "UMKM tidak ditemukan." };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = { message: "UMKM berhasil dihapus." };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menghapus UMKM." };
  } finally {
    connection.release();
  }
};

export const deleteTempatWisata = async (ctx: RouterContext<"/:id">) => {
  const id = Number(ctx.params.id);

  const connection = await pool.connect();
  try {
    const result = await connection.queryObject(
      "DELETE FROM Wisata WHERE wisata_id = $1",
      [id],
    );

    if (result.rowCount === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Tempat wisata tidak ditemukan." };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = { message: "Tempat wisata berhasil dihapus." };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menghapus tempat wisata." };
  } finally {
    connection.release();
  }
};

export const deleteArtikel = async (ctx: RouterContext<"/:id">) => {
  const id = Number(ctx.params.id);

  const connection = await pool.connect();
  try {
    const result = await connection.queryObject(
      "DELETE FROM Artikel WHERE artikel_id = $1",
      [id],
    );

    if (result.rowCount === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Artikel tidak ditemukan." };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = { message: "Artikel berhasil dihapus." };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menghapus artikel." };
  } finally {
    connection.release();
  }
};

export const deleteKomentar = async (ctx: RouterContext<"/:id">) => {
  const id = Number(ctx.params.id);

  const connection = await pool.connect();
  try {
    const result = await connection.queryObject(
      "DELETE FROM Komentar WHERE komentar_id = $1",
      [id],
    );

    if (result.rowCount === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Komentar tidak ditemukan." };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = { message: "Komentar berhasil dihapus." };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menghapus komentar." };
  } finally {
    connection.release();
  }
};

export const deleteLabel = async (ctx: RouterContext<"/:id">) => {
  const id = Number(ctx.params.id);

  const connection = await pool.connect();
  try {
    const result = await connection.queryObject(
      "DELETE FROM Label WHERE label_id = $1",
      [id],
    );

    if (result.rowCount === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Label tidak ditemukan." };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = { message: "Label berhasil dihapus." };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menghapus label." };
  } finally {
    connection.release();
  }
};

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

export const deleteVisi = async (ctx: RouterContext<"/:id">) => {
  const id = Number(ctx.params.id);

  const connection = await pool.connect();
  try {
    const result = await connection.queryObject(
      "DELETE FROM Visi WHERE visi_id = $1",
      [id],
    );

    if (result.rowCount === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Visi tidak ditemukan." };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = { message: "Visi berhasil dihapus." };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menghapus data aparatur." };
  } finally {
    connection.release();
  }
};

export const deleteMisi = async (ctx: RouterContext<"/:id">) => {
  const id = Number(ctx.params.id);

  const connection = await pool.connect();
  try {
    const result = await connection.queryObject(
      "DELETE FROM Misi WHERE misi_id = $1",
      [id],
    );

    if (result.rowCount === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Misi tidak ditemukan." };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = { message: "Misi berhasil dihapus." };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Gagal menghapus data aparatur." };
  } finally {
    connection.release();
  }
};
