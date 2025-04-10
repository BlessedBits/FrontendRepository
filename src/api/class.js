import { executeRequest } from "../utils/apiUtils";

export const getAllClasses = async (axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.get("/classes?include=teachers"), 200, "Success");
};

export const getAllClassesSchool = async (id, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.get(`/schools/${id}/classes`), 200, "Success");
};

export const getAllClassesWithHomeTeacher = async (id, axiosPrivateInstance) => {
    return executeRequest(
        () => axiosPrivateInstance.get(`/schools/${id}/classes?include=homeroomTeacher,students`),
        200,
        "Success"
    );
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
    return executeRequest(() => axiosPrivateInstance.post("/classes?include=homeroomTeacher", data), 201, "Success");
};

export const deleteClasses = async (id, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.delete(`/classes/${id}`), 200, "Success");
};

export const updateClass = async (id, data, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.put(`/classes/${id}`, data), 200, "Update");
};

export const addStudentsToClass = async (data, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.post("/classes", data), 200, "Success");
};
