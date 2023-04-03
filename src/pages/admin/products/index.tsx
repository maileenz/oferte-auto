import { type NextPage } from "next";
import Head from "next/head";
import { env } from "~/env.mjs";

const Products: NextPage = () => {
  return (
    <>
      <Head>
        <title>Products {env.NEXT_PUBLIC_SITE_NAME}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

export default Products;