import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { compare } from "bcrypt";

export const adminRouter = createTRPCRouter({
  get: protectedProcedure.query(
    async ({ ctx: { prisma, authId } }) =>
      await prisma.user.findUnique({
        where: {
          id: authId,
        },
      })
  ),
  login: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(
      async ({ input: { email, password }, ctx: { prisma, session } }) => {
        const { id, hash } = await prisma.user.findUniqueOrThrow({
          where: {
            email,
          },
        });

        const validHash = await compare(password, hash);

        if (!validHash) throw new Error("User not found");

        session.authId = id;

        await session.save();
      }
    ),
  logout: protectedProcedure.mutation(({ ctx: { session } }) => {
    session.destroy();
  }),
});
