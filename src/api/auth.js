import axios from "./axios";

export const login = async (username, password, rememberMe, setAuth, navigate) => {
    try {
        const response = await axios.post(`/auth/login`, { username, password }, {
            headers: { 'Content-type': 'application/json' },
            params: { rememberMe: rememberMe },
            withCredentials: true,
        });

        const { accessToken, tokenType } = response?.data;
        setAuth({ accessToken, tokenType });

        navigate('/school/');
    } catch (err) {
        if (!err?.response) {
            throw new Error("Немає відповіді від сервера. Перевірте підключення до інтернету.");
        } else if (err.response?.status === 400) {
            throw new Error("Невірний логін або пароль.");
        } else if (err.response?.status === 404) {
            throw new Error("Користувача з таким логіном не знайдено.");
        } else if (err.response?.status === 401) {
            throw new Error("Невірний логін або пароль.");
        } else if (err.response?.status === 500) {
            throw new Error("Помилка сервера. Спробуйте пізніше.");
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
