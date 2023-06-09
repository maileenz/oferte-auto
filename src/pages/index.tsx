import { type inferAsyncReturnType } from "@trpc/server";
import { type NextPage } from "next";
import Head from "next/head";
import { CarCard } from "~/components/car-card";
import { SearchInput } from "~/components/search-input";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
//import { api } from "~/utils/api";

const Home: NextPage<Props> = ({ products }) => {
  //const { data } = api.products.getAll.useQuery();

  return (
    <>
      <Head>
        <title>{env.NEXT_PUBLIC_SITE_NAME}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchInput />
      {products.map((product) => (
        <CarCard value={product} key={product.id} />
      ))}
    </>
  );
};

export const getServerSideProps = async () => {
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
      take: 5,
    })
    .then((res) =>
      res.map(({ make: { name }, ...rest }) => ({
        ...rest,
        make: name,
      }))
    );

  return { props: { products } };
};

type Props = inferAsyncReturnType<typeof getServerSideProps>["props"];

export default Home;
