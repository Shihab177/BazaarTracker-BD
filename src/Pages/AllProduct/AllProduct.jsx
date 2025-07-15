import React, { useState, forwardRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import useAxios from "../../hook/useAxios";
import Loading from "../../Shared/Loading/Loading";

// Custom Input for DatePicker
const CustomInput = forwardRef(({ value, onClick, onChange, placeholder }, ref) => (
  <input
    ref={ref}
    value={value}
    onClick={onClick}
    onChange={onChange}
    placeholder={placeholder}
    className="input input-bordered border-2 border-[#22A587] focus:outline-none"
  />
));

const AllProducts = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const [sort, setSort] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["all-products-public", sort, startDate, endDate],
    queryFn: async () => {
      let query = `/all-products-public?sort=${sort}`;
      const from = startDate ? startDate.toISOString().split("T")[0] : null;
      const to = endDate ? endDate.toISOString().split("T")[0] : null;

      if (from && to) {
        query += `&startDate=${from}&endDate=${to}`;
      }

      const res = await axiosInstance.get(query);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="mt-35 pb-20">
      <h2 className="text-3xl font-bold mb-8 text-center">All Market Products</h2>

      {/* Filter & Sort */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="font-semibold">Sort by:</span>
          <select
            className="select focus:outline-none w-[280px] border-2 border-[#22A587]"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Default</option>
            <option value="low-to-high">Price Low to High</option>
            <option value="high-to-low">Price High to Low</option>
          </select>
        </div>

        {/* Date Range Filter */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="font-semibold">From:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="YYYY-MM-DD"
              customInput={<CustomInput />}
              isClearable
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">To:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={startDate}
              dateFormat="yyyy-MM-dd"
              placeholderText="YYYY-MM-DD"
              customInput={<CustomInput />}
              isClearable
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="rounded-xl border border-gray-300 shadow-sm p-4 hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.itemName}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-medium text-gray-900">
              <span className="font-semibold">Product Name:</span> {product.itemName}
            </h3>
            <p className="text-gray-800 font-medium">
              <span className="font-semibold">Price:</span> ৳{product.pricePerUnit} per kg
            </p>
            <p className="text-gray-800 font-medium">
              <span className="font-semibold">Market:</span> {product.marketName}
            </p>
            <p className="text-gray-800 font-medium">
              <span className="font-semibold">Date:</span> {product.date}
            </p>
            <p className="text-gray-800 font-medium">
              <span className="font-semibold">Vendor:</span> {product.vendorName}
            </p>
            <div className="mt-4">
              <button
                onClick={() => navigate(`/product-details/${product._id}`)}
                className="bg-[#00B795] hover:bg-[#22A587] text-white font-semibold rounded-md py-2 px-4 w-full transition duration-300"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
