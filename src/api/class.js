import { executeRequest } from "../utils/apiUtils";

export const getAllClasses = async (axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.get("/classes"), 200, "Success");
};

export const getAllClassesSchool = async (schoolId, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.get(`/schools/${schoolId}/classes`), 200, "Success");
};

export const getAllClassesStudents = async (data, axiosPrivateInstance) => {
    return executeRequest(
        () => axiosPrivateInstance.get(`/schools/${data.schoolId}/classes?include=students`),
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
