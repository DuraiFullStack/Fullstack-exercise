import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "./context/authContext";
import "../index.css";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Navbar />,
        children: [
            {
                path: "/tasks",
                element: <Home />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },
]);
//

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthContextProvider>
            <RouterProvider router={appRouter} />
        </AuthContextProvider>
    </React.StrictMode>
);
