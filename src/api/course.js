import { executeRequest } from "../utils/apiUtils";

export const getUserCourses = async (data, axiosPrivateInstance) => {
    const url = ["TEACHER", "SCHOOL_ADMIN"].includes(data.role)
        ? `schools/${data.schoolId}/courses?include=classes`
        : `classes/${data.userClassId}/courses`;

    return executeRequest(() => axiosPrivateInstance.get(url), 200);
};

export const getCourseInfo = async (id, axiosPrivateInstance) => {
    return executeRequest(
        () => axiosPrivateInstance.get(`/courses/${id}/modules?include=materials,assignments    `),
        200,
        "Course found"
    );
};

export const getModules = async (id, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.get(`/courses/${id}/modules`), 200, "Module found");
};

export const getMaterials = async (id, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.get(`/modules/${id}/materials`), 200, "Material found");
};

export const getAssignments = async (id, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.get(`/modules/${id}/assignments`), 200, "Assignments found");
};

export const createCourse = async (schoolId, teacherId, courseName, axiosPrivateInstance) => {
    if (!courseName || !teacherId) {
        throw new Error("Назва курсу та ID викладача є обов'язковими");
    }

    const teacherIds = Array.isArray(teacherId) ? teacherId : [teacherId];

    return executeRequest(
        () =>
            axiosPrivateInstance.post("/courses", {
                name: courseName,
                schoolId: schoolId,
                teacherIds,
            }),
        201,
        "Course created"
    );
};

export const connectCourseClass = async (classesId, courseId, axiosPrivateInstance) => {
    return executeRequest(
        () =>
            axiosPrivateInstance.post(`/classes/${classesId}/courses`, {
                courseId: courseId,
            }),
        200,
        "Connection created"
    );
};

export const delConnectCourseClass = async (classesId, courseId, axiosPrivateInstance) => {
    return executeRequest(
        () => axiosPrivateInstance.delete(`/classes/${classesId}/courses/${courseId}`),
        200,
        "Connection delete"
    );
};

export const createModule = async (data, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.post("/modules", data), 201, "Module created");
};

export const createMaterial = async (data, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.post("/materials", data), 201, "Material created");
};

export const createAssignment = async (data, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.post("/assignments", data), 201, "Assignment created");
};

export const createSubmission = async (courseId, moduleId, assignmentId, submissionUrl, axiosPrivateInstance) => {
    return executeRequest(
        () =>
            axiosPrivateInstance.post(
                "/courses/modules/assignments/submissions",
                { url: submissionUrl },
                { params: { courseId, moduleId, assignmentId } }
            ),
        201,
        "Submission created"
    );
};

export const gradeSubmission = async (submissionId, grade, axiosPrivateInstance) => {
    return executeRequest(
        () => axiosPrivateInstance.post("/courses/modules/assignments/submissions/grade", { submissionId, grade }),
        201,
        "Submission graded"
    );
};

export const updateCourse = async (id, data, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.put(`/courses/${id}`, data), 200, "Courses updated");
};

export const deleteCourse = async (id, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.delete(`/courses/${id}`), 200, "No content");
};

export const updateModule = async (id, data, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.put(`/modules/${id}`, data), 200, "Module updated");
};

export const deleteModule = async (id, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.delete(`/modules/${id}`), 200, "Module deleted");
};

export const updateMaterial = async (id, data, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.put(`/materials/${id}`, data), 200, "Material updated");
};

export const deleteMaterial = async (id, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.delete(`/materials/${id}`), 200, "Material deleted");
};

export const updateAssignment = async (id, data, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.put(`/assignments/${id}`, data), 200, "Assignment updated");
};

export const deleteAssignment = async (id, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.delete(`/assignments/${id}`), 200, "Assignment deleted");
};

export const updateSubmission = async (id, data, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.put(`/submissions/${id}`, data), 200, "Submission updated");
};

export const deleteSubmission = async (id, axiosPrivateInstance) => {
    return executeRequest(() => axiosPrivateInstance.delete(`/submissions/${id}`), 200, "Submission deleted");
};
