import { FuelType, MediaType, TransmissionType } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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

  create: publicProcedure
    .input(
      z.object({
        description: z.string(),
        make: z.string(),
        model: z.string(),
        year: z.number(),
        engineSize: z.number(),
        mileage: z.number(),
        fuel: z.nativeEnum(FuelType),
        transmission: z.nativeEnum(TransmissionType),
        price: z.number(),
        media: z.array(
          z.object({
            url: z.string(),
            hash: z.string(),
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
        ctx: { prisma },
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
