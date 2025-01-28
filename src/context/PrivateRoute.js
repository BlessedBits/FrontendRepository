import React from "react";
import { Navigate } from "react-router-dom";

const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find(row => row.startsWith(`${name}=`));
    return cookie ? cookie.split('=')[1] : null;
};

const PrivateRoute = ({ element: Component }) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = getCookie("refreshToken");

    const isAuthenticated = accessToken || refreshToken;

    return isAuthenticated ? Component : <Navigate to="/" replace />;
};

export default PrivateRoute;
