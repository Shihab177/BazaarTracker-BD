import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Terms from "../Pages/Terms/Terms";


export const router = createBrowserRouter([
    {
        path:'/',
        Component:RootLayout,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:'/terms',
                Component:Terms
            }
        ]
        
    }
])