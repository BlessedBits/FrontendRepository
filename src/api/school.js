import { executeRequest } from '../utils/apiUtils';

export const getSchoolContacts = async (id, axiosPrivateInstance) => 
    executeRequest(
        () => axiosPrivateInstance.get(`/school/${id}/contacts`),  
        "Сontacts found"
    );

export const getSchoolInfo = async (id, axiosPrivateInstance) => 
    executeRequest(
        () => axiosPrivateInstance.get(`/school/${id}`),  
        "Info found"
    );
export const getSchoolAchievements = async (id, axiosPrivateInstance) => 
    executeRequest(
        () => axiosPrivateInstance.get(`/school/${id}/achievements`),  
        "Info found"
    );

export const createSchoolAchievements = async (id, axiosPrivateInstance) => 
    executeRequest(
        () => axiosPrivateInstance.post(`/school/${id}/achievements/create`),  
        "Info found"
    );


export const getAllSchools = async (axiosPrivateInstance) => {
    const response = await axiosPrivateInstance.get('/schools/');
    if (response && response.status === 200) {
        return response.data;
    }
}