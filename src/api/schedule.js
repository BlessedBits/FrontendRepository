import { executeRequest } from '../utils/apiUtils';

export const getAllSchedules = async (axiosPrivateInstance) => 
    executeRequest(
        () => axiosPrivateInstance.get('/'),
        200
    );

export const getScheduleById = async (id, axiosPrivateInstance) => 
    executeRequest(
        () => axiosPrivateInstance.get(`/${id}`),
        200,
        `Schedule fetched successfully with ID: ${id}`
    );
