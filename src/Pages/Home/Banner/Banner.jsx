import React from "react";
import { motion } from "framer-motion";
import img from "../../../assets/bannerimg.jpg"
import { Link } from "react-router";
const Banner = () => {
  return (
    <motion.section
      className="relative h-[540px] bg-cover bg-center flex items-center justify-center text-white rounded-b-sm max-w-7xl mx-auto"
      style={{
    backgroundImage: `url(${img})`,
  }}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
       {/* Overlay Layer */}
         {/* Overlay Layer */}
      <div className="absolute inset-0 bg-black/40 rounded-b-sm"></div>

      <div className="elative z-10 bg-opacity-20 p-8 rounded-lg text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Stay Updated with Daily Market Prices!
        </h1>
        <p className="text-lg mb-6 font-semibold">
          Explore fresh produce prices from local markets and make smarter decisions.
        </p>
        <Link to='/AllProduct' ><button className="px-6 py-3 bg-[#00B795] hover:bg-[#22A587] text-white text-lg font-semibold rounded-md transition">
          Explore Now
        </button></Link>
      </div>
    </motion.section>
  );
};

export default Banner;
