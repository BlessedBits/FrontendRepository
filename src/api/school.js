import { executeRequest } from '../utils/apiUtils';

export const getSchoolContacts = async (id, axiosPrivateInstance) => {

    return executeRequest(
        () => axiosPrivateInstance.get(`/schools/${id}/contacts`),
        200,
        "Profile info in json"
    );
};
export const getSchoolInfo = async (id, axiosPrivateInstance) => {
    return executeRequest(
        () => axiosPrivateInstance.get(`/schools/${id}`),  
        200, "Info found"
    );
};

export const getSchoolAchievements = async (id, axiosPrivateInstance) =>{
    return executeRequest(
        () => axiosPrivateInstance.get(`/schools/${id}/achievements`),  
        200, "Info found"
    );
};

export const createSchoolAchievements = async (id, axiosPrivateInstance) => {
    return executeRequest(
        () => axiosPrivateInstance.post(`/schools/${id}/achievements/create`),  
        200, "Info found"
    );
};


export const getAllSchools = async (axiosPrivateInstance) => {
    const response = await axiosPrivateInstance.get('/schools/');
    if (response && response.status === 200) {
        return response.data;
    }
}