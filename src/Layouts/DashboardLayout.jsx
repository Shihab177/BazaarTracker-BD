import React, { Profiler } from "react";
import { Link, Outlet } from "react-router";

import Logo from "../Shared/Logo/Logo";
import { NavLink } from "react-router";
import {
  MdAddShoppingCart,
  MdShoppingBasket,
  MdTimeline,
  MdViewList,
} from "react-icons/md";
import { RiAdvertisementLine } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import {
  FaRegEye,
  FaShoppingBag,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";
import { FiHome, FiUser } from "react-icons/fi"; 
import useUserRole from "../hook/useUserRole";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  console.log(role);
  return (
    <div>
      {/* <div className="lg:flex hidden"><Navbar></Navbar></div> */}
      <div className="drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col ">
          <div className="navbar bg-gray-50 shadow-md text-gray-800 lg:hidden w-full">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            
            <p className="mx-2 flex-1 px-2 text-2xl font-semibold ">Dashboard</p>
          </div>

          <div>
            {" "}
            <Outlet></Outlet>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu   bg-base-200  text-base-content xl:text-[22px] md:text-[18px] text-[16px] min-h-full xl:w-80 w-70   shadow-2xl dark:bg-[#F8F8F8] dark:text-gray-800">
            {/* Sidebar content here */}

            <Link className="flex gap-3 items-center" to="/">
              {" "}
              <Logo></Logo>{" "}
              <span className="text-[24px] font-semibold">
                BazaarTracker <span className="text-[#00B795] ">BD</span>{" "}
              </span>
            </Link>
            <hr className="border mt-4 border-dashed" />
            {roleLoading && (
              <p className="w-full text-center font-semibold">Loading.....</p>
            )}
            <li className="w-full mt-5">
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#00B795] px-3 py-1  rounded-md text-white"
                    : undefined
                }
              >
                <FiHome className="text-lg" />
                Overview
              </NavLink>
            </li>
            <li>
              <NavLink
              to='/dashboard/profile'
               className={({ isActive }) =>
                  isActive
                    ? "bg-[#00B795] px-3 py-1  rounded-md text-white"
                    : undefined
                }>
                   <FiUser className="text-lg" />
                Profile
              </NavLink>
            </li>
            {!roleLoading && role === "vendor" && (
              <>
                <li className="">
                  {" "}
                  <NavLink
                    to="/dashboard/add-product"
                    className={({ isActive }) =>
                      isActive ? "bg-[#00B795] text-white " : undefined
                    }
                  >
                    <MdAddShoppingCart className="" />
                    Add Product
                  </NavLink>
                </li>

                <li className="  gap-2">
                  <NavLink
                    to="/dashboard/my-products"
                    className={({ isActive }) =>
                      isActive ? "bg-[#00B795] text-white " : undefined
                    }
                  >
                    <MdViewList />
                    My Products
                  </NavLink>
                </li>

                <li className="  gap-2">
                  <NavLink
                    to="/dashboard/add-ads"
                    className={({ isActive }) =>
                      isActive ? "bg-[#00B795] text-white " : undefined
                    }
                  >
                    <RiAdvertisementLine />
                    Add Advertisement
                  </NavLink>
                </li>

                <li className="  gap-2">
                  <NavLink
                    to="/dashboard/my-ads"
                    className={({ isActive }) =>
                      isActive ? "bg-[#00B795] text-white " : undefined
                    }
                  >
                    <TbListDetails />
                    My Advertisements
                  </NavLink>
                </li>
              </>
            )}
            {!roleLoading && role === "admin" && (
              <>
                <li className="  gap-2">
                  <NavLink
                    to="/dashboard/all-users"
                    className={({ isActive }) =>
                      isActive ? "bg-[#00B795] text-white " : undefined
                    }
                  >
                    <FaUsers />
                    All Users
                  </NavLink>
                </li>

                <li className="  gap-2">
                  <NavLink
                    to="/dashboard/all-products"
                    className={({ isActive }) =>
                      isActive ? "bg-[#00B795] text-white" : undefined
                    }
                  >
                    <MdShoppingBasket />
                    All Products
                  </NavLink>
                </li>

                <li className="  gap-2">
                  <NavLink
                    to="/dashboard/all-ads"
                    className={({ isActive }) =>
                      isActive ? "bg-[#00B795] text-white " : undefined
                    }
                  >
                    <RiAdvertisementLine />
                    All Advertisements
                  </NavLink>
                </li>

                <li className="  gap-2">
                  <NavLink
                    to="/dashboard/all-orders"
                    className={({ isActive }) =>
                      isActive ? "bg-[#00B795] text-white " : undefined
                    }
                  >
                    <FaShoppingCart />
                    All Orders
                  </NavLink>
                </li>
              </>
            )}
            {!roleLoading && role === "user" && (
              <>
                <li className="  gap-2">
                  <NavLink
                    to="/dashboard/price-trends"
                    className={({ isActive }) =>
                      isActive ? "bg-[#00B795] text-white " : undefined
                    }
                  >
                    <MdTimeline />
                    Price Trends
                  </NavLink>
                </li>

                <li className="  gap-2">
                  <NavLink
                    to="/dashboard/watchlist"
                    className={({ isActive }) =>
                      isActive ? "bg-[#00B795] text-white " : undefined
                    }
                  >
                    <FaRegEye />
                    Manage Watchlist
                  </NavLink>
                </li>

                <li className="  gap-2">
                  <NavLink
                    to="/dashboard/my-orders"
                    className={({ isActive }) =>
                      isActive ? "bg-[#00B795] text-white " : undefined
                    }
                  >
                    <FaShoppingBag />
                    My Orders
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default DashboardLayout;
