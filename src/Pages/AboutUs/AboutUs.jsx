import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="min-h-screen  text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-30 ">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[24px] lg:text-[36px] md:text-[30px] font-semibold text-gray-900"
        >
          About <span className="text-[#00B795]">BazaarTracker BD</span>
        </motion.h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          We are on a mission to make daily market prices transparent, accessible, and easy to track for everyone in Bangladesh.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto  py-12">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
        >
          <h2 className="text-2xl font-semibold text-green-700 mb-4">🎯 Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            To empower users and vendors with real-time local market data, enabling smart buying, selling, and planning decisions.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
        >
          <h2 className="text-2xl font-semibold text-green-700 mb-4">🌍 Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            To become Bangladesh’s most trusted platform for daily bazaar price updates, connecting buyers, sellers, and communities.
          </p>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Meet Our Team
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto ">
          {["Shihab", "Ayesha", "Rahim"].map((name, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200"
            >
              <img
                src={`https://i.pravatar.cc/300?img=${index + 12}`}
                alt={name}
                className="w-full h-60 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold">{name}</h3>
                <p className="text-green-600">Frontend Developer</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">
          Want to know more about our journey?
        </h2>
        <p className="text-gray-600 mb-6">
          Get in touch with us to learn more about our project and future plans.
        </p>
        <button className="px-6 py-3 bg-[#00B795] hover:bg-[#22A587] text-white font-semibold rounded-xl shadow transition duration-1000">
          Contact Us
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
