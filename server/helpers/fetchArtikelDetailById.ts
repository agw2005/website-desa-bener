import type { ArtikelDetail } from "../types/Artikel.d.ts";
import { bigintToNumber } from "./bigintToNumber.ts";
import { executeQuery } from "./executeQuery.ts";

export const fetchArtikelDetailById = async (
  id: number,
): Promise<ArtikelDetail | null> => {
  const rows = await executeQuery<ArtikelDetail>(
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
      ) AS labels,
      COALESCE(
        (
          SELECT json_agg(json_build_object(
            'lampiran_artikel_id', Lampiran_Artikel.lampiran_artikel_id,
            'nama_file', Lampiran_Artikel.nama_file,
            'besar_file', Lampiran_Artikel.besar_file
          ))
          FROM Lampiran_Artikel
          WHERE Lampiran_Artikel.artikel_id = Artikel.artikel_id
        ),
        '[]'
      ) AS lampiran
    FROM Artikel
    WHERE Artikel.artikel_id = $1;
    `,
    [id],
  );

  if (rows.length === 0) return null;

  return bigintToNumber(rows[0], ["waktu_upload"]);
};
