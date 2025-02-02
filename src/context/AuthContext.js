import { createContext, useContext, useState, useEffect } from "react";
import { getRole } from "../api/user";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const axiosPrivate = useAxiosPrivate();
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const role = await getRole(axiosPrivate);
                setUserRole(role);
            } catch (err) {
                console.error("Помилка отримання ролі:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRole();
    }, [axiosPrivate]);

    return (
        <AuthContext.Provider value={{ userRole, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
