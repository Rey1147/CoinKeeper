import {createBrowserRouter} from "react-router-dom";
import Layout from "../pages/Layout.tsx";
import ErrorPage from "../pages/ErrorPage.tsx";
import Home from "../pages/Home.tsx";
import Transaction from "../pages/Transaction.tsx";
import Categories from "../pages/Categories.tsx";
import Auth from "../pages/Auth.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: 'transactions',
                element: <Transaction/>
            },
            {
                path: 'categories',
                element: <Categories/>
            },
            {
                path: 'auth',
                element: <Auth/>
            }

        ]
    }
])