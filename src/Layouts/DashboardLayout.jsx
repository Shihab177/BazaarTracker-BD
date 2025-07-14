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


const DashboardLayout = () => {
 
  const role ='vendor'
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        <div className="navbar border-red-400 border bg-base-300 lg:hidden w-full">
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
                className="inline-block h-6 w-6 stroke-current"
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
          <div className="mx-2 flex-1 px-2 ">Dashboard</div>
        </div>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu   bg-base-200  text-base-content text-[22px] min-h-full w-80 p-4 shadow-2xl">
          {/* Sidebar content here */}
          
          <Link className="flex gap-3 items-center" to='/'> <Logo></Logo> <span className="text-[24px] font-semibold">BazaarTracker <span className="text-[#00B795] ">BD</span> </span></Link>
          
          {role === "vendor" && (
            <>
            
              
               <li className="mt-5">  <NavLink
                  to="/dashboard/add-product"
                  
                  className={({ isActive }) => isActive ? "bg-[#00B795] text-white " : undefined}
                >
                  <MdAddShoppingCart className="" />
                  Add Product
                </NavLink>
               </li>
            

              <li className="  gap-2">
                <NavLink
                  to="/dashboard/my-products"
                  className={({ isActive }) => isActive ? "bg-[#00B795] text-white " : undefined}
                >
                  <MdViewList />
                  My Products
                </NavLink>
              </li>

              <li className="  gap-2">
                <NavLink
                  to="/dashboard/add-ads"
                  className={({ isActive }) => isActive ? "bg-[#00B795] text-white " : undefined}
                >
                  <RiAdvertisementLine />
                  Add Advertisement
                </NavLink>
              </li>

              <li className="  gap-2">
                <NavLink
                  to="/dashboard/my-ads"
                  className={({ isActive }) => isActive ? "bg-[#00B795] text-white " : undefined}
                >
                  <TbListDetails />
                  My Advertisements
                </NavLink>
              </li>
            </>
          )}
          {role === "admin" && (
            <>
              <li className=" mt-5 gap-2">
                <NavLink
                  to="/dashboard/all-users"
                  className={({ isActive }) => isActive ? "bg-[#00B795] text-white " : undefined}
                >
                  <FaUsers />
                  All Users
                </NavLink>
              </li>

              <li className="  gap-2">
                <NavLink
                  to="/dashboard/all-products"
                  className={({ isActive }) => isActive ? "bg-[#00B795] text-white" : undefined}
                >
                  <MdShoppingBasket />
                  All Products
                </NavLink>
              </li>

              <li className="  gap-2">
                <NavLink
                  to="/dashboard/all-ads"
                  className={({ isActive }) => isActive ? "bg-[#00B795] text-white " : undefined}
                >
                  <RiAdvertisementLine />
                  All Advertisements
                </NavLink>
              </li>

              <li className="  gap-2">
                <NavLink
                  to="/dashboard/all-orders"
                  className={({ isActive }) => isActive ? "bg-[#00B795] text-white " : undefined}
                >
                  <FaShoppingCart />
                  All Orders
                </NavLink>
              </li>
            </>
          )}
          {role === "user" && (
            <>
              <li className=" mt-5 gap-2">
                <NavLink
                  to="/dashboard/price-trends"
                  className={({ isActive }) => isActive ? "bg-[#00B795] text-white " : undefined}
                >
                  <MdTimeline />
                  Price Trends
                </NavLink>
              </li>

              <li className="  gap-2">
                <NavLink
                  to="/dashboard/watchlist"
                  className={({ isActive }) => isActive ? "bg-[#00B795] text-white " : undefined}
                >
                  <FaRegEye />
                  My Watchlist
                </NavLink>
              </li>

              <li className="  gap-2">
                <NavLink
                  to="/dashboard/my-orders"
                  className={({ isActive }) => isActive ? "bg-[#00B795] text-white " : undefined}
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
  );
};

export default DashboardLayout;
