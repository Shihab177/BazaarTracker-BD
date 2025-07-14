import React from "react";

import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import useAxios from "../../../hook/useAxios";
import useAuth from "../../../hook/useAuth";


const GoogleLogin = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const handleGoogleLogin = () => {
    signInWithGoogle().then(async (result) => {
      console.log(result.user);
      const userInfo = {
        email: result?.user?.email,
        name: result?.user?.displayName,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };
      const res = await axiosInstance.post("/users", userInfo);
      if (res?.data?.insertedId || res?.status === 200) {
        navigate("/");
      }
    });
  };
  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-md text-[18px] hover:bg-gray-100 transition"
      >
        <FcGoogle size={22} />
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
