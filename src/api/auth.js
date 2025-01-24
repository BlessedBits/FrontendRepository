import axios from "./axios"

export const login = async (username, password, rememberMe, setAuth) => {
    try {
        const response = await axios.post(`/auth/login`, {username, password},
            {
                headers: { 'Content-type': 'application/json' },
                params: {rememberMe: rememberMe},
                withCredentials: true,
            });
        const {accessToken, tokenType} = response?.data;
        setAuth({accessToken, tokenType});
    } catch (err) {
        if (!err?.response) {
            console.error('No server response');
        } else {
            console.error(err);
        }
    }
}

export const register = async (username, password, email = null) => {
    const response = await axios.post(`/auth/register`, {username, password, email});
    if (response.status !== 201) {
        throw new Error(response.statusText);
    }
    return response.data;
}
