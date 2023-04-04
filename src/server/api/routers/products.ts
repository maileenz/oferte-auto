import { FuelType, MediaType, TransmissionType } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const productsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx: { prisma } }) => {
    const products = await prisma.product
      .findMany({
        select: {
          id: true,
          description: true,
          model: true,
          year: true,
          engineSize: true,
          mileage: true,
          fuel: true,
          transmission: true,
          price: true,
          createdAt: true,
          updatedAt: true,
          make: {
            select: {
              name: true,
            },
          },
          media: {
            select: {
              url: true,
              hash: true,
              type: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      })
      .then((res) =>
        res.map(({ make: { name }, ...rest }) => ({
          ...rest,
          make: name,
        }))
      );

    return {
      products,
    };
  }),

  get: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx: { prisma } }) => {
      const product = await prisma.product
        .findFirstOrThrow({
          select: {
            id: true,
            description: true,
            model: true,
            year: true,
            engineSize: true,
            mileage: true,
            fuel: true,
            transmission: true,
            price: true,
            createdAt: true,
            updatedAt: true,
            make: {
              select: {
                name: true,
              },
            },
            media: {
              select: {
                url: true,
                hash: true,
                type: true,
              },
            },
          },
          where: {
            id: input,
          },
        })
        .then(({ make: { name }, ...rest }) => ({
          ...rest,
          make: name,
        }));

      return {
        product,
      };
    }),

  create: protectedProcedure
    .input(
      z.object({
        description: z.string(),
        make: z.string(),
        model: z.string(),
        year: z.string(),
        engineSize: z.string(),
        mileage: z.string(),
        fuel: z.nativeEnum(FuelType),
        transmission: z.nativeEnum(TransmissionType),
        price: z.string(),
        media: z.array(
          z.object({
            url: z.string(),
            hash: z.string().nullable(),
            type: z.nativeEnum(MediaType),
          })
        ),
      })
    )
    .mutation(
      async ({
        input: {
          description,
          make,
          model,
          year,
          engineSize,
          mileage,
          fuel,
          transmission,
          price,
          media,
        },
        ctx: { prisma, authId },
      }) => {
        await prisma.product.create({
          data: {
            description,
            model,
            year,
            engineSize,
            mileage,
            fuel,
            transmission,
            price,
            user: {
              connect: {
                id: authId,
              },
            },
            media: {
              createMany: {
                data: media,
              },
            },
            make: {
              connectOrCreate: {
                create: {
                  name: make,
                },
                where: {
                  name: make,
                },
              },
            },
          },
        });
      }
    ),
});
