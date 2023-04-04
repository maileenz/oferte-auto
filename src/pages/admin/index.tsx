import { type NextPage } from "next";
import Head from "next/head";
import { env } from "~/env.mjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { withSessionSsr } from "~/server/session";

const Admin: NextPage = () => {
  const router = useRouter();

  const login = api.admin.login.useMutation({
    onSuccess() {
      void router.push("/admin/products");
    },
  });

  const schema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>({
    resolver: zodResolver(schema),
  });

  const submitForm = async (data: { email: string; password: string }) => {
    await login.mutateAsync(data);
  };

  return (
    <>
      <Head>
        <title>{"Admin " + env.NEXT_PUBLIC_SITE_NAME}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="card bg-white">
        <form className="card-body" onSubmit={void handleSubmit(submitForm)}>
          <h2 className="card-title">Log in</h2>
          <input
            type="email"
            placeholder="Type email"
            className="input-bordered input w-full"
            {...register("email")}
          />
          <input
            type="password"
            placeholder="Type password"
            className="input-bordered input w-full"
            {...register("password")}
          />
          <button className="btn-success btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export const getServerSideProps = withSessionSsr(({ req }) => {
  const { authId } = req.session;

  if (authId) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin/products",
      },
    };
  }

  return {
    props: {},
  };
});

export default Admin;
