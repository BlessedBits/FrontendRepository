import axios from "axios";

const Schedules_BASE_URL = 'https://ypgblessedbits.azurewebsites.net/schedules';
// const BASE_URL = 'http://localhost:8080/schedules';

const schedulesInstance = axios.create({
    baseURL: Schedules_BASE_URL,
    timeout: 5000,
});

schedulesInstance.interceptors.request.use(config => {
    const accessToken = localStorage.getItem("accessToken");
    const tokenType = localStorage.getItem("tokenType") || 'Bearer ';

    if (accessToken) {
        config.headers.Authorization = `${tokenType} ${accessToken}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
});

export const getScheduleById = async (id) => {
    try {
        const response = await schedulesInstance.get(`/${id}`);
        
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        if (error.response) {
            const { status } = error.response;
            switch (status) {
                case 404:
                    throw new Error(`Schedule not found with ID: ${id}`);
                case 401:
                    throw new Error('Unauthorized: Invalid access token.');
                case 500:
                    throw new Error('Internal Server Error: Failed to fetch schedule.');
                default:
                    throw new Error(`Unhandled response status: ${status}`);
            }
        }
        throw new Error(error.message || 'An unknown error occurred.');
    }
};
