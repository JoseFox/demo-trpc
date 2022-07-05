import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { prisma } from "src/db/client";

export const appRouter = trpc
  .router()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("posts", {
    async resolve() {
      const posts = await prisma.post.findMany({});
      return posts;
    },
  })
  .mutation("createPost", {
    input: z.object({ title: z.string(), content: z.string() }),
    async resolve({ input }) {
      await prisma.post.create({
        data: { title: input.title, content: input.content },
      });
    },
  });

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
