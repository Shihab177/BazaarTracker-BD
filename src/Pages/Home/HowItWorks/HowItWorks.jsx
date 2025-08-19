import React from "react";
import { motion } from "framer-motion";
import { Search, BarChart3, Heart, Upload } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-12 w-12 text-[#00B795]" />,
    title: "Browse Today's Prices",
    desc: "Explore daily market prices of essential items across local markets in Bangladesh.",
  },
  {
    icon: <BarChart3 className="h-12 w-12 text-[#00B795]" />,
    title: "Compare Trends",
    desc: "Analyze price trends over time with interactive charts to make informed decisions.",
  },
  {
    icon: <Heart className="h-12 w-12 text-[#00B795]" />,
    title: "Add to Watchlist / Order",
    desc: "Save items to your watchlist or purchase products conveniently through secure payment.",
  },
  {
    icon: <Upload className="h-12 w-12 text-[#00B795]" />,
    title: "Vendors Submit Data",
    desc: "Vendors can submit updated prices daily to keep the platform accurate and community-driven.",
  },
];

const HowItWorks = () => {
  return (
    <section className="mt-12 md:mt-16 lg:mt-20 max-w-7xl mx-auto">
      {/* Heading */}
      <div className="">
        <motion.h2
          className="md:[30px] text-[24px] lg:text-[36px] font-semibold text-gray-800 text-center mb-4 md:mb-6 lg:mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.h2>
        <p className="text-gray-700  mb-4 md:mb-6 lg:mb-8 text-center">
          Follow these simple steps to navigate BazaarTracker BD efficiently.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="bg-white border border-gray-200 rounded-md shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 text-sm md:text-base">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
