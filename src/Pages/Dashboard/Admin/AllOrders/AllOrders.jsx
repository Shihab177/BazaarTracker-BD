import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hook/useAxiosSecure";
import { MdShoppingCart } from "react-icons/md";
import Loading from "../../../../Shared/Loading/Loading";

const AllOrders = () => {
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ["allOrders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");
      return res.data;
    },
  });
  if(isLoading){
    return <Loading></Loading>
  }

  return (
    <div className="p-6 text-gray-800">
      <h1 className="md:text-3xl text-2xl text-center lg:text-left font-bold mb-6">
         All Orders
      </h1>

      {isLoading ? (
        <p>Loading orders...</p>
      ) : isError ? (
        <p className="text-red-600">Error fetching orders.</p>
      ) : orders.length === 0 ? (
        <p className="text-2xl md:text-3xl text-center font-semibold">No orders found.</p>
      ) : (
        <div className="overflow-x-auto w-full rounded-md">
          <table className="table custom-zebra text-md mx-auto font-semibold max-w-full">
            <thead className="bg-[#00B795] text-white text-[18px]">
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Market</th>
                <th>Price</th>
                <th>User Email</th>
                <th>Transaction ID</th>
                <th>Paid At</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr className="border-b border-gray-300 even:bg-gray-50 odd:bg-white text-sm" key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.productName}</td>
                  <td>{order.marketName}</td>
                  <td>৳ {order.pricePerUnit}</td>
                  <td>{order.userEmail}</td>
                  <td className="break-all">{order.transactionId}</td>
                  <td>{new Date(order.paidAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
