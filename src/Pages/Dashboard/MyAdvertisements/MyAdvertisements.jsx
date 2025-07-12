import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";


const MyAdvertisements = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [ads, setAds] = useState([]);
  const [editingAd, setEditingAd] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { data: advertisements = [], refetch } = useQuery({
        queryKey: ['my-advertisements', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/advertisements?email=${user?.email}`);
            return res.data;
        }
    })


  const openEditModal = (ad) => {
    setEditingAd(ad);
    setValue("title", ad.title);
    setValue("description", ad.description);
    setValue("image", ad.image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    reset();
    setIsModalOpen(false);
    setEditingAd(null);
  };

  const onSubmit = (data) => {
    axiosSecure.patch(`/advertisement/${editingAd._id}`, data)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Advertisement updated successfully!");
          const updated = ads.map((ad) =>
            ad._id === editingAd._id ? { ...ad, ...data } : ad
          );
          setAds(updated);
          closeModal();
        }
      })
      .catch(() => toast.error("Failed to update advertisement."));
  };

  const handleDelete = async (advertisementId) => {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this advertisement!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });
  
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/advertisement/${advertisementId}`)
           toast.success("advertisement deleted successfully");
           refetch();
        } catch {
          toast.error("Failed to delete advertisement");
        }
      }
    };

  return (
    <div className="p-4 md:p-10 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#00B795]">
        My Advertisements
      </h2>

      <div className="overflow-x-auto rounded-md shadow-md">
        <table className="table w-full text-md font-semibold">
          <thead className="bg-[#00B795] text-white text-[18px]">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {advertisements.map((ad) => (
              <tr key={ad._id} className="hover even:bg-gray-50 odd:bg-white">
                <td>{ad.title}</td>
                <td>{ad.description}</td>
                <td>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
                    {ad.status}
                  </span>
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() => openEditModal(ad)}
                    className="bg-[#00B795] hover:bg-[#22A587] px-4 py-1 text-sm font-bold text-white rounded-md"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(ad._id)}
                    className="rounded-md bg-red-500  hover:bg-red-600 text-sm px-4 py-1 font-bold text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-[#00B795]">Edit Advertisement</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block font-medium">Ad Title</label>
                <input
                  {...register("title", { required: "Title is required" })}
                  className="w-full px-3 py-2 border rounded"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
              </div>
              <div>
                <label className="block font-medium">Short Description</label>
                <textarea
                  {...register("description", { required: "Description is required" })}
                  className="w-full px-3 py-2 border rounded"
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
              </div>
              <div>
                <label className="block font-medium">Image URL</label>
                <input
                  {...register("image", { required: "Image is required" })}
                  className="w-full px-3 py-2 border rounded"
                />
                {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
              </div>

              <div className="flex justify-end gap-2">
                <button type="submit" className="btn bg-[#00B795] text-white">Update</button>
                <button onClick={closeModal} type="button" className="btn bg-gray-300">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAdvertisements;