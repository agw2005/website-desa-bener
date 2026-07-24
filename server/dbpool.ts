import { Pool } from "@db/postgres";

export const pool = new Pool({
  database: Deno.env.get("POSTGRES_DB"),
  hostname: Deno.env.get("POSTGRES_HOSTNAME"),
  password: Deno.env.get("POSTGRES_PASSWORD"),
  port: Deno.env.get("POSTGRES_PORT"),
  user: Deno.env.get("POSTGRES_USER"),
}, 10);
