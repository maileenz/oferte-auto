import { type NextPage } from "next";
import Head from "next/head";
import { CarCard } from "~/components/car-card";

const Car: NextPage = () => {
  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center">
        <div className="flex w-full max-w-xl flex-col gap-6">///PRODUS</div>
      </main>
    </>
  );
};

export default Car;