import { executeRequest } from '../utils/apiUtils';

export const getAllClasses = async (axiosPrivateInstance) => {
    return (
        executeRequest(
            () => axiosPrivateInstance.get('/classes/'),
            200, 'Success'
        )
    );
};
  