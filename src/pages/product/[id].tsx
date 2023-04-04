import { type inferAsyncReturnType } from "@trpc/server";
import { type NextPage } from "next";
import Head from "next/head";
import { useRef } from "react";
import { CarCard } from "~/components/car-card";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";

const Car: NextPage<Props> = ({ product }) => {
  const { year, make, model } = product;

  const { data } = api.products.getAll.useQuery();

  const pageTitle = useRef(
    `${year} ${make} ${model} - ${env.NEXT_PUBLIC_SITE_NAME}`
  );

  return (
    <>
      <Head>
        <title>{pageTitle.current}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CarCard value={product} />
      <div className="text-lg font-semibold">Mai multe sugestii</div>
      {data?.products.map((item) => (
        <CarCard key={item.id} value={item} />
      ))}
    </>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id?: string };
}) => {
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
        id,
      },
    })
    .then(({ make: { name }, ...rest }) => ({
      ...rest,
      make: name,
    }));

  return { props: { product } };
};

export type Props = inferAsyncReturnType<typeof getServerSideProps>["props"];

export default Car;
