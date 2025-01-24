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
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('tokenType', tokenType);
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
//
// let isScheduled = false;
// export const scheduleTokenRefresh = () => {
//     if (isScheduled) {
//         console.log("Already scheduled");
//         return;
//     }
//
//     const accessToken = localStorage.getItem('accessToken');
//     if (!accessToken) return;
//     const checkFrequency = 0.25 * 60 * 1000;
//
//     setTimeout(async () => {
//         try {
//             const response = await instance.get(`/token/refresh`, {});
//             const newAccessToken = response.data.accessToken;
//             if (response.status === 200) {
//                 localStorage.setItem('accessToken', newAccessToken);
//                 scheduleTokenRefresh();
//                 isScheduled = true;
//                 console.log("Scheduled");
//             }
//         } catch (error) {
//             console.error("Failed to refresh access token:", error);
//             // localStorage.removeItem('accessToken');
//             // window.location.href = '/';
//         }
//     }, checkFrequency);
// }