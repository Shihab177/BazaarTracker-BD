import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useNavigate } from "react-router";
import useAuth from "../../../hook/useAuth";

const AddAdvertisement = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [profilePic, setProfilePic] = useState();
  const [imgloading, setImgLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    data.image = profilePic;
    data.status = "Pending";
    (data.vendorEmail = user?.email),
      (data.vendorName = user?.displayName),
      axiosSecure
        .post("/add-advertisement", data)
        .then((res) => {
          if (res.data.insertedId) {
            toast.success("advertisement added successfully!");
            navigate("/dashboard/my-ads");
            reset();
          }
        })
        .catch(() => {
          toast.error("Failed to add advertisement.");
        });
  };

  const handelImageUpload = async (e) => {
    const image = e.target.files[0];
    setImgLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_UPLOAD_KEY
    }`;
    const res = await axios.post(imageUploadUrl, formData);
    console.log(res);
    setImgLoading(false);
    setProfilePic(res.data.data.url);
  };

  return (
    <div className="w-5xl my-10 mx-auto p-8 bg-white border border-gray-300 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Create Advertisement
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Ad Title */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="adTitle">
            Ad Title <span className="text-red-500">*</span>
          </label>
          <input
            id="adTitle"
            type="text"
            {...register("title", { required: "Ad Title is required" })}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B795] ${
              errors.adTitle ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter ad title"
          />
          {errors.adTitle && (
            <p className="text-red-500 text-sm mt-1">
              {errors.adTitle.message}
            </p>
          )}
        </div>

        {/* Short Description */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="shortDescription">
            Short Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="shortDescription"
            rows={4}
            {...register("description", {
              required: "Short Description is required",
              maxLength: {
                value: 200,
                message: "Description cannot exceed 200 characters",
              },
            })}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B795] ${
              errors.shortDescription ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Write a brief description"
          ></textarea>
          {errors.shortDescription && (
            <p className="text-red-500 text-sm mt-1">
              {errors.shortDescription.message}
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
            {...register("image", { required: "Image is required" })}
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
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
          {imgloading && <p>loading...</p>}
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="status">
            Status
          </label>
          <input
            id="status"
            type="text"
            value="Pending"
            readOnly
            className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={imgloading}
            className="px-8 py-3 bg-[#00B795] hover:bg-[#22A587] text-white font-semibold rounded-md transition"
          >
            Submit Advertisement
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdvertisement;
