import { executeRequest } from '../utils/apiUtils';

export const getSchoolInfo = async (SchoolId, axiosPrivateInstance) => 
    executeRequest(
        () => axiosPrivateInstance.post('/school/', { id: SchoolId }),
        200,
        "Info found"
    );

export const getAllSchools = async (axiosPrivateInstance) => {
    const response = await axiosPrivateInstance.get('/schools/');
    if (response && response.status === 200) {
        return response.data;
    }
}