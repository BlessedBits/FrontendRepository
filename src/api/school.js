import { executeRequest } from "../utils/apiUtils";

export const getAllSchools = async (axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.get(`/schools`), 200, "Info found");
};

export const getAllUserSchools = async (id, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.get(`/schools/${id}?include=users`), 200, "Users found");
};

export const getSchoolInfo = async (axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.get(`/schools/school`), 200, "Info found");
};

export const getSchoolAchievements = async (axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.get(`/schools/achievements`), 200, "Info found");
};

export const getSchoolGallery = async (axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.get(`/schools/all-gallery-images`), 200, "Gallery load");
};

export const getSchoolTeachers = async (id = 0, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.get(`/schools/${id}/teachers`), 200, "DATA load");
};

export const getSchoolContacts = async (axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.get(`/schools/contacts`), 200, "Profile info in json");
};

export const createSchool = async (data, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.post(`/schools`, data), 201, "School object");
};

export const createSchoolAchievements = async (data, axiosPrivateInstance) => {
    return executeRequest(
        () => axiosPrivateInstance.post(`/schools/achievements/create`, data),
        201,
        "Achievement create"
    );
};

export const createSchoolFoto = async (data, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.post(`/schools/add-gallery-image`, data), 201, "Foto add");
};

export const updateSchoolAchievements = async (id, data, axiosPrivateInstance) => {
    return executeRequest(
        () => axiosPrivateInstance.put(`/schools/achievements/${id}`, data),
        200,
        "Achievements updated!"
    );
};

export const updateSchoolInfo = async (id, data, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.put(`/schools/${id}/info`, data), 200, "Data updated!");
};

export const updateSchoolContacts = async (data, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.put(`/schools/update-contacts`, data), 200, "Contacts updated!");
};

export const deleteSchoolAchievements = async (id, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.delete(`/schools/achievements/${id}`), 204, "No content");
};

export const deleteSchoolFoto = async (image, axiosPrivateInstance) => {
    return executeRequest(
        () =>
            axiosPrivateInstance.delete(`/schools/delete-gallery-image`, {
                params: { image },
            }),
        204,
        "No content"
    );
};
