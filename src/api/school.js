import { executeRequest } from '../utils/apiUtils';

export const getSchoolContacts = async (axiosPrivateInstance) => {

    return executeRequest(
        () => axiosPrivateInstance.get(`/schools/contacts`),
        200,
        "Profile info in json"
    );
};
export const getSchoolInfo = async (axiosPrivateInstance) => {
    return executeRequest(
        () => axiosPrivateInstance.get(`/schools/school`),  
        200, "Info found"
    );
};

export const getSchoolAchievements = async (axiosPrivateInstance) =>{
    return executeRequest(
        () => axiosPrivateInstance.get(`/schools/achievements`),  
        200, "Info found"
    );
};

export const createSchoolAchievements = async (data, axiosPrivateInstance) => {
    return executeRequest(
        () => axiosPrivateInstance.post(`/schools/achievements/create`, data),  
        201, "Achievement create"
    );
};

export const updateSchoolAchievements = async (id, data, axiosPrivateInstance) => {
    return executeRequest(
        () => axiosPrivateInstance.put(`/schools/achievements/${id}`, data),  
        200, "Achievements updated!"
    );
};


export const updateSchoolInfo = async (data, axiosPrivateInstance) => {
    return executeRequest(
        () => axiosPrivateInstance.put(`/schools/update-info`, data),  
        200, "Data updated!"
    );
};

export const deleteSchoolAchievements = async (id, axiosPrivateInstance) => {
    return executeRequest(
        () => axiosPrivateInstance.delete(`/schools/achievements/${id}`),  
        204, "No content"
    );
};

export const getAllSchools = async (axiosPrivateInstance) => {
    const response = await axiosPrivateInstance.get('/schools/');
    if (response && response.status === 200) {
        return response.data;
    }
}