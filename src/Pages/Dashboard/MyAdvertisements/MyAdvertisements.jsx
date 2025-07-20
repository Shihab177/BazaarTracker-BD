import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";
import Loading from "../../../Shared/Loading/Loading";

const MyAdvertisements = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editingAd, setEditingAd] = useState(null);
const [profilePic, setProfilePic] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { data: advertisements = [], refetch,isLoading } = useQuery({
    queryKey: ["my-advertisements", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/advertisements?email=${user?.email}`);
      return res.data;
    },
  });
  
  const openEditModal = (ad) => {
    setEditingAd(ad);
    setProfilePic(ad.image)
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

  const onSubmit = async (data) => {
   
    data.image=profilePic
     console.log(data)
   
    try {
      const res = await axiosSecure.patch(
        `/advertisement/${editingAd._id}`,
        data
      );
      if (res.data.modifiedCount > 0) {
        toast.success("Advertisement updated successfully!");
        refetch();
        closeModal();
      }
    } catch {
      toast.error("Failed to update advertisement.");
    }
  };

  const handleDelete = async (advertisementId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this advertisement!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/advertisement/${advertisementId}`);
        toast.success("Advertisement deleted successfully");
        refetch();
      } catch {
        toast.error("Failed to delete advertisement");
      }
    }
  };
  const handelImageUpload = async (e) => {
    const image = e.target.files[0];

    const formData = new FormData();
    formData.append("image", image);
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_UPLOAD_KEY
    }`;
    const res = await axios.post(imageUploadUrl, formData);
    setProfilePic(res.data.data.url);
  };
  if(isLoading){
    return <Loading></Loading>
  }

  return (
    <div className="pb-4 px-4 w-6xl mx-auto border rounded-xl shadow-md border-gray-300 my-10 ">
      <h2 className="text-3xl font-bold text-center my-8">
        My Advertisements
      </h2>

      <div className="overflow-x-auto rounded-md ">
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
            {advertisements.length === 0 &&  <tr>
      <td colSpan="6" className="text-center py-6">
        <span className="text-2xl font-semibold">You haven't added any advertisements yet</span>
      </td>
    </tr> }
            {advertisements.map((ad) => (
              <tr key={ad._id} className="hover even:bg-gray-50 odd:bg-white">
                <td>{ad.title}</td>
                <td>{ad.description}</td>
                <td>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
                    {ad.status}
                  </span>
                </td>
                <td className="space-x-2 flex">
                  <button
                    htmlFor="edit_ad_modal"
                    onClick={() => openEditModal(ad)}
                    className="bg-[#00B795] hover:bg-[#22A587] px-4 py-2 text-sm font-bold text-white rounded-md cursor-pointer"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(ad._id)}
                    className="rounded-md bg-red-500 hover:bg-red-600 text-sm px-4 py-2 font-bold text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DaisyUI Modal */}
      <input
        type="checkbox"
        id="edit_ad_modal"
        className="modal-toggle"
        checked={isModalOpen}
        readOnly
      />
      <div className="modal">
        <div className="modal-box w-full max-w-lg">
          <h3 className="text-xl font-bold mb-4 text-[#00B795]">
            Edit Advertisement
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block font-medium">Ad Title</label>
              <input
                {...register("title", { required: "Title is required" })}
                className="w-full px-3 py-2 border focus:ring-1 focus:outline-none focus:ring-[#00B795] border-gray-400 rounded"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium">Short Description</label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                className="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-[#00B795] border-gray-400 rounded"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block mb-1 font-medium" htmlFor="image">
                Upload Image <span className="text-red-500">*</span>
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handelImageUpload}
                className={`w-full text-sm text-gray-700
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-[#00B795] file:text-white
              hover:file:bg-[#22A587]
              cursor-pointer
              rounded-md
              border ${errors.image ? "border-red-500" : "border-gray-300"}`}
              />

              {/* Info message */}
              <p className="text-sm text-gray-900 mt-2 font-semibold">
                Current image is shown below. Uploading a new file will replace
                it.
              </p>
              {/* Image Preview */}
              {editingAd?.image && (
                <img
                  src={profilePic}
                  alt="Advertisement Preview"
                  className="mt-3 rounded-lg w-full max-h-52 object-cover border border-gray-400"
                />
              )}
            </div>

            <div className="modal-action">
              <button type="submit" className="btn bg-[#00B795] text-white">
                Update
              </button>
              <label
                htmlFor="edit_ad_modal"
                className="btn"
                onClick={closeModal}
              >
                Cancel
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyAdvertisements;
