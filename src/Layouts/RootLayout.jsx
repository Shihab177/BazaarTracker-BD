import React from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Shared/Footer/Footer';

const RootLayout = () => {
    return (
       <>
       <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8'>
           <Navbar></Navbar>
          <div className='min-h-[calc(100vh-355px)]'>
             <Outlet></Outlet>
          </div>
           
        </div>
        <Footer></Footer>
        </> 
        
        
        
    );
};

export default RootLayout;