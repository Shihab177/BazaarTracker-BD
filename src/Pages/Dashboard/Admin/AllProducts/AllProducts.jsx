import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import { toast } from "react-toastify";

import { MdShoppingBasket } from "react-icons/md";
import useAxiosSecure from "../../../../hook/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../../Shared/Loading/Loading";
import useAuth from "../../../../hook/useAuth";

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const {user}=useAuth()
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-products?email=${user?.email}`);
      return res.data;
    },
    enabled:!!user?.email
  });

  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/products/${id}/status`, { status: "approved" });
      toast.success(" Product approved");
      queryClient.invalidateQueries(["all-products"]);
    } catch {
      toast.error(" Failed to approve");
    }
  };

  const handleReject = async () => {
    try {
      await axiosSecure.patch(`/products/${selectedProductId}/status`, {
        status: "rejected",
        feedback: rejectionReason,
      });
      toast.success("Product rejected");
      setRejectionReason("");
      queryClient.invalidateQueries(["all-products"]);
    } catch {
      toast.error("Failed to reject");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      await axiosSecure.delete(`/admin-product/${id}`);
      toast.success(" Product deleted");
      queryClient.invalidateQueries(["all-products"]);
    } catch {
      toast.error(" Failed to delete");
    }
  }
  };

  if (isLoading){
    return <Loading></Loading>
  }
   

  return (
    <div className="p-6">
      <h1 className="md:text-3xl text-2xl text-center lg:text-left font-bold mb-6">
         All Products
      </h1>

      <div className="overflow-x-auto w-full rounded-md">
        <table className="table min-w-[800px] table-zebra w-full text-md">
          <thead className="bg-[#00B795] text-white text-[18px]">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Vendor</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
         
          <tbody>
           { products.length === 0 && <tr>
           <td colSpan="6" className="text-center py-6">
        <span className="text-2xl font-semibold"> No product available</span>
      </td>
    </tr>
           }
            {products.map((product, i) => (
              <tr key={product._id}>
                <td>{i + 1}</td>
                <td>{product.itemName}</td>
                <td>{product.vendorName}</td>
                <td className="capitalize">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      product.status === "approved"
                       ? "bg-green-100 text-green-700"
                        : product.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700 "
                    }`}
                  >
                    {product.status}
                  </span>
                  </td>
                <td className="space-x-2 text-center">
                  {product.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(product._id)}
                        className="btn btn-success btn-sm text-white"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                         
                         setSelectedProductId(product._id);
                          document.getElementById("reject_modal").showModal();
                        }}
                        className="btn btn-error btn-sm text-white"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <Link
                    to={`/dashboard/admin-updateProduct/${product._id}`}
                    className="btn btn-warning btn-sm text-white"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-outline btn-sm bg-red-500 hover:bg-red-600 border-none text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DaisyUI Reject Modal */}
      <dialog id="reject_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2">🛑 Reject Product</h3>
          <p className="mb-2 text-gray-600">Write rejection reason or feedback:</p>
          <textarea
            className="textarea focus:outline-none focus:ring-2 focus:ring-[#00B795] focus:border-none w-full"
            placeholder="Write rejection reason"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
          ></textarea>
          <div className="modal-action">
            <div className="space-x-2">
              <button
                className="btn bg-red-500 text-white"
                onClick={() => {
                  document.getElementById("reject_modal").close();
                  setRejectionReason("");
                }}
              >
                Cancel
              </button>
              <button
                className={`btn bg-[#00B795] text-white ${!rejectionReason.trim() && "btn-disabled"}`}
                onClick={() => {
                  handleReject();
                  document.getElementById("reject_modal").close();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllProducts;
