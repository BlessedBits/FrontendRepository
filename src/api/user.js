import { executeRequest } from "../utils/apiUtils";

export const getRole = async (axiosPrivateInstance) =>
    executeRequest(() => axiosPrivateInstance.get(`/users/roles`), 200, "Role");

export const getUserId = async (axiosPrivateInstance) =>
    executeRequest(() => axiosPrivateInstance.get(`/users/my-id`), 200, "ID");

export const getUserSchool = async (axiosPrivateInstance) =>
    executeRequest(() => axiosPrivateInstance.get(`/users/school-id`), 200, "School found");

export const updateUserName = async (id, data, axiosPrivateInstance) => {
    if (!data.firstName || !data.lastName) {
        throw new Error("both must be provided.");
    }

    return executeRequest(
        () => axiosPrivateInstance.put(`/users/update-name/${id}`, data),
        200,
        "User name was updated successfully!"
    );
};

export const getBaseInfo = async (userId, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.get(`/users/${userId}`), 200);
};
