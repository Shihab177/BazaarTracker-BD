import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { toast } from "react-toastify";

import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hook/useAuth";
import useAxiosSecure from "../../../../hook/useAxiosSecure";
import useUserRole from "../../../../hook/useUserRole";


const  AdminUpdateProduct = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {role,roleLoading}=useUserRole()
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      prices: [],
    },
  });
  const { data = {}, refetch } = useQuery({
    queryKey: ["update-product", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin-product/${id}`);
      return res.data;
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "prices",
  });

  useEffect(() => {
    const correctDate = new Date(data.date + "T00:00:00");
    // Set all form values
    setValue("marketName", data.marketName);
    setValue("marketDescription", data.marketDescription);
    setValue("itemName", data.itemName);
    setValue("itemDescription", data.itemDescription || "");
    setValue("pricePerUnit", data.pricePerUnit);
    setValue("image", data.image);
    setValue("date", new Date(correctDate));

    // Replace price history cleanly (avoid duplication)
    if (Array.isArray(data.prices)) {
      const cleanedPrices = data.prices.map((p) => ({
        date: new Date(p.date + "T00:00:00"),
        price: p.price,
      }));
      replace(cleanedPrices);
    }
  }, [data, setValue, replace]);

  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      vendorEmail: data?.vendorEmail,
      date: format(data.date, "yyyy-MM-dd"),
      vendorName: data?.vendorName,
      updatedAt: new Date().toISOString().split("T")[0],
      pricePerUnit: Number(data.pricePerUnit),
      prices: data.prices.map((p) => ({
        date: format(p.date, "yyyy-MM-dd"),
        price: Number(p.price),
      })),
    };

    try {
      const res = await axiosSecure.patch(`/admin-product/${id}`, updatedData);
      if (res.data.modifiedCount > 0) {
        toast.success("Product updated successfully!");
       !roleLoading && role === 'admin' && navigate('/dashboard/all-products')
        
      !roleLoading && role === 'vendor' &&  navigate("/dashboard/my-products");
      }
    } catch {
      toast.error("Failed to update product.");
    }
  };

  return (
    <div className="md:my-15 mt-8 ">
      <h2 className="md:text-3xl text-2xl font-bold md:mb-8 mb-4 text-center ">
        Update Product
      </h2>
      <div className="xl:w-5xl mx-auto bg-gray-50 p-8 shadow-md rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="md:flex  gap-4 w-full">
          {/* Vendor Email */}
          <div className="md:w-[50%]">
            <label className="block mb-1 font-medium" htmlFor="vendorEmail">
              Vendor Email
            </label>
            <input
              id="vendorEmail"
              type="email"
              value={data?.vendorEmail || ""}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md cursor-not-allowed"
            />
          </div>

          {/* Vendor Name */}
          <div className="md:w-[50%]">
            <label className="block mb-1 font-medium" htmlFor="vendorName">
              Vendor Name
            </label>
            <input
              id="vendorName"
              type="text"
              value={data?.vendorName || ""}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md cursor-not-allowed"
            />
          </div>
        </div>
          <div>
            <label className="font-medium">Market Name</label>
            <input
              {...register("marketName", {
                required: "Market Name is required",
              })}
              className="w-full px-4 py-2 border border-gray-300 bg-white rounded focus:outline-none focus:ring-2 focus:ring-[#00B795]"
            />
            {errors.marketName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.marketName.message}
              </p>
            )}
          </div>
          <div>
            <label className="font-medium">Market Description</label>
            <textarea
              {...register("marketDescription", {
                required: "Market Description is required",
              })}
              className="w-full px-4 py-2 border border-gray-300 bg-white rounded focus:outline-none focus:ring-2 focus:ring-[#00B795]"
            />
            {errors.marketDescription && (
              <p className="text-red-500 text-sm mt-1">
                {errors.marketDescription.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Item Name</label>
              <input
                {...register("itemName", { required: "Item Name is required" })}
                className="w-full px-4 py-2 border border-gray-300 bg-white rounded focus:outline-none focus:ring-2 focus:ring-[#00B795]"
              />
              {errors.itemName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.itemName.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-medium">Price per Unit (৳)</label>
              <input
                type="number"
                {...register("pricePerUnit", {
                  required: "Price per Unit is required",
                  min: { value: 1, message: "Price must be at least 1৳" },
                })}
                className="w-full px-4 py-2 border border-gray-300 bg-white rounded focus:outline-none focus:ring-2 focus:ring-[#00B795]"
              />
              {errors.pricePerUnit && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.pricePerUnit.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="font-medium">Item Description</label>
            <textarea
              {...register("itemDescription")}
              className="w-full px-4 py-2 border border-gray-300 bg-white rounded focus:outline-none focus:ring-2 focus:ring-[#00B795]"
            />
          </div>

          <div>
            <label className="font-medium mr-2">Date</label>
            <input
              type="text"
              value={data?.date || ""}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 bg-white rounded focus:outline-none focus:ring-2 focus:ring-[#00B795]"
            />
          </div>

          <div>
            <label className="font-medium">Image URL</label>
            <input
              {...register("image", { required: "Image URL is required" })}
              className="w-full px-4 py-2 border border-gray-300 bg-white rounded focus:outline-none focus:ring-2 focus:ring-[#00B795]"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          <div>
            <label className="font-medium">Price History</label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center mb-2">
                <DatePicker
                  selected={watch(`prices.${index}.date`)}
                  onChange={(date) => setValue(`prices.${index}.date`, date)}
                  className="w-full px-4 py-2 border border-gray-300 bg-white rounded focus:outline-none focus:ring-2 focus:ring-[#00B795]"
                  dateFormat="yyyy-MM-dd"
                />
                <input
                  type="number"
                  placeholder="৳"
                  {...register(`prices.${index}.price`, {
        required: "Price is required",
        min: { value: 1, message: "Price must be at least 1৳" },
      })}
                  className="w-full px-4 py-2 border border-gray-300 bg-white rounded focus:outline-none focus:ring-2 focus:ring-[#00B795]"
                />
                 {errors.prices?.[index]?.price && (
      <p className="text-red-500  text-sm mt-1">
        {errors.prices[index].price.message}
      </p>
    )}
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="btn bg-red-500 text-white btn-error btn-sm"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ date: new Date(), price: "" })}
              className="px-4 py-2 border border-[#00B795] hover:bg-[#00B795] bg-white hover:text-white rounded font-semibold mt-2"
            >
              Add More
            </button>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-12 py-4 bg-[#00B795] hover:bg-[#22A587] font-bold text-white rounded-md"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};




export default AdminUpdateProduct;