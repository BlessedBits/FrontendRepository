import { executeRequest } from "../utils/apiUtils";

export const addUser = async (id, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.get(`/users/${id}?include=school`), 200);
};

export const updateRole = async (id, data, axiosPrivateInstance) =>
    executeRequest(() => axiosPrivateInstance.put(`/users/${id}/role`, data), 200, "Role");

export const getUserInfo = async (id, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.get(`/users/${id}?include=school,courses`), 200);
};

export const updateUserName = async (id, data, axiosPrivateInstance) => {
    if (!data.firstName || !data.lastName) {
        throw new Error("both must be provided.");
    }

    return executeRequest(
        () => axiosPrivateInstance.put(`/users/${id}/name`, data),
        200,
        "User name was updated successfully!"
    );
};

export const getBaseInfo = async (userId = 0, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.get(`/users/${userId}`), 200);
};

export const changePasswordAdmin = async (userId, data, axiosPrivateInstance) => {
    return executeRequest(
        () => axiosPrivateInstance.get(`/users/${userId}`, data),
        200,
        "Password changed successfully."
    );
};
