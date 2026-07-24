import { Application } from "@oak/oak/application";
import { Router } from "@oak/oak/router";
import * as handlers from "./handlers.ts";

const port = 8000;
const app = new Application();
const root = new Router();
const aparatur = new Router();
const profil = new Router();

root
  .get("/", handlers.healthCheck);

aparatur
  .post("/", handlers.postAparatur)
  .post("/login", handlers.requestJwtAparatur)
  .get("/verifikasi", handlers.verifyJwtAparatur);

profil
  .patch("/", handlers.patchProfil)
  .get("/deskripsi", handlers.deskripsiSekilas);

root
  .use("/aparatur", aparatur.routes(), aparatur.allowedMethods())
  .use("/profil", profil.routes(), profil.allowedMethods());

app
  .use(async (ctx, next) => {
    ctx.response.headers.set(
      "Access-Control-Allow-Origin",
      `*`,
    );

    ctx.response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    );

    ctx.response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );

    ctx.response.headers.set("Access-Control-Max-Age", "86400");

    if (ctx.request.method === "OPTIONS") {
      ctx.response.status = 204;
      return;
    }

    await next();
  })
  .use(root.routes())
  .use(root.allowedMethods());

if (import.meta.main) {
  await app.listen({ port });
}
