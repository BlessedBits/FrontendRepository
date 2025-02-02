import { executeRequest } from '../utils/apiUtils';

export const getRole = async (axiosPrivateInstance) => 
    executeRequest(
        () => axiosPrivateInstance.get(`/users/role`),  
        200, "Role"
    );