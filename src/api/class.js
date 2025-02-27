import { executeRequest } from "../utils/apiUtils";

export const getAllClasses = async (axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.get("/classes"), 200, "Success");
};

export const getAllClassesSchool = async (id, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.get(`/schools/${id}/classes`), 200, "Success");
};

export const getAllClassesStudents = async (schoolId, axiosPrivateInstance) => {
    return executeRequest(
        () => axiosPrivateInstance.get(`/schools/${schoolId}/classes?include=students`),
        200,
        "Success"
    );
};

export const getAllClassesCourses = async (id, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.get(`/courses/${id}?include=classes`), 200, "Success");
};

export const getClassesSchedule = async (id, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.get(`/classes/${id}/schedules?include=course`), 200, "Success");
};

export const createClasses = async (data, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.post("/classes", data), 200, "Success");
};

export const deleteClasses = async (id, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.delete(`/classes/${id}`), 200, "Success");
};

export const addStudentsToClass = async (data, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.post("/classes", data), 200, "Success");
};
