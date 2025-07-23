import React from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hook/useAxiosSecure";
import Loading from "../../../../Shared/Loading/Loading";
import { RiAdvertisementLine } from "react-icons/ri";

const AllAdvertisements = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: ads = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["all-advertisement"],
    queryFn: async () => {
      const res = await axiosSecure.get("/advertisements-admin");
      return res.data;
    },
  });

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/ads/status/${id}`, { status });
      if (res.data.modifiedCount > 0) {
        toast.success(`Advertisement ${status} successfully`);
        refetch();
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This ad will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/admin-advertisement/${id}`);
        if (res.data.deletedCount > 0) {
          toast.success("Ad deleted successfully");
          refetch();
        }
      } catch {
        toast.error("Failed to delete advertisement");
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="mx-auto my-10 border border-gray-300  max-w-6xl px-4 pb-4 rounded-xl shadow-md">
       <h1 className="md:text-3xl text-2xl text-center  text-black font-semibold mb-6 flex items-center gap-3 mt-5 justify-center">All Advertisements</h1>
      <div className="overflow-x-auto w-full  rounded-md">
        <table className="min-w-[800px] text-left">
          <thead className="bg-[#00B795] text-white text-sm">
            <tr>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr
                key={ad._id}
                className="border-b border-gray-300 even:bg-gray-50 odd:bg-white text-sm"
              >
                <td className="px-4 py-3 font-medium">{ad.title}</td>
                <td className="px-4 py-3">{ad.description}</td>
                <td className="px-4 py-3">
                  <img src={ad.image} alt="Ad" className="w-16 h-12 object-cover rounded" />
                </td>
                <td className="px-4 py-3 capitalize">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      ad.status === "approved"
                       ? "bg-green-100 text-green-700"
                        : ad.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700 "
                    }`}
                  >
                    {ad.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex justify-center items-center gap-2">
                  {ad.status !== "approved" && (
                    <button
                      onClick={() => handleStatusChange(ad._id, "approved")}
                      className="btn btn-success btn-sm text-white"
                    >
                      Approve
                    </button>
                  )}
                  {ad.status !== "rejected" && (
                    <button
                      onClick={() => handleStatusChange(ad._id, "rejected")}
                      className="btn btn-error btn-sm text-white"
                    >
                      Reject
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(ad._id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded font-semibold text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {ads.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-2xl py-6 text-gray-900">
                  No advertisements found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAdvertisements;
