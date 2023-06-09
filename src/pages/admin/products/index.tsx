import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { BsChevronLeft, BsEye, BsPen, BsPlus, BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";
import { env } from "~/env.mjs";
import { withSessionSsr } from "~/server/session";
import { api } from "~/utils/api";

const Products: NextPage = () => {
  const { data } = api.products.getAll.useQuery();

  const util = api.useContext();

  const remove = api.products.remove.useMutation({
    onSuccess() {
      void util.products.getAll.invalidate();
      void Swal.fire("Deleted!", "The product has been deleted.", "success");
    },
  });

  return (
    <>
      <Head>
        <title>{"Products " + env.NEXT_PUBLIC_SITE_NAME}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <Link href="/admin/products/create" className="btn gap-2">
            <BsPlus className="h-6 w-6" />
            Create
          </Link>
          <div className="btn-group">
            <button className="btn-outline btn">
              <BsChevronLeft className="h-4 w-4" />
            </button>
            <button className="btn">Next page</button>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Media</th>
                <th className="w-full">Product</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.products.map(({ id, make, model, year }) => (
                <tr key={id}>
                  <td>
                    <button className="btn-ghost btn-square btn-sm btn">
                      <BsEye className="h-6 w-6" />
                    </button>
                  </td>
                  <td className="w-full">
                    <div className="font-bold">{make}</div>
                    <div className="text-sm opacity-50">
                      {model} ({year})
                    </div>
                  </td>
                  <th>
                    <button className="btn-ghost btn-square btn-sm btn mr-2">
                      <BsPen className="h-6 w-6" />
                    </button>
                    <button
                      className="btn-ghost btn-square btn-sm btn hover:text-red-600"
                      onClick={() => {
                        void Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) remove.mutate(id);
                        });
                      }}
                    >
                      <BsTrash className="h-6 w-6" />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Media</th>
                <th className="w-full">Product</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = withSessionSsr(({ req }) => {
  const { authId } = req.session;

  if (!authId) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin",
      },
    };
  }

  return {
    props: {},
  };
});

export default Products;
