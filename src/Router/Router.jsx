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
import AllUsers from "../Pages/Dashboard/Admin/AllUsers/AllUsers";
import AllProducts from "../Pages/Dashboard/Admin/AllProducts/AllProducts";
import AllAdvertisements from "../Pages/Dashboard/Admin/AllAdvertisements/AllAdvertisements";
import ProductDetails from "../Pages/AllProduct/ProductDetails";
import Payment from "../Pages/Payment/Payment";
import AllOrders from "../Pages/Dashboard/Admin/AllOrders/AllOrders";
import ViewPriceTrends from "../Pages/Dashboard/Users/ViewPriceTrends/ViewPriceTrends";
import ManageWatchlist from "../Pages/Dashboard/Users/ManageWatchlist/ManageWatchlist";
import MyOrderList from "../Pages/Dashboard/Users/MyOrderList/MyOrderList";
import Forbidden from "../Pages/Forbidden/Forbidden";
import AdminRoute from "../Routes/AdminRoute";
import VendorRoute from "../Routes/VendorRoute";
import Profile from "../Pages/Profilr/Profile";
import AdminUpdateProduct from "../Pages/Dashboard/Admin/AllProducts/AdminUpdateProduct";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/terms",
        Component: Terms,
      },
      {
        path: "AllProduct",
        Component: AllProduct,
      },
      {
        path: "product-details/:id",
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "payment/:productId",
        Component: Payment,
      },
      {
        path: "Forbidden",
        Component: Forbidden,
      },
      {
        path: "profile",
        Component: Profile,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),

    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      //vendor
      {
        path: "add-product",
        element: (
          <VendorRoute>
            <AddProduct></AddProduct>
          </VendorRoute>
        ),
      },
      {
        path: "my-products",
        element: (
          <VendorRoute>
            <MyProduct></MyProduct>
          </VendorRoute>
        ),
      },
      {
        path: "add-ads",
        element: (
          <VendorRoute>
            <AddAdvertisement></AddAdvertisement>
          </VendorRoute>
        ),
      },
      {
        path: "my-ads",
        element: (
          <VendorRoute>
            <MyAdvertisements></MyAdvertisements>
          </VendorRoute>
        ),
      },
      {
        path: "update-product/:id",
        element: (
          <VendorRoute>
            <UpdateProduct></UpdateProduct>
          </VendorRoute>
        ),
      },

      //admin
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "all-products",
        element: (
          <AdminRoute>
            <AllProducts></AllProducts>
          </AdminRoute>
        ),
      },
      {
        path: "all-ads",
        element: (
          <AdminRoute>
            <AllAdvertisements></AllAdvertisements>
          </AdminRoute>
        ),
      },
      {
        path: "all-orders",
        element: (
          <AdminRoute>
            <AllOrders></AllOrders>
          </AdminRoute>
        ),
      },
      {
        path: "admin-updateProduct/:id",
        element: (
          <AdminRoute>
            <AdminUpdateProduct></AdminUpdateProduct>
          </AdminRoute>
        ),
      },
      //user route
      {
        path: "price-trends",
        Component: ViewPriceTrends,
      },
      {
        path: "watchlist",
        Component: ManageWatchlist,
      },
      {
        path: "my-orders",
        Component: MyOrderList,
      },
    ],
  },
]);
