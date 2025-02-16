import axios from "./axios";

export const login = async (username, password, rememberMe, setAuth) => {
    try {
        const response = await axios.post(
            `/auth/login`,
            { username, password },
            {
                headers: { "Content-type": "application/json" },
                params: { rememberMe },
                withCredentials: true,
            }
        );

        const { accessToken, tokenType } = response?.data;
        setAuth({ accessToken, tokenType });
        return true; // Indicate success
    } catch (err) {
        if (err.response?.status === 401) {
            throw new Error("User");
        } else if (err.response?.status === 500) {
            throw new Error("Server");
        } else {
            throw new Error("Щось пішло не так. Спробуйте ще раз.");
        }
    }
};

export const register = async (username, password, email = null) => {
    const response = await axios.post(`/auth/register`, { username, password, email });
    if (response.status !== 201) {
        throw new Error(response.statusText);
    }
    return response.data;
};
