import { Application } from "@oak/oak/application";
import { Router, type RouterContext } from "@oak/oak/router";
import { requestJwtAparatur, verifyJwt } from "./handlers/login.ts";
import {
  aparaturDesa,
  deskripsiSekilas,
  fotoAparaturDesa,
  getApbdesAtYear,
  getApbdesFile,
  getDusun,
  getMisi,
  getOneDusun,
  getProfil,
  getProfilDesa,
  getVisi,
  namaDusun,
  petaDesa,
} from "./handlers/get.ts";
import {
  deleteAparatur,
  deleteMisi,
  deleteVisi,
  postAparatur,
  postApbdesFileAtYear,
  postDusun,
  postMisi,
  postVisi,
} from "./handlers/post.ts";
import { patchDusun, patchProfil } from "./handlers/patch.ts";
import type { Next } from "@oak/oak/middleware";

const port = 8000;
const app = new Application();
const root = new Router();
const aparatur = new Router();
const profil = new Router();
const dusun = new Router();
const visi = new Router();
const misi = new Router();
const apbdes = new Router();

root
  .get("/", (ctx: RouterContext<"/">) => {
    ctx.response.status = 200;
    ctx.response.body = "Healthy";
  })
  .get("/verifikasi", verifyJwt);

apbdes
  .get("/:year", getApbdesAtYear)
  .post("/:year", postApbdesFileAtYear)
  .get("/file/:id", getApbdesFile);

misi
  .get("/", getMisi)
  .post("/", postMisi)
  .delete("/:id", deleteMisi);

visi
  .get("/", getVisi)
  .post("/", postVisi)
  .delete("/:id", deleteVisi);

aparatur
  .post("/", postAparatur)
  .post("/login", requestJwtAparatur)
  .get("/", aparaturDesa)
  .get("/foto/:id", fotoAparaturDesa)
  .delete("/:id", deleteAparatur);

profil
  .patch("/", patchProfil)
  .get("/deskripsi", deskripsiSekilas)
  .get("/data", getProfilDesa)
  .get("/peta", petaDesa)
  .get("/", getProfil);

dusun
  .post("/", postDusun)
  .get("/nama", namaDusun)
  .get("/:id", getOneDusun)
  .get("/", getDusun)
  .patch("/:id", patchDusun);

root
  .use("/aparatur", aparatur.routes(), aparatur.allowedMethods())
  .use("/profil", profil.routes(), profil.allowedMethods())
  .use("/dusun", dusun.routes(), dusun.allowedMethods())
  .use("/visi", visi.routes(), visi.allowedMethods())
  .use("/misi", misi.routes(), misi.allowedMethods())
  .use("/apbdes", apbdes.routes(), apbdes.allowedMethods());

app
  .use(async (ctx, next: Next) => {
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
