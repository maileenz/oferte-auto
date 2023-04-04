import { type FC } from "react";
import { BsEye, BsPen, BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";

export const Table: FC = () => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Media</th>
            <th className="w-full">Product</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <td>
              <button className="btn-ghost btn-square btn-sm btn">
                <BsEye className="h-6 w-6" />
              </button>
            </td>
            <td className="w-full">
              <div className="font-bold">Mercedes-Benz</div>
              <div className="text-sm opacity-50">CLK63 (2020)</div>
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
                    if (result.isConfirmed) {
                      void Swal.fire(
                        "Deleted!",
                        "The product has been deleted.",
                        "success"
                      );
                    }
                  });
                }}
              >
                <BsTrash className="h-6 w-6" />
              </button>
            </th>
          </tr>
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th>Media</th>
            <th>Product</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
