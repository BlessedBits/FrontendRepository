export const handleError = (error) => {
    if (error.response) {
        const { status, data } = error.response;
        const errorMessages = {
            400: 'Incorrect data.',
            401: 'Unauthorized: Invalid access token.',
            403: 'Forbidden: You are not allowed to perform this action.',
            404: 'Resource not found.',
            500: 'Internal Server Error: Something went wrong on the server.',
        };
        throw new Error(errorMessages[status] || data?.message || `Unhandled response status: ${status}`);
    } else if (error.request) {
        throw new Error('No response from the server. Please try again later.');
    } else {
        throw new Error(error.message || 'An unknown error occurred.');
    }
};

export const executeRequest = async (request, successStatus = 200, successMessage = "Success") => {
    try {
        const response = await request(); 
        if (response?.status === successStatus) {
            return response.data || successMessage; 
        }
        throw new Error(`Unexpected response status: ${response.status}`); 
    } catch (error) {
        handleError(error); 
    }
};
