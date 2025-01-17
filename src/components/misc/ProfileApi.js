import axios from "axios";

const USERS_BASE_URL = 'https://ypgblessedbits.azurewebsites.net/';
// const USERS_BASE_URL = 'http://localhost:8080/users';

const usersInstance = axios.create({
    baseURL: USERS_BASE_URL,
});

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

export const updateProfileInfo = async (data) => {
    try {
        if (!data.email && !data.username) {
            throw new Error('Either email or username, or both must be provided.');
        }

        const response = await usersInstance.post('users/update-info', data);

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

export const changePassword = async (oldPassword, newPassword, confirmPassword) => {
    try {
        if (!oldPassword || !newPassword || !confirmPassword) {
            throw new Error('All fields (oldPassword, newPassword, confirmPassword) are required.');
        }

        if (newPassword !== confirmPassword) {
            throw new Error('New passwords do not match.');
        }

        const data = { oldPassword, newPassword, confirmPassword };

        const response = await usersInstance.post('auth/change-password', data);

        if (response.status === 200) {
            return response.data || "Password changed successfully.";
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;

            switch (status) {
                case 400:
                    throw new Error(data?.message || 'Invalid request: Old password is incorrect or new passwords do not match.');
                case 404:
                    throw new Error('User not found!');
                case 401:
                    throw new Error('Unauthorized: Invalid access token.');
                case 500:
                    throw new Error('Internal Server Error.');
                default:
                    throw new Error(`Unhandled error: ${status} - ${data?.message || error.message}`);
            }
        }

        // Generic fallback for unknown errors
        throw new Error(error.message || 'An unknown error occurred.');
    }
};


// Update profile image
export const updateProfileImage = async (file) => {
    if (!file) {
        throw new Error('No file provided.');
    }

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
        const response = await usersInstance.post('users/update-profile-image', formData, {
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
