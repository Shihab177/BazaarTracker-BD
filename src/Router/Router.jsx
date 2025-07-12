import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Terms from "../Pages/Terms/Terms";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import AllProduct from "../Pages/AllProduct/AllProduct";
import PrivateRoute from "../Routes/PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import MyProduct from "../Pages/Dashboard/MyProduct/MyProduct";
import AddAdvertisement from "../Pages/Dashboard/AddAdvertisement/AddAdvertisement";
import MyAdvertisements from "../Pages/Dashboard/MyAdvertisements/MyAdvertisements";
import UpdateProduct from "../Pages/Dashboard/MyProduct/UpdateProduct/UpdateProduct";


export const router = createBrowserRouter([
    {
        path:'/',
        Component:RootLayout,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path:'/terms',
                Component:Terms
            },
            {
                path:'AllProduct',
                Component:AllProduct
            }
        ]
        
    },
    {
        path:'/',
        Component:AuthLayout,
        children:[
            {
                path:'login',
                Component:Login
            },
            {
                path:'register',
                Component:Register
            }
        ]
    },
    {
        path:'/dashboard',
       element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children:[
            //vendor
            {
                path:'add-product',
                Component:AddProduct
            },
            {
                path:'my-products',
                Component:MyProduct
            },
            {
                path:'add-ad',
                Component:AddAdvertisement
            },
            {
                path:'my-ads',
                Component:MyAdvertisements
            },
            {
                path:'update-product/:id',
                Component:UpdateProduct
            }
        ]
    }
])