import React, { useEffect, useRef, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import Logo from "../Logo/Logo";
import useAuth from "../../hook/useAuth";
import {
  FaBoxOpen,
  FaHome,
  FaSignInAlt,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUserCircle,
  FaUserPlus,
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");
  

  const handelLogout = () => {
    logout().then(() => {
      navigate("/");
    });
  };
  const handelMenu = () => {
    setMenu(!menu);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenu(false);
      }
    };

    if (menu) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menu]);
  return (
    <nav className="fixed bg-gray-50 top-0 left-0 w-full md:h-[80px] h-[56px] z-40 shadow-md">
      <div className="h-full flex items-center lg:py-4 px-2 xl:px-0  md:container mx-auto">
        <div className="flex gap-4 items-center w-[60%] lg:w-3/12">
          <div className="lg:flex hidden">
            {" "}
            <Logo></Logo>
          </div>
          <button ref={buttonRef} className="lg:hidden cursor-pointer" onClick={handelMenu}>
            <CiMenuFries className="md:w-10 md:h-10 w-8 h-8"/>
          </button>

          <h1 className="xl:text-2xl lg:text-[20px] md:text-[24px] text-[16px] font-bold">
            BazaarTracker <span className="text-[#00B795]">BD</span>
          </h1>
        </div>

        {/*NavLink profile and btn */}
        <div className=" md:w-9/12 flex  w-[40%] items-center md:gap-6 gap-2 justify-end">
          {/* Menu Links */}
          <div className="mx-4 hidden lg:flex">
            <ul className="lg:text-[18px] text-[16px] flex gap-6 justify-between font-semibold">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-2 hover:text-[#22A587]"
                      : "hover:text-[#22A587]"
                  }
                >
                  Home
                </NavLink>
              </li>
              {!isDashboardRoute && (
                <NavLink
                  to="AllProduct"
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-2 hover:text-[#22A587]"
                      : "hover:text-[#22A587]"
                  }
                >
                  All Products{" "}
                </NavLink>
              )}
              <NavLink
              to="about"
              className={({ isActive }) =>
                    isActive
                      ? "border-b-2 hover:text-[#22A587]"
                      : "hover:text-[#22A587]"
                  }>
                About
              </NavLink>
            </ul>
          </div>

          {user && (
            <div className="lg:flex hidden">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 lg:text-[18px] text-[16px] font-semibold text-[#00B795] hover:text-[#22A587] flex items-center gap-2"
                    : "lg:text-[18px] text-[16px] font-semibold text-[#00B795] hover:text-[#22A587] flex items-center gap-2"
                }
              >
                <MdDashboard size={20} /> Dashboard
              </NavLink>
            </div>
          )}
          {user && !isDashboardRoute  && (
            <div className="lg:flex hidden">
              <img
                onClick={() => navigate("uProfile")}
                className="w-16 h-16 rounded-full cursor-pointer"
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
                className="md:px-4 cursor-pointer md:py-2 px-3 py-1 md:text-[18px] text-[13px] font-medium md:font-semibold bg-[#00B795] hover:bg-[#22A587] text-white rounded-sm flex items-center"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="md:text-[18px] text-[14px]  font-medium md:font-semibold text-[#00B795]  hover:text-[#22A587] "
              >
                Login
              </Link>
            )}
          </div>
          {!user && (
            <Link
              to="/register"
              className="md:px-4 md:py-2 px-3 py-1 md:text-[18px] text-[13px] font-medium md:font-semibold bg-[#00B795] hover:bg-[#22A587] text-white rounded-sm flex items-center"
            >
              Sign Up
            </Link>
          )}
        </div>
      </div>
      {/* menu bar*/}
      {menu && (
        <div
          ref={menuRef}
          className="w-[60%] absolute top-[18] p-4 bg-white border border-gray-300 shadow-md z-50 h-screen rounded-sm"
        >
          <div className="text-[16px] font-semibold flex flex-col gap-2">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-8 decoration-2 flex gap-2 items-center"
                  : "flex gap-2 items-center"
              }
              to="profile"
            >
              <span>
                <FaUserCircle />
              </span>
              Profile
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-8 decoration-2 flex gap-2 items-center"
                  : "flex gap-2 items-center"
              }
              to="/"
            >
              <span>
                <FaHome />
              </span>
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-8 decoration-2 flex gap-2 items-center"
                  : "flex gap-2 items-center"
              }
              to="/AllProduct"
            >
              <span>
                {" "}
                <FaBoxOpen />
              </span>
              All Products
            </NavLink>

            {user && (
              <>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "underline underline-offset-8 decoration-2 flex gap-2 items-center"
                      : "flex gap-2 items-center"
                  }
                  to="/dashboard"
                >
                  <span>
                    <MdDashboard />
                  </span>
                  Dashboard
                </NavLink>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <span>
                    <FaSignOutAlt />
                  </span>
                  Logout
                </button>
              </>
            )}
            {!user && (
              <>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "underline underline-offset-8 decoration-2 flex gap-2 items-center"
                      : "flex gap-2 items-center"
                  }
                  to="/login"
                >
                  <span>
                    <FaSignInAlt />
                  </span>
                  Login
                </NavLink>

                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "underline underline-offset-8 decoration-2 flex gap-2 items-center"
                      : "flex gap-2 items-center"
                  }
                  to="/register"
                >
                  <span>
                    <FaUserPlus />
                  </span>
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
