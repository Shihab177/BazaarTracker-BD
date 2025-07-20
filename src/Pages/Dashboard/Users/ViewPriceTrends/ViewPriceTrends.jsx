import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { motion } from "framer-motion";
import useAxiosSecure from "../../../../hook/useAxiosSecure";

const ViewPriceTrends = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch tracked item names
  const {
    data: trackedItems = [],
    isLoading: loadingItems,
  } = useQuery({
    queryKey: ["tracked-items"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/tracked-items");
      return res.data;
    },
    onSuccess: (data) => {
      if (data.length > 0 && !selectedItem) {
        setSelectedItem(data[0]); // default select first item
      }
    },
  });

  // Fetch price trend for selected item
  const {
    data: itemData = {},
    isLoading: loadingTrend,
  } = useQuery({
    queryKey: ["price-trend", selectedItem],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/price-trends/${selectedItem}`);
      return res.data;
    },
    enabled: !!selectedItem,
  });

  const prices = itemData?.prices || [];

  // Sort prices ascending by date
  const sortedPrices = [...prices].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Calculate trend percentage between first and last price
  const trend =
    sortedPrices.length > 1
      ? (
          ((sortedPrices[sortedPrices.length - 1].price - sortedPrices[0].price) /
            sortedPrices[0].price) *
          100
        ).toFixed(1)
      : 0;

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-8 p-4">
      {/* Sidebar */}
      <div className="md:w-1/4 bg-white rounded-xl border border-gray-300 shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Tracked Items</h2>
       <div className="max-h-[450px] overflow-y-auto">
         {loadingItems ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-2">
            {trackedItems.map((item) => (
              <li
                key={item}
                onClick={() => setSelectedItem(item)}
                className={`cursor-pointer px-4 py-2 rounded-lg font-semibold hover:bg-green-100 ${
                  selectedItem === item ? "bg-green-200 font-bold" : ""
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
       </div>
      </div>

      {/* Chart */}
      <motion.div
        className="md:w-3/4 bg-white rounded-xl border border-gray-300 shadow p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {loadingTrend ? (
          <p>Loading graph...</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-2">📊 {selectedItem}</h2>
            <p className="text-gray-500">{itemData?.marketName}</p>
            <p className="text-gray-500 mb-4">Vendor: {itemData?.vendorName}</p>

            {sortedPrices.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={sortedPrices}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={["auto", "auto"]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#00B795"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-red-500">No price data available</p>
            )}

            <p className="mt-4 font-medium text-green-600">
              Trend: {trend > 0 ? `+${trend}%` : `${trend}%`} last {sortedPrices.length}{" "}
              days
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ViewPriceTrends;
