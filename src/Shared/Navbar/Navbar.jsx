import React, { useEffect, useRef, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router";
import Logo from "../Logo/Logo";
import useAuth from "../../hook/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [menu, setMenu] = useState(false);
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
    <nav className="fixed bg-[#FFFFFF] top-0 left-0 w-full md:h-[96px] z-40 shadow-md">
      <div className="flex items-center md:py-4 py-3 px-2 md:px-0 md:container mx-auto">
        <div className="flex gap-4 items-center w-[50%] md:w-3/12">
          <div className="md:flex hidden">
            {" "}
            <Logo></Logo>
          </div>
          <button ref={buttonRef} className="md:hidden" onClick={handelMenu}>
            <CiMenuFries />
          </button>

          <h1 className="md:text-2xl text-[16px] font-bold">
            BazaarTracker <span className="text-[#00B795]">BD</span>
          </h1>
        </div>

        {/*NavLink profile and btn */}
        <div className=" md:w-9/12 flex  w-[50%] items-center md:gap-6 gap-2 justify-end">
          {/* Menu Links */}
          <div className="mx-4 hidden md:flex">
            <ul className="text-[18px] flex gap-6 justify-between font-semibold">
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
            </ul>
          </div>

          {user && (
            <div className="md:flex hidden">
              <Link
                to="/dashboard"
                className="text-[18px] font-semibold text-[#00B795] hover:text-[#22A587] flex items-center gap-2"
              >
                <MdDashboard size={20} /> Dashboard
              </Link>
            </div>
          )}
          {user && (
            <div className="md:flex hidden">
              <img
                onClick={() => navigate("profile")}
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
                className="md:px-4 md:py-2 px-3 py-1 md:text-[18px] text-[13px] font-medium md:font-semibold bg-[#00B795] hover:bg-[#22A587] text-white rounded-sm flex items-center"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="md:text-[18px] text-[13px]  font-medium md:font-semibold text-[#00B795]  hover:text-[#22A587] "
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
          className="w-[60%] absolute top-[-18] p-4 bg-yellow-100 z-50 h-screen rounded-sm"
        >
          <div className="text-[16px] font-semibold flex flex-col gap-2">
            <NavLink to="/">Home</NavLink>

            <NavLink to="/AllProduct">All Products</NavLink>

            {user && (
              <>
                <NavLink to="/dashboard">Dashboard</NavLink>

                <button onClick={logout}>Logout</button>
              </>
            )}
            {!user && (
              <>
                <NavLink to="/login">Login</NavLink>

                <NavLink to="/register">Sign Up</NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
