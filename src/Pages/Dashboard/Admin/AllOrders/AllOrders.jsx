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
    <div className="p-5 w-6xl my-10 mx-auto border border-gray-300 shadow-md rounded-md">
      <h1 className="text-3xl text-center text-black font-semibold mb-6 flex items-center gap-3 justify-center">
         All Orders
      </h1>

      {isLoading ? (
        <p>Loading orders...</p>
      ) : isError ? (
        <p className="text-red-600">Error fetching orders.</p>
      ) : orders.length === 0 ? (
        <p className="text-2xl text-center font-semibold">No orders found.</p>
      ) : (
        <div className="overflow-x-auto rounded-md">
          <table className="table table-zebra text-md font-semibold w-full">
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
