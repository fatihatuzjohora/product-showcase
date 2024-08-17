import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../layout/Home";
import Categories from "../pages/Category/Categories";
import AllProducts from "../pages/AllProducts/AllProducts";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";

const route = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/',
                element: <Home/>,
            },
            {
                path: '/categories',
                element: <Categories/>,
            },
            {
                path: '/allProducts',
                element: <AllProducts/>
            },
            {
                path: '/about',
                element: <AboutUs/>
            },
            {
                path: '/contact',
                element: <ContactUs/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            }
        ]
    }
])

export default route;