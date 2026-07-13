import { Application } from "@oak/oak/application";
import { Router } from "@oak/oak/router";
import * as handlers from "./handlers.ts";

const port = 8000;

const app = new Application();

const root = new Router()
  .get("/", handlers.healthCheck);

app
  .use(root.routes())
  .use(root.allowedMethods());

if (import.meta.main) {
  await app.listen({ port });
}
