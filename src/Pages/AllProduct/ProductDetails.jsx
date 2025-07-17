import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Loading from "../../Shared/Loading/Loading";
import useAxios from "../../hook/useAxios";
import useAuth from "../../hook/useAuth";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const { user, role } = useAuth();
  const queryClient = useQueryClient();

  const [userReview, setUserReview] = useState({ rating: 0, comment: "" });
  const [chartDate, setChartDate] = useState("");

  // Fetch product details
  const { data: product = {}, isLoading: productLoading } = useQuery({
    queryKey: ["product-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  // Fetch reviews
  const { data: reviews = [], isLoading: reviewLoading } = useQuery({
    queryKey: ["product-reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}/reviews`);
      return res.data;
    },
  });

  // Fetch price history for comparison chart
  const {
    data: priceTrend,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["price-trend", id, chartDate],
    queryFn: async () => {
      if (!chartDate) return null;
      const res = await axiosSecure.get(
        `/products/${id}/price-trend?date=${chartDate}`
      );
      return res.data;
    },
    enabled: !!chartDate && !!id,
  });

  // Mutation to add product to watchlist
  const addToWatchlistMutation = useMutation({
    mutationFn: async () => axiosSecure.post(`/watchlist`, { productId: id }),
    onSuccess: () => toast.success("Added to watchlist!"),
    onError: () => toast.error("Failed to add to watchlist."),
  });

  // Mutation to submit review
  const submitReviewMutation = useMutation({
    mutationFn: async () => {
      return axiosSecure.post(`/products/${id}/reviews`, {
        comment: userReview.comment.trim(),
        rating: userReview.rating,
        userName: user.displayName,
        userEmail: user.email,
      });
    },
    onSuccess: async () => {
      toast.success("Review submitted!");
      setUserReview({ rating: 0, comment: "" });
      await queryClient.invalidateQueries({
        queryKey: ["product-reviews", id],
      });
    },
    onError: () => toast.error("Failed to submit review."),
  });

  if (productLoading || reviewLoading) return <Loading />;

  // Format date to readable string
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleBuyProduct = () => {
    if (!user) {
      toast.error("Please login to buy product.");
      return;
    }
    navigate(`/payment/${id}`);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (userReview.rating === 0 || userReview.comment.trim() === "") {
      toast.error("Please provide rating and comment.");
      return;
    }
    submitReviewMutation.mutate();
  };
  
  return (
    <div className="max-w-5xl mx-auto my-30 p-6 ">
      {/* Market & Product Info */}
      <div className="text-center mb-4">
        <p className="text-xl text-gray-500 font-semibold">
          Market: <span className="font-medium">{product?.marketName}</span>
        </p>
        <p className="text-xl text-gray-500 font-semibold">
          Date: <span className="font-medium">{formatDate(product?.date)}</span>
        </p>
      </div>

      {/* Product Image */}
      <div className="flex justify-center">
        <img
          src={product?.image}
          alt={product?.itemName}
          className="w-full max-w-md object-cover rounded shadow-md"
        />
      </div>

      {/* Prices List */}
      <section className="bg-white shadow border-t  border-gray-200 my-2 rounded p-6">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
          Item Prices
        </h2>
        <ul className="list-disc list-inside space-y-1 text-gray-800">
          {product.prices && product.prices.length > 0 ? (
            product.prices.map((item, idx) => (
              <li key={idx}>
                <span className="capitalize">
                  {item.name || product.itemName}
                </span>{" "}
                — ৳{item.pricePerUnit || item.price} per kg{" "}
                <span className="text-sm text-gray-800">
                  ({new Date(item.date).toLocaleDateString()})
                </span>
              </li>
            ))
          ) : (
            <li>
              <span className="capitalize">{product.itemName}</span> — ৳
              {product.pricePerUnit} per kg
            </li>
          )}
        </ul>
      </section>

      {/* Vendor Info */}
      <section className="bg-gray-50 rounded p-6 shadow">
        <h2 className="text-xl font-semibold mb-2">Vendor Information</h2>
        <p>
          <strong>Name:</strong> {product.vendorName}
        </p>
        <p>
          <strong>Email:</strong> {product.vendorEmail}
        </p>
      </section>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center my-3">
        <button
          disabled={
            role === "admin" ||
            role === "vendor" ||
            addToWatchlistMutation.isLoading
          }
          onClick={() => {
            if (!user) return toast.error("Please login first");
            addToWatchlistMutation.mutate();
          }}
          className={`px-6 py-3 rounded text-white font-semibold transition ${
            role === "admin" || role === "vendor"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {addToWatchlistMutation.isLoading ? "Adding..." : "Add to Watchlist"}
        </button>

        <button
          onClick={handleBuyProduct}
          className="px-6 py-3 bg-[#00B795] hover:bg-[#22A587] rounded text-white font-semibold transition"
        >
          Buy Product
        </button>
      </div>

      {/* Reviews Section */}
      <section className="bg-white border-t border-gray-200 rounded shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
          User Reviews
        </h2>
        {reviewLoading && (
          <p className="mt-8 flex items-center justify-center">loading....</p>
        )}
        {reviews.length === 0 ? (
          <p className="text-gray-600 italic">
            No reviews yet. Be the first to review!
          </p>
        ) : (
          <div className="space-y-4 border max-h-[420px] overflow-y-scroll border-gray-300 rounded-md p-2">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border border-gray-300 p-4 rounded bg-gray-50 shadow-sm"
              >
                <p className="font-semibold">
                  {review.userName}{" "}
                  <span className="text-sm text-gray-500">
                    ({review.userEmail})
                  </span>
                </p>
                <p className="text-yellow-500 mb-1">
                  {"⭐".repeat(review.rating)}
                </p>
                <p>{review.comment}</p>
                <p className="text-xs text-gray-700 font-medium mt-1 italic">
                  {formatDate(review.createdAt)}
                </p>
              </div>
            ))}
          </div>
        )}

        {user && (
          <form onSubmit={handleReviewSubmit} className="mt-8 space-y-4">
            <h3 className="font-semibold text-lg">Add Your Review</h3>
            <div className="flex items-center gap-4">
              <label className="font-medium">Rating:</label>
              <select
                value={userReview.rating}
                onChange={(e) =>
                  setUserReview({
                    ...userReview,
                    rating: parseInt(e.target.value),
                  })
                }
                className="border rounded p-2"
                required
              >
                <option value={0}>Select rating</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {"⭐".repeat(r)}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              placeholder="Write your comment..."
              value={userReview.comment}
              onChange={(e) =>
                setUserReview({ ...userReview, comment: e.target.value })
              }
              rows={4}
              className="w-full border focus:outline-none border-[#22A587] focus:ring-2 focus:ring-[#22A587] rounded p-3 resize-none"
              required
            />

            <button
              type="submit"
              disabled={submitReviewMutation.isLoading}
              className="bg-[#00B795] hover:bg-[#22A587] text-white font-semibold py-3 px-6 rounded transition"
            >
              {submitReviewMutation.isLoading
                ? "Submitting..."
                : "Submit Review"}
            </button>
          </form>
        )}
      </section>

      {/* Price Comparison Chart */}
     <section className="bg-white rounded shadow p-6 mt-5 border-t border-gray-200">
  <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
    Price Comparison
  </h2>

  <div className="mb-6 flex items-center gap-4">
    <label htmlFor="compare-date" className="font-medium">
      Select Date:
    </label>
    <input
      id="compare-date"
      type="date"
      max={new Date().toISOString().split("T")[0]}
      value={chartDate}
      onChange={(e) => setChartDate(e.target.value)}
      className="border rounded p-2"
    />
  </div>

  {isLoading && <p>Loading price trend data...</p>}
  {error && <p className="text-red-600">Error: {error.message}</p>}

  {priceTrend ? (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={[
            { name: chartDate, price: priceTrend.previousPrice },
            { name: "Current", price: priceTrend.currentPrice },
          ]}
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />

          {/*  Custom Tooltip to prevent NaN */}
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const selectedData = payload.find(
                  (p) => p.payload.name === chartDate
                );
                const selectedPrice = selectedData?.value;
                const currentPrice = priceTrend.currentPrice;

                const difference =
                  typeof selectedPrice === "number"
                    ? currentPrice - selectedPrice
                    : null;

                const isIncrease = difference !== null && difference >= 0;

                return (
                  <div className="bg-white border border-gray-300 rounded p-3 shadow text-sm text-gray-800">
                    <p className="font-semibold mb-1"> Date: {label}</p>
                    {selectedPrice !== undefined && (
                      <p> Selected Date Price: ৳{selectedPrice}</p>
                    )}
                    <p> Current Price: ৳{currentPrice}</p>
                    {difference !== null && (
                      <p>
                         Difference:{" "}
                        <span
                          style={{ color: isIncrease ? "green" : "red" }}
                        >
                          {isIncrease ? "+" : ""}
                          {difference} ৳
                        </span>
                      </p>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />

          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            name="Price"
            stroke="#00B795"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <p className="text-center font-semibold mt-4">
        Difference:{" "}
        <span
          style={{
            color: priceTrend.difference >= 0 ? "green" : "red",
          }}
        >
          {priceTrend.difference >= 0 ? "+" : ""}
          {priceTrend.difference} ৳
        </span>
      </p>
    </>
  ) : (
    chartDate && (
      <p className="text-gray-600 italic">
        No data for the selected date.
      </p>
    )
  )}
</section>
    </div>
  );
};

export default ProductDetails;
