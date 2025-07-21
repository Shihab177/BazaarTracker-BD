import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import Logo from "../../../Shared/Logo/Logo";
import { MdPerson, MdEmail, MdLock, MdImage } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hook/useAuth";
import axios from "axios";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import useAxios from "../../../hook/useAxios";

const Register = () => {
  const axiosInstance =useAxios()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation()
  const form = location.state?.form || '/'
   const [profilePic,setProfilePic]=useState('')
  const {createUser,updateUserProfile}= useAuth()
 const navigate = useNavigate()
  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email,data.password)
    .then( async(result) =>{
        console.log(result.user)
        //update userinfo in database
          const userInfo = {
        email: result?.user?.email,
        name: data?.name,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };
      await axiosInstance.post("/users", userInfo);
       
        
        //update profile in firebase
        const userProfile = {
          displayName:data.name,
          photoURL: profilePic
        }
        updateUserProfile(userProfile)
        .then(()=>{
          console.log(form)
          navigate(form)
        })
    })
    .catch(error=>{
        console.log(error)
    })
  };
  ///
  const handelImageUpload = async (e) => {
     const image = e.target.files[0]
   
    const formData = new FormData()
    formData.append('image',image)
    const imageUploadUrl=`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`
    const res = await axios.post(imageUploadUrl,formData)
    setProfilePic(res.data.data.url)
  };
     
  return (
     <div className="flex flex-col justify-center my-20">
      <div className="flex flex-col items-center">
        <Logo />
        <h1 className="text-2xl font-semibold mt-4 mb-7">Create an Account</h1>
      </div>

      <form
        className="w-[530px] mx-auto"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <fieldset className="text-[16px] space-y-5">
          {/* Name Field */}
          <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md px-3 focus-within:border-[#00B795]">
            <MdPerson size={27} className="text-gray-500 mr-2" />
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter your name"
              className="w-full py-3 bg-gray-100 placeholder:text-center focus:outline-none"
            />
          </div>
          {errors.name?.type === "required" && (
            <p className="text-red-600 ml-2 text-sm">Name is required</p>
          )}

          {/* Image Field */}
          <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md px-3 focus-within:border-[#00B795]">
             <MdImage size={27} className="mr-2" />
             <input type="file" className="w-full py-3 bg-gray-100 placeholder:text-center focus:outline-none" onChange={handelImageUpload} placeholder="Your profile picture"/>
            
          </div>

          {/* Email Field */}
          <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md px-3 focus-within:border-[#00B795]">
            <MdEmail size={27} className="text-gray-500 mr-2" />
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email here"
              className="w-full py-3 bg-gray-100 placeholder:text-center focus:outline-none"
            />
          </div>
          {errors.email?.type === "required" && (
            <p className="text-red-600 ml-2 text-sm">Email is required</p>
          )}

          {/* Password Field */}
          <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md px-3 focus-within:border-[#00B795]">
            <MdLock size={27} className="text-gray-500 mr-2" />
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Password"
              className="w-full py-3 bg-gray-100 placeholder:text-center focus:outline-none"
            />
          </div>
          {errors.password?.type === "required" && (
            <p className="text-red-600 ml-2 text-sm">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-600 ml-2 text-sm">
              Password must be 6 characters or longer
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#00B795] hover:bg-[#22A587] rounded-md text-white text-[18px] font-semibold transition-colors duration-300"
          >
            Register
          </button>
        </fieldset>
         <div className="mt-6 text-center">
          <GoogleLogin></GoogleLogin>
        </div>
        {/* Login Link */}
        <p className="text-[18px] text-center mt-6">
          Already have an account?
          <Link to="/login" className="text-[#00B795] ml-2 underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
