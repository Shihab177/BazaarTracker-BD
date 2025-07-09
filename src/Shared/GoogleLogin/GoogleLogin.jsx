import React from 'react';
import useAuth from '../../hook/useAuth';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router';

const GoogleLogin = () => {
    const {signInWithGoogle}= useAuth()
    const navigate = useNavigate()
     const handleGoogleLogin = ()=>{
    signInWithGoogle()
    .then(result=>{
      console.log(result.user)
      navigate('/')

    })
    
  }
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