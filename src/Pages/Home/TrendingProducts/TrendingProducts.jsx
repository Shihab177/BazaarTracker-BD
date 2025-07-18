import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Flame } from "lucide-react";

const trendingByPrice = [
  { id: 1, name: "🥔 Potato", change: 22 },
  { id: 2, name: "🧅 Onion", change: -12 },
  { id: 3, name: "🥒 Cucumber", change: 18 },
];

const mostTracked = [
  { id: 1, name: "🥚 Egg", label: "Most tracked this month" },
  { id: 2, name: "🍅 Tomato", label: "Highly watched this week" },
  { id: 3, name: "🥬 Spinach", label: "Popular among users" },
];

const TrendingProducts = () => {
  return (
    <section className=" pb-4 pt-8 md:px-12  bg-[#00B795] rounded-md">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-extrabold  flex items-center text-white justify-center gap-2">
          <TrendingUp className=" w-8 h-8" />
          Trending Products
        </h2>
        <p className="text-white mt-3 max-w-xl mx-auto text-lg">
          Discover what’s hot in the market – price changes and most watched items!
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Price Change Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-400"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Flame className="text-red-500" /> Biggest Price Changes
          </h3>
          <ul className="space-y-3">
            {trendingByPrice.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-gray-50 hover:bg-green-50 p-3 rounded-md transition"
              >
                <span className="font-medium text-gray-700">{item.name}</span>
                <span
                  className={`font-bold text-sm ${
                    item.change > 0 ? "text-red-600" : "text-blue-600"
                  }`}
                >
                  {item.change > 0 ? "+" : ""}
                  {item.change}% {item.change > 0 ? "↑" : "↓"}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Most Tracked Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-400"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="text-yellow-500" /> Most Tracked Products
          </h3>
          <ul className="space-y-3">
            {mostTracked.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-gray-50 hover:bg-yellow-50 p-3 rounded-md transition"
              >
                <span className="font-medium text-gray-700">{item.name}</span>
                <span className="text-sm text-gray-500 italic">{item.label}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingProducts;
