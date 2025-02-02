import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getRole } from "../api/user";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { LoadingPage } from "../components/basic/LoadingAnimation";

const PrivateRoute = ({ element: Component, allowedRoles }) => {
    const axiosPrivate = useAxiosPrivate();
    const [userRole, setUserRole] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const role = await getRole(axiosPrivate);
                setUserRole(role);
            } catch (err) {
                console.error(err);
                setError("Не вдалося завантажити інформацію профілю.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [axiosPrivate]);

    if (loading) {
        return <LoadingPage />;
    }
    if (error) {
        return <p>{error}</p>;
    }

    if (!userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return Component;
};

export default PrivateRoute;
