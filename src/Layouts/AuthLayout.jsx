import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';

const AuthLayout = () => {
    return (
        <>
          <div className="md:container mx-auto">
              <Navbar></Navbar>
            <div className="min-h-[calc(100vh-355px)]">
                 <Outlet></Outlet>
            </div>
          </div>
           
            <Footer></Footer>
        </>
    );
};

export default AuthLayout;