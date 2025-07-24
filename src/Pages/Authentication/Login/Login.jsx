import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import Logo from "../../../Shared/Logo/Logo";
import { MdEmail, MdLock } from "react-icons/md";

import useAuth from "../../../hook/useAuth";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation()
  const form = location.state?.form || '/'
   const navigate = useNavigate()
   const {signIn}= useAuth()
  const onSubmit = (data) => {
 
    signIn(data.email,data.password)
    .then(()=>{
      navigate(form)
    })
    .catch(()=>{
   toast.error("Login failed.tray again")
    })
  };

  return (
    <div className="flex flex-col justify-center mt-24 mb-15 md:my-50 px-4 md:px-0">
      <div className="flex flex-col items-center">
        <Logo></Logo>

        <h1 className="text-[26px] font-semibold mt-4 mb-7">
          Log in to your account
        </h1>
      </div>
      <form
        className="md:w-[530px]   mx-auto"
        onSubmit={handleSubmit(onSubmit)}
        action=""
      >
        <fieldset className="fieldset text-[16px]">
          {/* Email Field */}
          <div className="mb-5">
            <div className="border border-gray-300 rounded-md bg-gray-100 flex items-center focus-within:border-[#00B795] transition-colors duration-300">
              <MdEmail size={27} className="text-gray-500 ml-4" />
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter your email here"
                className="w-full px-3 py-3 bg-gray-100 placeholder:text-center focus:outline-none rounded-md"
              />
            </div>
            {errors.email?.type === "required" && (
              <p className="text-red-600 mt-1 ml-2 text-sm">
                Email is required
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-5">
            <div className="border border-gray-300 rounded-md bg-gray-100 flex items-center focus-within:border-[#00B795] transition-colors duration-300">
              <MdLock size={27} className="text-gray-500 ml-4" />
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                placeholder="Password"
                className="w-full px-3 py-3 bg-gray-100 placeholder:text-center focus:outline-none rounded-md"
              />
            </div>
            {errors.password?.type === "required" && (
              <p className="text-red-600 mt-1 ml-2 text-sm">
                Password is required
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 mt-1 ml-2 text-sm">
                Password must be 6 characters or longer
              </p>
            )}
          </div>

          <div className="my-5 flex justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="agree" className="w-6 h-6" />
                <label className="agree md:text-[19px] text-[15px]">Remember Me</label>
              </div>
            </div>
            <a className="link link-hover md:text-[18px] text-[15px] text-gray-700 ">
              Forgot password?
            </a>
          </div>
          <button className="py-3 bg-[#00B795] hover:bg-[#22A587] rounded-md text-white text-[18px] font-semibold">
            Login
          </button>
        </fieldset>
       
        <div className="mt-6 text-center">
       <GoogleLogin></GoogleLogin>
        </div>
        <p className="text-[18px] text-center mt-6">
          Don’t have an account
          <Link to="/register" className="text-[#00B795] underline mx-3">
            Register
          </Link>
          Here
        </p>
      </form>
     
    </div>
  );
};

export default Login;
