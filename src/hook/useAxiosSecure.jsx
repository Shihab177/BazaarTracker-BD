import axios from 'axios';

import React from 'react';

import { useNavigate } from 'react-router';
import useAuth from './useAuth';

 const axiosSecure = axios.create({
        baseURL: "http://localhost:7000/"
    })
const useAxiosSecure = () => {
    const navigate = useNavigate()
    const {user,logout}=useAuth()
    axiosSecure.interceptors.request.use((config)=>{
        config.headers.authorization = `Bearer ${user.accessToken}`
         return config;
    },error=>{
      return Promise.reject(error);
    })

      axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        const status = error.status;
       
        if (status === 403 ) {
            navigate('/Forbidden');
        }
        else if (status === 401) {
            logout()
                .then(() => {
                    navigate('/login')
                })
                .catch(() => { })
        }

        return Promise.reject(error);
    })
    return axiosSecure
};

export default useAxiosSecure;