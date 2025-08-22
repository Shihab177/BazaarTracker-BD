import React from "react";
import useUserRole from "../../../hook/useUserRole";
import { format } from "date-fns";
import useAuth from "../../../hook/useAuth";
const Profile = () => {
  const { user } = useAuth();
  const currentDate = format(new Date(), "MMMM dd, yyyy");
  const { role, roleLoading } = useUserRole();
  return (
    <div className=" m-6 text-gray-800 h-screen">
      <h1 className="md:text-3xl text-2xl text-center lg:text-left font-bold mb-6">
        Profile
      </h1>
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
      <div className="bg-[#F8F8F8] p-5 rounded-xl flex items-center gap-5 shadow-md">
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
    </div>
  );
};

export default Profile;
