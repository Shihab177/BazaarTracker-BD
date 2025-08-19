import React from "react";
import { useQuery } from "@tanstack/react-query";

import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const ProductSection = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["homeApprovedProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products-public?limit=6");
      return res.data;
    },
  });
  console.log(products);
  const handleViewDetails = (id) => {
    navigate(`product-details/${id}`);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mt-12 md:mt-16 lg:mt-20"
    >
      <div className="">
        <h2 className="md:[30px] text-[24px] lg:text-[36px] font-semibold text-gray-800 text-center mb-4 md:mb-6 lg:mb-8">
          Latest Market Prices
        </h2>
        {isLoading && (
          <p className="text-center py-20 text-lg">Loading products...</p>
        )}
        {products.length === 0 ? (
          <p className="text-lg text-center font-medium">
            No products available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {products?.map((product) => (
              <motion.div
                key={product._id}
                whileHover={{ scale: 1.03 }}
                className="bg-white shadow-md rounded-md p-5 border border-gray-200 transition"
              >
                <img
                  src={product.image}
                  alt={product.productName}
                  className="w-full h-48  rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-600 mb-1">
                  {" "}
                  marketName : {product.marketName}
                </h3>
                <p className="text-gray-600 mb-2">Date : {product.date}</p>
                <p className="mb-1 font-medium">
                  {product.itemName} — ৳{product.pricePerUnit}/kg
                </p>
                <div className="text-right">
                  <button
                    onClick={() => handleViewDetails(product._id)}
                    className="bg-[#00B795] text-white px-5 py-2  rounded-md hover:bg-[#009f82] transition"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default ProductSection;
