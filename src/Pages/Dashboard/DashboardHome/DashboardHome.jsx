import React from "react";
import { format } from "date-fns";
import {
  FaUserCircle,
  FaShoppingCart,
  FaBullhorn,
  FaBoxOpen,
  FaUsers,
  FaRegEye,
  FaShoppingBag,
} from "react-icons/fa";
import { MdTimeline } from "react-icons/md";
import useAuth from "../../../hook/useAuth";
import useUserRole from "../../../hook/useUserRole";
import { Link } from "react-router";

const DashboardHome = () => {
  const { user } = useAuth();
  const currentDate = format(new Date(), "MMMM dd, yyyy");
  const { role, roleLoading } = useUserRole();

  return (
    <div className="p-5 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#00B795] to-[#0ea57d] text-white rounded-2xl p-6 shadow-xl">
        <h1 className="text-4xl font-bold">
          Welcome, {user?.displayName || "User"} 👋
        </h1>
        <p className="mt-2">
          Your role: <span className="font-semibold capitalize">{role}</span>
        </p>
        <p className="text-sm mt-1 opacity-90">Today is {currentDate}</p>
      </div>

      {/* User Info */}
      <div className="bg-base-200 p-5 rounded-xl flex items-center gap-5 shadow-md">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="User"
            className="w-20 h-20 rounded-full object-cover border-4 border-[#00B795]"
          />
        ) : (
          <FaUserCircle className="text-6xl text-gray-500" />
        )}
        <div>
          <h2 className="text-xl font-bold">{user?.displayName || "User"}</h2>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
      </div>

      {/* Summary Cards */}
      {roleLoading ? (
        <p className="text-center font-semibold text-lg text-gray-500">
          Loading dashboard...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {role === "vendor" && (
            <>
              <Link to="my-products">
                <SummaryCard
                  icon={<FaBoxOpen />}
                  title="Products"
                  desc="View or manage your items"
                />
              </Link>
              <Link to="my-ads">
                <SummaryCard
                  icon={<FaBullhorn />}
                  title="Advertisements"
                  desc="Check ad performance"
                />
              </Link>
            </>
          )}

          {role === "admin" && (
            <>
              <Link to="all-users">
                <SummaryCard
                  icon={<FaUsers />}
                  title="All Users"
                  desc="Manage all registered users"
                />
              </Link>
              <Link to="all-products">
                <SummaryCard
                  icon={<FaBoxOpen />}
                  title="All Products"
                  desc="Review and control products"
                />
              </Link>
              <Link to="all-ads">
                <SummaryCard
                  icon={<FaBullhorn />}
                  title="All Ads"
                  desc="Monitor advertisements"
                />
              </Link>
              <Link to="all-orders">
                <SummaryCard
                  icon={<FaShoppingCart />}
                  title="All Orders"
                  desc="Track your customer orders"
                />
              </Link>
            </>
          )}

          {role === "user" && (
            <>
              <Link to="price-trends">
                <SummaryCard
                  icon={<MdTimeline />}
                  title="Price Trends"
                  desc="View market price changes"
                />
              </Link>
              <Link to="watchlist">
                <SummaryCard
                  icon={<FaRegEye />}
                  title="Watchlist"
                  desc="Track your favorite items"
                />
              </Link>

              <Link to="my-orders">
                <SummaryCard
                  icon={<FaShoppingBag />}
                  title="My Orders"
                  desc="See your purchases"
                />
              </Link>
            </>
          )}
        </div>
      )}
      <p className="mt-5 text-center">&&</p>
      <p className=" md:text-3xl -mt-3 text-center text-gray-900">
        Use the sidebar to navigate through your dashboard features.
      </p>
    </div>
  );
};

// ✅ Reusable Summary Card
const SummaryCard = ({ icon, title, desc }) => (
  <div className="bg-white p-5 rounded-xl shadow-md border-t-4 border-[#00B795] flex items-center gap-4 hover:shadow-lg transition-all">
    <div className="text-3xl text-[#00B795]">{icon}</div>
    <div>
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  </div>
);

export default DashboardHome;
