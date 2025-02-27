import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getBaseInfo } from "../api/user";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { LoadingPage } from "../components/basic/LoadingAnimation";

const PrivateRoute = ({ element: Component, allowedRoles }) => {
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const [baseInfo, setBaseInfo] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [redirectPath, setRedirectPath] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await getBaseInfo(0, axiosPrivate);
                setBaseInfo(response);

                if (response.role === "PLATFORM_ADMIN" && location.pathname === "/school/") {
                    setRedirectPath("/admin-panel/");
                }
            } catch (err) {
                setError("Не вдалося завантажити інформацію профілю.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [axiosPrivate, location.pathname]);

    if (loading) {
        return <LoadingPage />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (redirectPath) {
        return <Navigate to={redirectPath} replace state={{ baseInfo }} />;
    }

    if (!baseInfo || !allowedRoles.includes(baseInfo.role)) {
        return <Navigate to="/unauthorized" replace />;
    }
    return React.cloneElement(Component, { baseInfo });
};
export default PrivateRoute;
