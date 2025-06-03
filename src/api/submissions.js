import { executeRequest } from "../utils/apiUtils";

export const createSubmissions = async (data, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.post(`/submissions`, data), 201, "Submissions create");
};
