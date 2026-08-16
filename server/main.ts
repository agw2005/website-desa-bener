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
  getFotoTempatWisata,
  getKalender,
  getKomentars,
  getLabel,
  getMisi,
  getOneDusun,
  getPelayananById,
  getPelayananLengkap,
  getProfil,
  getProfilDesa,
  getTempatWisata,
  getUmkmById,
  getUmkmFoto,
  getUmkmList,
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
  postKontakUmkm,
  postLabel,
  postMisi,
  postPelayanan,
  postSyaratPelayanan,
  postUmkm,
  postVisi,
  postWisata,
} from "./handlers/post.ts";
import { patchDusun, patchProfil, patchUmkm } from "./handlers/patch.ts";
import type { Next } from "@oak/oak/middleware";
import {
  deleteAparatur,
  deleteArtikel,
  deleteDusun,
  deleteKomentar,
  deleteLabel,
  deleteLampiranApbdes,
  deleteMisi,
  deletePelayanan,
  deleteSyaratPelayanan,
  deleteTempatWisata,
  deleteUmkm,
  deleteVisi,
} from "./handlers/delete.ts";
import { requireAuth } from "./middlewares/requireAuth.ts";
import { pool } from "./dbpool.ts";

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
const wisata = new Router();
const umkm = new Router();
const pelayanan = new Router();
const syarat = new Router();

root
  .get("/", (ctx: RouterContext<"/">) => {
    ctx.response.status = 200;
    ctx.response.body = `Healthy (pool available: ${pool.size})`;
  })
  .get("/verifikasi", verifyJwt);

syarat
  .delete("/:id", requireAuth, deleteSyaratPelayanan);

pelayanan
  .get("/lengkap", getPelayananLengkap)
  .post("/:id/syarat", requireAuth, postSyaratPelayanan)
  .get("/:id", getPelayananById)
  .delete("/:id", requireAuth, deletePelayanan)
  .post("/", requireAuth, postPelayanan);

umkm
  .get("/foto/:id", getUmkmFoto)
  .get("/:id", getUmkmById)
  .post("/:id", requireAuth, postKontakUmkm)
  .delete("/:id", requireAuth, deleteUmkm)
  .patch("/:id", requireAuth, patchUmkm)
  .post("/", requireAuth, postUmkm)
  .get("/", getUmkmList);

wisata
  .get("/:id", getFotoTempatWisata)
  .delete("/:id", requireAuth, deleteTempatWisata)
  .get("/", getTempatWisata)
  .post("/", requireAuth, postWisata);

komentar
  .delete("/:id", requireAuth, deleteKomentar)
  .get("/", getKomentars)
  .post("/", postKomentar);

artikel
  .get("/lampiran/:id", getArtikelLampiran)
  .get("/thumbnail/:id", thumbnail)
  .get("/terbaru", getArtikelTerbaru)
  .get("/:id", getArtikelById)
  .delete("/:id", requireAuth, deleteArtikel)
  .post("/", requireAuth, postArtikel)
  .get("/", getArtikels);

label
  .delete("/:id", requireAuth, deleteLabel)
  .get("/", getLabel)
  .post("/", requireAuth, postLabel);

apbdes
  .get("/file/:id", getApbdesFile)
  .delete("/:id", requireAuth, deleteLampiranApbdes)
  .get("/:year", getApbdesAtYear)
  .post("/:year", requireAuth, postApbdesFileAtYear);

misi
  .delete("/:id", requireAuth, deleteMisi)
  .get("/", getMisi)
  .post("/", requireAuth, postMisi);

visi
  .delete("/:id", requireAuth, deleteVisi)
  .get("/", getVisi)
  .post("/", requireAuth, postVisi);

aparatur
  .get("/foto/:id", fotoAparaturDesa)
  .delete("/:id", requireAuth, deleteAparatur)
  .post("/login", requestJwtAparatur)
  .post("/", requireAuth, postAparatur)
  .get("/", aparaturDesa);

profil
  .get("/deskripsi", deskripsiSekilas)
  .get("/data", getProfilDesa)
  .get("/peta", petaDesa)
  .get("/kalender", getKalender)
  .patch("/", requireAuth, patchProfil)
  .get("/", getProfil);

dusun
  .get("/nama", namaDusun)
  .get("/:id", getOneDusun)
  .patch("/:id", requireAuth, patchDusun)
  .delete("/:id", requireAuth, deleteDusun)
  .post("/", requireAuth, postDusun)
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
  .use("/komentar", komentar.routes(), komentar.allowedMethods())
  .use("/wisata", wisata.routes(), wisata.allowedMethods())
  .use("/umkm", umkm.routes(), umkm.allowedMethods())
  .use("/pelayanan", pelayanan.routes(), pelayanan.allowedMethods())
  .use("/syarat", syarat.routes(), syarat.allowedMethods());

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
