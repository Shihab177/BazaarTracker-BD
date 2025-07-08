import React from 'react';

import { MdDashboard } from 'react-icons/md'
import { Link, NavLink } from 'react-router'
import Logo from '../Logo/Logo';

const Navbar = () => {
    
   
    return (
        <nav className='flex items-center py-3'>
           <div className='flex gap-4 items-center md:w-3/12'>
             <Logo></Logo>
             <h1 className='text-2xl font-bold'>BazaarTracker <span className='text-[#00B795]'>BD</span></h1>
           </div>
           
            {/*NavLink profile and btn */}
           <div className=' md:w-9/12 flex items-center gap-6 justify-end'>
             {/* Menu Links */}
           <div className='mx-4'>
            <ul className='text-[18px] flex justify-between font-semibold'>
            <NavLink className="hover:text-[#22A587]">All Products </NavLink>
           
            </ul>
           </div>

            <div>
                 <Link className="text-[20px] font-semibold text-[#00B795] hover:text-[#22A587] flex items-center gap-2">
                    <MdDashboard size={20} /> Dashboard
                </Link>
            </div>
            <div>
                <img src="" alt=""  referrerPolicy="no-referrer"/>
                <h1 className='h-16 w-16 rounded-full bg-green-500'></h1>
            </div>
            {/* login logout btn */}
            <div>
                <Link to="" className="px-4 py-2 text-[20px] font-semibold bg-[#00B795] hover:bg-[#22A587] text-white rounded-sm flex items-center ">Login</Link>
            </div>
           </div>
        </nav>
    );
};

export default Navbar;