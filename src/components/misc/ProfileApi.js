import axios from "axios";

// Base URL for the users service
const USERS_BASE_URL = 'https://ypgblessedbits.azurewebsites.net/users';
// const USERS_BASE_URL = 'http://localhost:8080/users';

// Axios instance for the users service
const usersInstance = axios.create({
    baseURL: USERS_BASE_URL,
});

// Interceptor to attach the Authorization header
usersInstance.interceptors.request.use(config => {
    const accessToken = localStorage.getItem("accessToken");
    const tokenType = localStorage.getItem("tokenType") || 'Bearer ';

    if (accessToken) {
        config.headers.Authorization = `${tokenType}${accessToken}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
});

// Update profile info
export const updateProfileInfo = async (data) => {
    try {
        if (!data.email && !data.username) {
            throw new Error('Either email or username, or both must be provided.');
        }

        const response = await usersInstance.post('/update-info', data);

        if (response.status === 201) {
            return "User info was updated successfully!";
        }
    } catch (error) {
        if (error.response) {
            const { status, data: message } = error.response;
            switch (status) {
                case 400:
                    throw new Error(message || 'Bad Request: Invalid input.');
                case 404:
                    throw new Error('User not found!');
                case 401:
                    throw new Error('Unauthorized: Invalid access token.');
                case 500:
                    throw new Error('Internal Server Error: Failed to send verification token to email.');
                default:
                    throw new Error(`Unhandled response status: ${status}`);
            }
        }
        throw new Error(error.message || 'An unknown error occurred.');
    }
};

// Update profile image
export const updateProfileImage = async (file) => {
    if (!file) {
        throw new Error('No file provided.');
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await usersInstance.post('/update-profile-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 200) {
            return "Image updated!";
        }
    } catch (error) {
        if (error.response) {
            const { status } = error.response;
            switch (status) {
                case 401:
                    throw new Error('Unauthorized: Invalid access token.');
                case 500:
                    throw new Error('Internal Server Error: Failed to save image to the storage cloud.');
                default:
                    throw new Error(`Unhandled response status: ${status}`);
            }
        }
        throw new Error(error.message || 'An unknown error occurred.');
    }
};
