import React from "react";
import { motion } from "framer-motion";
import Logo from "../Logo/Logo";



const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-20 h-20">
        {/* border */}
        <motion.div
          className="absolute inset-0 border-5 border-[#00B795]  border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 1,
          }}
        ></motion.div>

        {/* logo */}
        <div className="absolute inset-0 flex  items-center justify-center">
         <Logo></Logo>
        </div>
      </div>
    </div>
  );
};

export default Loading;
