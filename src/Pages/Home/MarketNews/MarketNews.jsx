import React from "react";
import { motion } from "framer-motion";
import { FaRegNewspaper } from "react-icons/fa";

const newsData = [
  {
    id: 1,
    title: "Onion prices rising – India halts export temporarily",
    date: "July 8, 2025",
    category: "Price Update",
    image: "https://i.ibb.co/yBpPmznF/Screenshot-2025-07-09-081824.png", // onion image
  },
  {
    id: 2,
    title: "New fresh market opens in the city this Saturday",
    date: "July 7, 2025",
    category: "Market News",
    image: "https://i.ibb.co/XfjdwFLD/Screenshot-2025-07-09-083459.png", // fresh market image
  },
  {
    id: 3,
    title: "Government cuts tax on rice imports",
    date: "July 6, 2025",
    category: "Govt Announcement",
    image: "https://i.ibb.co/7J1twvKp/Screenshot-2025-07-09-083822.png", // rice image
  },
  {
    id: 4,
    title: "Local farmers' fair this weekend: Fresh veggies at best price!",
    date: "July 5, 2025",
    category: "Community",
    image: "https://i.ibb.co/gbr8KY22/Screenshot-2025-07-09-084450.png", // vegetables image
  },
];

const MarketNews = () => {
  return (
    <section className="py-16 px-4 md:px-12 bg-gradient-to-b ">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-extrabold text-gray-900 flex justify-center items-center gap-3">
          <FaRegNewspaper className="text-[#00B795] text-4xl" />
          Market News & Updates
        </h2>
        <p className="text-gray-600 mt-3 text-lg max-w-xl mx-auto">
          Stay updated with the latest happenings and price changes from your local markets.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {newsData.map((news, idx) => (
          <motion.div
            key={news.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition cursor-pointer flex flex-col"
          >
            <div className="h-48 w-full overflow-hidden">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
              />
            </div>

            <div className="p-5 flex flex-col flex-grow">
              <span className="text-sm font-semibold text-[#00B795] mb-2">
                {news.category}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex-grow">
                {news.title}
              </h3>
              <p className="text-gray-500 text-sm mt-auto">{news.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MarketNews;
