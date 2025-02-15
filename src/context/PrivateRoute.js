import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getRole } from "../api/user";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { LoadingPage } from "../components/basic/LoadingAnimation";

const PrivateRoute = ({ element: Component, allowedRoles }) => {
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const [userRole, setUserRole] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [redirectPath, setRedirectPath] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await getRole(axiosPrivate);
                const role = response.length > 0 ? response[0].name : null;
                setUserRole(role);

                if (role === "PLATFORM_ADMIN" && location.pathname === "/school/") {
                    setRedirectPath("/admin-panel/");
                }
            } catch (err) {
                console.error(err);
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
        return <Navigate to={redirectPath} replace state={{ userRole }} />;
    }

    if (!userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
    }
<<<<<<< HEAD
=======

>>>>>>> d03617cca347e31b97ae840f99c391e07e0e9429
    return React.cloneElement(Component, { userRole });
};
export default PrivateRoute;
