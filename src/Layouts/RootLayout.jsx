import React from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <>
        <div className='md:container mx-auto bg-[#FFFFFF]'>
           <Navbar></Navbar>
           <Outlet></Outlet>
        </div>
        </>
        
    );
};

export default RootLayout;