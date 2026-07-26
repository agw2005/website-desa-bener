import { Application } from "@oak/oak/application";
import { Router } from "@oak/oak/router";
import * as handlers from "./handlers.ts";

const port = 8000;
const app = new Application();
const root = new Router();
const aparatur = new Router();
const profil = new Router();
const umum = new Router();
const dusun = new Router();
const visi = new Router();
const misi = new Router();

root
  .get("/", handlers.healthCheck)
  .get("/verifikasi", handlers.verifyJwt);

misi
  .get("/", handlers.misi)
  .post("/", handlers.postMisi)
  .delete("/:id", handlers.deleteMisi);

visi
  .get("/", handlers.visi)
  .post("/", handlers.postVisi)
  .delete("/:id", handlers.deleteVisi);

aparatur
  .post("/", handlers.postAparatur)
  .post("/login", handlers.requestJwtAparatur)
  .get("/", handlers.aparaturDesa)
  .get("/foto/:id", handlers.fotoAparaturDesa)
  .delete("/:id", handlers.deleteAparatur);

profil
  .patch("/", handlers.patchProfil)
  .get("/deskripsi", handlers.deskripsiSekilas)
  .get("/data", handlers.getProfilDesa)
  .get("/peta", handlers.petaDesa)
  .get("/", handlers.getProfil);

umum
  .post("/", handlers.postUmum)
  .post("/login", handlers.requestJwtWargaUmum);

dusun
  .post("/", handlers.postDusun)
  .get("/nama", handlers.namaDusun)
  .get("/:id", handlers.getOneDusun)
  .get("/", handlers.getDusun)
  .patch("/:id", handlers.patchDusun);

root
  .use("/aparatur", aparatur.routes(), aparatur.allowedMethods())
  .use("/profil", profil.routes(), profil.allowedMethods())
  .use("/umum", umum.routes(), umum.allowedMethods())
  .use("/dusun", dusun.routes(), dusun.allowedMethods())
  .use("/visi", visi.routes(), visi.allowedMethods())
  .use("/misi", misi.routes(), misi.allowedMethods());

app
  .use(async (ctx, next) => {
    ctx.response.headers.set(
      "Access-Control-Allow-Origin",
      `http://localhost:5173`,
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
