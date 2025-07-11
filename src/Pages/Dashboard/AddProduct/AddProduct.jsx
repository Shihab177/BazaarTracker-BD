import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";

const AddProduct = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  console.log(user?.displayName)
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
      marketName: "",
      marketDescription: "",
      date: new Date(),
      itemName: "",
      itemDescription: "",
      pricePerUnit: "",
      prices: [{ date: new Date(), price: "" }],
      image: "",
      status: "pending",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "prices",
  });

  const onSubmit = async (data) => {
    // Format dates
    const formattedData = {
      ...data,
      vendorEmail: user?.email,
      vendorName: user?.displayName,
      date: format(data.date, "yyyy-MM-dd"),
      prices: data.prices.map((p) => ({
        date: format(p.date, "yyyy-MM-dd"),
        price: Number(p.price),
      })),
      pricePerUnit: Number(data.pricePerUnit),
    };

    //post server
    axiosSecure
      .post("/add-product", formattedData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Product added successfully!");
          reset();
        }
      })
      .catch(() => {
        toast.error("Failed to add product.");
      });
  };

  return (
    <div className="my-20">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#00B795]"> Add New Product</h2>
      <div className="max-w-4xl mx-auto bg-gray-50 p-8 shadow-md rounded-xl ">
       
     
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Vendor Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Vendor Email</label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="w-full px-4 py-2 border bg-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00B795]"
            />
          </div>
          <div>
            <label className="font-medium">Vendor Name</label>
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 bg-white rounded focus:outline-none focus:ring-2 focus:ring-[#00B795]"
            />
          </div>
        </div>

        {/* Market Info */}
        <div>
          <label className="font-medium">Market Name</label>
          <input
            {...register("marketName", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded focus:outline-none focus:ring-2 focus:ring-[#00B795]"
            placeholder="Market Name"
          />
          {errors.marketName && (
            <p className="text-red-500 text-sm">Market name is required</p>
          )}
        </div>

        <div>
          <label className="font-medium">Market Description</label>
          <textarea
            {...register("marketDescription", { required: true })}
            className="textarea textarea-bordered w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00B795]"
            placeholder="Market Description"
          />
          {errors.marketDescription && (
            <p className="text-red-500 text-sm">
              Market description is required
            </p>
          )}
        </div>

        {/* Product Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Item Name</label>
            <input
              {...register("itemName", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 bg-white rounded focus:outline-none focus:ring-2 focus:ring-[#00B795]"
              placeholder="Item Name"
            />
            {errors.itemName && (
              <p className="text-red-500 text-sm">Item name is required</p>
            )}
          </div>

          <div>
            <label className="font-medium">Price per Unit (৳)</label>
            <input
              type="number"
              {...register("pricePerUnit", { required: true, min: 1 })}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#00B795]"
              placeholder="Price per Unit (৳)"
            />
            {errors.pricePerUnit && (
              <p className="text-red-500 text-sm">Valid price is required</p>
            )}
          </div>
        </div>

        <div>
          <label className="font-medium">Item Description (optional)</label>
          <textarea
            {...register("itemDescription")}
            className="textarea textarea-bordered w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00B795]"
            placeholder="Item Description"
          />
        </div>

        {/* Date Picker */}
        <div>
          <label className="font-medium mr-2">Date</label>
          <DatePicker
            selected={watch("date")}
            onChange={(date) => setValue("date", date)}
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded focus:outline-none focus:ring-2 focus:ring-[#00B795]"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        {/* Image */}
        <div>
          <label className="font-medium">Product Image URL</label>
          <input
            {...register("image", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded focus:outline-none focus:ring-2 focus:ring-[#00B795]"
            placeholder="https://imgbb.com/image.png"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">Image URL is required</p>
          )}
        </div>

        {/* Multiple Price History */}
        <div>
          <label className="font-medium">Price History (Date & Price)</label>
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
                {...register(`prices.${index}.price`, { required: true })}
                className="w-full px-4 py-2 border border-gray-300 bg-white rounded focus:outline-none focus:ring-2 focus:ring-[#00B795]"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="btn btn-error btn-sm text-white"
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

        {/* Submit */}
        <div className="text-center">
          <button type="submit" className=" px-8 py-4 bg-[#00B795] hover:bg-[#22A587] font-bold text-white rounded-md mt-4">
            Submit Product
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddProduct;
