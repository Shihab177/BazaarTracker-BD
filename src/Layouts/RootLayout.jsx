import React from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Shared/Footer/Footer';

const RootLayout = () => {
    return (
       <><div className='md:container mx-auto'>
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