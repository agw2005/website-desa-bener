// server/middleware/requireAuth.ts
import type { Context } from "@oak/oak";
import { verify } from "@zaubrik/djwt";
import { getJwtKey } from "../helpers//getJwtKey.ts";
import type { LoggedInInfo } from "../types/Login.d.ts";

export const requireAuth = async (
  ctx: Context,
  next: () => Promise<unknown>,
) => {
  const authHeader = ctx.request.headers.get("Authorization");

  if (!authHeader) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Tidak ada token otorisasi." };
    return;
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Format token tidak valid." };
    return;
  }

  try {
    const jwtKey = await getJwtKey();
    const decoded = await verify(token, jwtKey) as unknown as LoggedInInfo;
    ctx.state.auth = decoded;

    await next();
  } catch (err) {
    console.error(err);
    ctx.response.status = 401;
    ctx.response.body = { error: "Token tidak valid atau kedaluwarsa." };
  }
};
