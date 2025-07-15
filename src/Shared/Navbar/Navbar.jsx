import React from "react";

import { MdDashboard } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router";
import Logo from "../Logo/Logo";
import useAuth from "../../hook/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const handelLogout = () => {
    logout().then(() => {
      navigate("/");
    });
  };
  return (
    <nav className="fixed bg-[#FFFFFF] top-0 left-0 w-full h-[96px] z-40 shadow-md">
      <div className="flex items-center py-4 md:container mx-auto">
        <div className="flex gap-4 items-center md:w-3/12">
          <Logo></Logo>
          <h1 className="text-2xl font-bold">
            BazaarTracker <span className="text-[#00B795]">BD</span>
          </h1>
        </div>

        {/*NavLink profile and btn */}
        <div className=" md:w-9/12 flex items-center gap-6 justify-end">
          {/* Menu Links */}
          <div className="mx-4">
            <ul className="text-[18px] flex gap-6 justify-between font-semibold">
              <li>
                <NavLink to="/" className="hover:text-[#22A587]">
                  Home
                </NavLink>
              </li>
              <NavLink to='AllProduct' className="hover:text-[#22A587]">All Products </NavLink>
            </ul>
          </div>

           {user && (
            <div>
              <Link to='/dashboard' className="text-[18px] font-semibold text-[#00B795] hover:text-[#22A587] flex items-center gap-2">
                <MdDashboard size={20} /> Dashboard
              </Link>
            </div>
          )}
          {user && (
            <div>
              <img
                className="w-16 h-16 rounded-full"
                src={user?.photoURL}
                alt="profile"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
         

          {/* login logout btn 27B896 */}
          <div>
            {user ? (
              <button
                onClick={handelLogout}
                className="px-4 py-2 text-[18px] font-semibold bg-[#00B795] hover:bg-[#22A587] text-white rounded-sm flex items-center"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-[18px] font-semibold text-[#00B795]  hover:text-[#22A587] "
              >
                Login
              </Link>
            )}
          </div>
          {!user && (
            <Link
              to="/register"
              className="px-4 py-2 text-[18px] font-semibold bg-[#00B795] hover:bg-[#22A587] text-white rounded-sm flex items-center"
            >
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
