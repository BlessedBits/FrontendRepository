import axios from "axios";

const BASE_URL = 'https://ypgblessedbits.azurewebsites.net/schools';
// const BASE_URL = 'http://localhost:8080/schools';

const instance = axios.create({
    baseURL: BASE_URL,
})

instance.interceptors.request.use(config => {
    const accessToken = localStorage.getItem("accessToken");
    const tokenType = localStorage.getItem("tokenType") || 'Bearer ';

    if (accessToken) {
        config.headers.Authorization = `${tokenType}${accessToken}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
})

export const getAllSchools = async () => {
    const response = await instance.get('/');
    if (response && response.status === 200) {
        return response.data;
    }
}