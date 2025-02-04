import { executeRequest } from '../utils/apiUtils';

export const getRole = async (axiosPrivateInstance) => 
    executeRequest(
        () => axiosPrivateInstance.get(`/users/role`),  
        200, "Role"
    );

export const getUserId = async (axiosPrivateInstance) => 
    executeRequest(
        () => axiosPrivateInstance.get(`/users/my-id`),  
        200, "Role"
    );

export const getUserSchool = async (axiosPrivateInstance) => 
    executeRequest(
        () => axiosPrivateInstance.get(`/users/school-id`),  
        200, "School found"
    );