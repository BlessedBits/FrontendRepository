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

export const updateSchoolInfo = async (data, axiosPrivateInstance) => {
    return executeRequest(
        () => axiosPrivateInstance.put(`/schools/update-info`, data),  
        200, "Data updated!"
    );
};


export const getAllSchools = async (axiosPrivateInstance) => {
    const response = await axiosPrivateInstance.get('/schools/');
    if (response && response.status === 200) {
        return response.data;
    }
}