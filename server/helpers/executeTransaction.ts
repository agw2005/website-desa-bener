import { PoolClient } from "@db/postgres";
import { pool } from "../dbpool.ts";

export const executeTransaction = async <T>(
  callback: (connection: PoolClient) => Promise<T>,
): Promise<T> => {
  const connection = await pool.connect();
  try {
    await connection.queryObject("BEGIN");
    const result = await callback(connection);
    await connection.queryObject("COMMIT");
    return result;
  } catch (err) {
    await connection.queryObject("ROLLBACK");
    throw err;
  } finally {
    connection.release();
  }
};
