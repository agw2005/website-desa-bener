import { Application } from "@oak/oak/application";
import { Router } from "@oak/oak/router";
import * as handlers from "./handlers.ts";

const port = 8000;
const app = new Application();
const root = new Router();
const aparatur = new Router();

root
  .get("/", handlers.healthCheck)
  .get("/profil-sekilas", handlers.profilSekilas);

aparatur
  .post("/", handlers.postAparatur);

root
  .use("/aparatur", aparatur.routes(), aparatur.allowedMethods());

app
  .use(root.routes())
  .use(root.allowedMethods());

if (import.meta.main) {
  await app.listen({ port });
}
