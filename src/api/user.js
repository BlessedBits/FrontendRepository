import { executeRequest } from "../utils/apiUtils";

export const getRole = async (axiosPrivateInstance) =>
    executeRequest(() => axiosPrivateInstance.get(`/users/role`), 200, "Role");

export const getUserId = async (axiosPrivateInstance) =>
    executeRequest(() => axiosPrivateInstance.get(`/users/my-id`), 200, "ID");

export const getUserSchool = async (axiosPrivateInstance) =>
    executeRequest(() => axiosPrivateInstance.get(`/users/school-id`), 200, "School found");

export const updateUserName = async (id, data, axiosPrivateInstance) => {
    if (!data.firstName && !data.lastName) {
        throw new Error("Either email or username, or both must be provided.");
    }

    return executeRequest(
        () => axiosPrivateInstance.put(`/users/update-name/${id}`, data),
        200,
        "User name was updated successfully!"
    );
};
