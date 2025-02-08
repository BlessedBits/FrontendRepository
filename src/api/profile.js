import { executeRequest } from '../utils/apiUtils';

export const getProfileInfo = async (axiosPrivateInstance) => {

    return executeRequest(
        () => axiosPrivateInstance.get('users/profile'),
        200,
        "Profile info in json"
    );
};

export const getProfileInfoById = async (id, axiosPrivateInstance) => {

    return executeRequest(
        () => axiosPrivateInstance.get(`users/profile/${id}`),
        200,
        "Profile info in json"
    );
};

export const updateProfileInfo = async (data, axiosPrivateInstance) => {
    if (!data.email && !data.username) {
        throw new Error('Either email or username, or both must be provided.');
    }

    return executeRequest(
        () => axiosPrivateInstance.post('users/update-info', data),
        201,
        "User info was updated successfully!"
    );
};

export const changePassword = async (oldPassword, newPassword, confirmPassword, axiosPrivateInstance) => {

    const data = { oldPassword, newPassword, confirmPassword };

    return executeRequest(
        () => axiosPrivateInstance.post('auth/change-password', data),
        200,
        "Password changed successfully."
    );
};

export const updateProfileImage = async (id, file, axiosPrivateInstance) => {
    if (!file) {
        throw new Error('No file provided.');
    }

    const formData = new FormData();
    formData.append('profileImage', file);

    return executeRequest(
        () =>
            axiosPrivateInstance.put(`users/${id}/image`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            }),
        200,
        "Image updated!"
    );
};
