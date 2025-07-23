import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../../hook/useAxiosSecure";

import useAuth from "../../../../hook/useAuth";
import Loading from "../../../../Shared/Loading/Loading";

const MyOrderList = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const userEmail = user?.email;

  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders", userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-orders?email=${userEmail}`);
      return res.data;
    },
    enabled: !!userEmail,
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError) {
    return <p className="text-center text-red-600 mt-10"> order not found</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-5 my-10 bg-white border-t border-gray-300 rounded-md shadow-md">
      <h2 className="md:text-3xl text-2xl font-semibold mb-6 text-center text-black">
        My Order List
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 text-xl">
          You have no orders yet.
        </p>
      ) : (
        <div className="overflow-x-auto w-full rounded-md">
          <table className="table  table-zebra min-w-[800px] text-md font-semibold border border-gray-300">
            <thead className="bg-[#00B795] text-white text-lg">
              <tr>
                <th className="px-6 py-3">Product Name</th>
                <th className="px-6 py-3">Market Name</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="">
                  <td className="px-6 py-4">{order.productName}</td>
                  <td className="px-6 py-4">{order.marketName}</td>
                  <td className="px-6 py-4">৳{order.pricePerUnit}</td>
                  <td className="px-6 py-4">
                    {new Date(order.paidAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() =>
                        navigate(`/product-details/${order.productId}`)
                      }
                      className="btn btn-sm bg-[#00B795] text-white hover:bg-[#01886a] transition"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrderList;
