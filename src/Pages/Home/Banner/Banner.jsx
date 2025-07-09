import React from "react";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <motion.section
      className="relative h-[540px] bg-cover bg-center flex items-center justify-center text-white rounded-b-sm"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/WWDM5Q7L/Screenshot-2025-07-09-070801.png')",
      }}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className=" bg-opacity-50 p-8 rounded-lg text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Stay Updated with Daily Market Prices!
        </h1>
        <p className="text-lg mb-6">
          Explore fresh produce prices from local markets and make smarter decisions.
        </p>
        <button className="px-6 py-3 bg-[#00B795] hover:bg-[#22A587] text-white text-lg rounded-md transition">
          Explore Now
        </button>
      </div>
    </motion.section>
  );
};

export default Banner;
