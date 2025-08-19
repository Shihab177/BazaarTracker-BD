import React from "react";
import { motion } from "framer-motion";
import { RefreshCcw, BarChart3, UserCheck, Lock } from "lucide-react";

const features = [
  {
    icon: <RefreshCcw className="h-10 w-10 text-[#00B795]" />,
    title: "Daily Price Updates",
    desc: "Stay informed with real-time updates on essential product prices across local markets.",
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-[#00B795]" />,
    title: "Interactive Charts",
    desc: "Track price trends over time with intuitive and easy-to-read charts.",
  },
  {
    icon: <UserCheck className="h-10 w-10 text-[#00B795]" />,
    title: "Vendor Submissions",
    desc: "Vendors can submit daily data directly, ensuring accurate and community-driven updates.",
  },
  {
    icon: <Lock className="h-10 w-10 text-[#00B795]" />,
    title: "Secure Payments",
    desc: "Shop confidently with our secure Stripe-powered payment system.",
  },
];

const WhyChoose = () => {
  return (
    <section className="mt-12 md:mt-16 lg:mt-20">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Heading */}
        <motion.h2
          className="md:text-[30px] text-[24px] lg:text-[36px] text-gray-800 font-semibold text-center mb-4 md:mb-6 lg:mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Why Choose <span className="text-[#00B795]">BazaarTracker BD</span>
        </motion.h2>
        <p className="text-gray-700 mb-4 md:mb-6 lg:mb-8 max-w-2xl mx-auto">
          Empowering users and vendors with accurate market insights and secure transactions.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-200 rounded-md shadow-md hover:shadow-lg p-6 flex flex-col items-center text-center transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
