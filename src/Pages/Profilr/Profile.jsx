import React from 'react';
import useAuth from '../../hook/useAuth';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-md md:mt-40 mx-auto mt-23  p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
      <div className="flex flex-col items-center text-center">
        <img
          className="w-24 h-24 rounded-full border-4 border-[#00B795] shadow-sm object-cover"
          src={user?.photoURL || "https://i.ibb.co/2kRBgRZ/default-user.png"}
          alt="User Profile"
        />
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">{user?.displayName || "No Name Found"}</h2>
        <p className="text-gray-500 mt-1">{user?.email || "No Email Found"}</p>
      </div>
    </div>
  );
};

export default Profile;
