import { Application } from "@oak/oak/application";
import { Router, type RouterContext } from "@oak/oak/router";
import { requestJwtAparatur, verifyJwt } from "./handlers/login.ts";
import {
  aparaturDesa,
  deskripsiSekilas,
  fotoAparaturDesa,
  getApbdesAtYear,
  getApbdesFile,
  getArtikelById,
  getArtikelLampiran,
  getArtikels,
  getArtikelTerbaru,
  getDusun,
  getKalender,
  getKomentars,
  getLabel,
  getMisi,
  getOneDusun,
  getProfil,
  getProfilDesa,
  getVisi,
  namaDusun,
  petaDesa,
  thumbnail,
} from "./handlers/get.ts";
import {
  postAparatur,
  postApbdesFileAtYear,
  postArtikel,
  postDusun,
  postKomentar,
  postLabel,
  postMisi,
  postVisi,
} from "./handlers/post.ts";
import { patchDusun, patchProfil } from "./handlers/patch.ts";
import type { Next } from "@oak/oak/middleware";
import {
  deleteAparatur,
  deleteArtikel,
  deleteKomentar,
  deleteLabel,
  deleteMisi,
  deleteVisi,
} from "./handlers/delete.ts";

const port = 8000;
const app = new Application();
const root = new Router();
const aparatur = new Router();
const profil = new Router();
const dusun = new Router();
const visi = new Router();
const misi = new Router();
const apbdes = new Router();
const label = new Router();
const artikel = new Router();
const komentar = new Router();

root
  .get("/", (ctx: RouterContext<"/">) => {
    ctx.response.status = 200;
    ctx.response.body = "Healthy";
  })
  .get("/verifikasi", verifyJwt);

komentar
  .delete("/:id", deleteKomentar)
  .get("/", getKomentars)
  .post("/", postKomentar);

artikel
  .get("/lampiran/:id", getArtikelLampiran)
  .get("/thumbnail/:id", thumbnail)
  .get("/terbaru", getArtikelTerbaru)
  .get("/:id", getArtikelById)
  .delete("/:id", deleteArtikel)
  .post("/", postArtikel)
  .get("/", getArtikels);

label
  .delete("/:id", deleteLabel)
  .get("/", getLabel)
  .post("/", postLabel);

apbdes
  .get("/file/:id", getApbdesFile)
  .get("/:year", getApbdesAtYear)
  .post("/:year", postApbdesFileAtYear);

misi
  .delete("/:id", deleteMisi)
  .get("/", getMisi)
  .post("/", postMisi);

visi
  .delete("/:id", deleteVisi)
  .get("/", getVisi)
  .post("/", postVisi);

aparatur
  .get("/foto/:id", fotoAparaturDesa)
  .delete("/:id", deleteAparatur)
  .post("/login", requestJwtAparatur)
  .post("/", postAparatur)
  .get("/", aparaturDesa);

profil
  .get("/deskripsi", deskripsiSekilas)
  .get("/data", getProfilDesa)
  .get("/peta", petaDesa)
  .get("/kalender", getKalender)
  .patch("/", patchProfil)
  .get("/", getProfil);

dusun
  .get("/nama", namaDusun)
  .get("/:id", getOneDusun)
  .patch("/:id", patchDusun)
  .post("/", postDusun)
  .get("/", getDusun);

root
  .use("/aparatur", aparatur.routes(), aparatur.allowedMethods())
  .use("/profil", profil.routes(), profil.allowedMethods())
  .use("/dusun", dusun.routes(), dusun.allowedMethods())
  .use("/visi", visi.routes(), visi.allowedMethods())
  .use("/misi", misi.routes(), misi.allowedMethods())
  .use("/apbdes", apbdes.routes(), apbdes.allowedMethods())
  .use("/label", label.routes(), label.allowedMethods())
  .use("/artikel", artikel.routes(), artikel.allowedMethods())
  .use("/komentar", komentar.routes(), komentar.allowedMethods());

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
