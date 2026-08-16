import { pool } from "../dbpool.ts";

export const executeQuery = async <T>(
  query: string,
  params: unknown[] = [],
): Promise<T[]> => {
  const connection = await pool.connect();
  try {
    const result = await connection.queryObject<T>(query, params);
    return result.rows;
  } finally {
    connection.release();
  }
};
