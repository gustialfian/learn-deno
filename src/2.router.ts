import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const books = new Map<string, any>();
books.set("1", {
  id: "1",
  title: "The Hound of the Baskervilles",
  author: "Conan Doyle, Author",
});

const router = new Router();
router
  .get("/", (context) => {
    console.log('returning a response ...');
    context.response.body = "Hello world!";
  })
  .get("/book", (context) => {
    context.response.body = Array.from(books.values());
  })
  .get("/book/:id", (context) => {
    if (context.params && context.params.id && books.has(context.params.id)) {
      context.response.body = books.get(context.params.id);
    }
  });

const 

const app = new Application();
app.use(async (ctx, next) => {
  await next();
  console.log(`HTTP ${ctx.request.method} on ${ctx.request.url}`);
  ctx.response.body = 'Hello Deno';
});
app.use(router.routes());
app.use(router.allowedMethods());

const port = 3000;
app.addEventListener('listen', () => {
  console.log(`Listening on localhost:${port}`);
});

await app.listen({ port });