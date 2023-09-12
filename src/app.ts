import "@kitajs/html/htmx";

import html from "@elysiajs/html";
import { Elysia } from "elysia";
import { autoroutes } from "elysia-autoroutes";
import cookie from "@elysiajs/cookie";

const app = new Elysia()
  .use(autoroutes({ routesDir: "./routes" }))
  .use(cookie())
  .use(html())
  .get("/styles.css", () => Bun.file("./static/styles.css"))
  .get("/bundle.js", () => Bun.file("./static/bundle.js"))
  .get("/favicon.ico", () => Bun.file("./static/favicon.ico"))
  .listen(3000);

export type ElysiaApp = typeof app;
export type GetHandler = Parameters<typeof app.get>[1];
export type PostHandler = Parameters<typeof app.post>[1];
export type PutHandler = Parameters<typeof app.put>[1];
export type DelHandler = Parameters<typeof app.delete>[1];

export type GetContext = Parameters<GetHandler>[0];
export type PostContext = Parameters<PostHandler>[0];
export type DelContext = Parameters<DelHandler>[0];
export type PutContext = Parameters<PutHandler>[0];

export type GetResponseType = ReturnType<GetHandler>;
export type PostResponseType = ReturnType<PostHandler>;
export type DelResponseType = ReturnType<DelHandler>;
export type PutResponseType = ReturnType<PutHandler>;

export type ResponseType =
  | GetResponseType
  | PostResponseType
  | DelContext
  | PutResponseType;

export type Context = GetContext | PostContext | DelContext | PutContext;
