import { executeRequest } from "../utils/apiUtils";

export const getAllClasses = async (axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.get("/classes"), 200, "Success");
};

export const getAllClassesSchool = async (data, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.get(`/schools/${data.schoolId}/classes`), 200, "Success");
};

export const getAllClassesCourses = async (id, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.get(`/courses/${id}?include=classes`), 200, "Success");
};
