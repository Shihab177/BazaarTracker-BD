import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link } from "react-router";
import useAuth from "../../../../hook/useAuth";
import useAxiosSecure from "../../../../hook/useAxiosSecure";
import Loading from "../../../../Shared/Loading/Loading";


const ManageWatchlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: watchlist = [], isLoading } = useQuery({
    queryKey: ["watchlist", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/watchlist?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const removeMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/watchlist/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["watchlist", user?.email]);
      toast.success("Removed from watchlist!");
    },
    onError: () => {
      toast.error("Failed to remove item!");
    },
  });

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this item from your watchlist.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00B795",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeMutation.mutate(id);
      }
    });
  };

  if (isLoading){
    return <Loading></Loading>
  }

  return (
    <div className="m-6  rounded-md ">
      <h2 className="md:text-3xl text-2xl text-center lg:text-left font-bold mb-6">
         Manage Watchlist
      </h2>

     
        <div className="overflow-x-auto w-full rounded-md">
          <table className="table min-w-[800px] table-zebra w-full text-md font-semibold">
            <thead className="bg-[#00B795] text-white text-[18px]">
              <tr>
                <th>Product Name</th>
                <th>Market Name</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                 watchlist.length === 0 &&
                 <tr>
                  <td colSpan={4} className="text-center">
                      <p className=" text-gray-900 text-2xl">
                          You have no items in your watchlist.
                     </p>
                  </td>
                 </tr>
        
      
              }
              {watchlist.map((item, idx) => (
                <tr key={item._id} className="border-b border-gray-300">
                  <td className="px-6 py-4">{item.productName}</td>
                  <td className="px-6 py-4">{item.marketName}</td>
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4 space-x-3">
                    <Link
                      to="/AllProduct"
                      className="inline-block px-4 py-1 rounded text-green-700 bg-green-100 hover:bg-green-200 transition"
                    >
                      Add More
                    </Link>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="inline-block px-4 py-1 rounded text-red-700 bg-red-100 hover:bg-red-200 transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
    </div>
  );
};

export default ManageWatchlist;
