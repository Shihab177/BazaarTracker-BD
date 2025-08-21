import React, { useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";

const MyProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [rejectedReason, setRejectedReason] = useState('');
  const {
    data: products = [],
    refetch,
    isLoading
  } = useQuery({
    queryKey: ["my-products", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (productId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/product/${productId}`);
        toast.success("Product deleted successfully");
        refetch();
      } catch {
        toast.error("Failed to delete product");
      }
    }
  };

  const handelRejected = (id) => {
     const selected = products.find(p => p._id === id);
  setRejectedReason(selected?.feedback || 'No feedback provided.');
  document.getElementById("rejected_modal").showModal();
  };

  if(isLoading){
    return <Loading></Loading>
  }

  return (
    <div className="p-6">
      <h2 className="md:text-3xl text-2xl text-center lg:text-left font-bold mb-6" >
        {" "}
        My Submitted Products
      </h2>

      <div className="overflow-x-auto w-full  rounded-md  border border-gray-100">
        <table className="w-full text-md mx-auto text-left border border-gray-200">
          <thead className="bg-[#00B795] text-[18px] text-white">
            <tr>
              <th className="px-4 py-3">Item Name</th>
              <th className="px-4 py-3">Price/Unit</th>
              <th className="px-4 py-3">Market</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 &&  <tr>
      <td colSpan="6" className="text-center py-6">
        <span className="text-2xl font-semibold">You haven't added any products yet</span>
      </td>
    </tr> }
            {products.map((product) => (
              <tr key={product._id} className=" even:bg-gray-50 odd:bg-white">
                <td className="px-4 py-3 font-medium">{product.itemName}</td>
                <td className="px-4 py-3">৳{product.pricePerUnit}</td>
                <td className="px-4 py-3">{product.marketName}</td>
                <td className="px-4 py-3">{product.date}</td>
                <td className="px-4 py-3">
                  <span
                    onClick={
                      product.status === "rejected"
                        ?()=> handelRejected(product._id)
                        : undefined
                    }
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      product.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : product.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700 px-2 py-1 cursor-pointer hover:bg-red-200"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex justify-center gap-2">
                  <Link to={`/dashboard/update-product/${product._id}`}>
                    <button className="bg-[#00B795] hover:bg-[#22A587] px-4 py-2 text-sm font-bold text-white rounded-md">
                      Update
                    </button>
                  </Link>
                  <button
                    className="rounded-md bg-red-500  hover:bg-red-600 text-sm px-4 py-2 font-bold text-white"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ MODAL goes here */}
      <dialog id="rejected_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-500 mb-3">
            🛑 Rejection Reason
          </h3>
          <p className="text-gray-700 mb-4">{rejectedReason}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn bg-gray-500 text-white hover:bg-gray-600">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyProducts;
