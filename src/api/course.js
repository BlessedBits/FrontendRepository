import { executeRequest } from "../utils/apiUtils";

export const getUserCourses = async (
    userId,
    userRole,
    axiosPrivateInstance
) => {
    try {
        const data = await executeRequest(
            () => axiosPrivateInstance.get(`users/${userId}`),
            200
        );

        if (!data) {
            throw new Error("Не вдалося отримати дані користувача.");
        }
        const url =
            userRole === "SCHOOL_ADMIN"
                ? `schools/${data.schoolId}/courses?include=modules`
                : `classes/${data.userClassId}/courses?include=modules`;

        return await executeRequest(() => axiosPrivateInstance.get(url), 200);
    } catch (err) {
        console.error("Помилка при отриманні курсів:", err.message);
        throw new Error("Не вдалося отримати курси. Спробуйте пізніше.");
    }
};

export const getModules = async (id, axiosPrivateInstance) => {
    return executeRequest(
        () => axiosPrivateInstance.get(`/courses/${id}/modules`),
        200,
        "Module found"
    );
};

export const getMaterials = async (id, axiosPrivateInstance) => {
    return executeRequest(
        () => axiosPrivateInstance.get(`modules/${id}/materials`),
        200,
        "Material found"
    );
};

export const getaAssignments = async (id, axiosPrivateInstance) => {
    return executeRequest(
        () => axiosPrivateInstance.get(`/modules/${id}/assignments`),
        200,
        "Assignments found"
    );
};

export const createCourse = async (
    teacherId,
    courseName,
    axiosPrivateInstance
) => {
    if (!courseName || !teacherId) {
        throw new Error("Назва курсу та ID викладача є обов'язковими");
    }

    const teacherIds = Array.isArray(teacherId) ? teacherId : [teacherId];

    return executeRequest(
        () =>
            axiosPrivateInstance.post("/courses", {
                name: courseName,
                teacherIds,
            }),
        201,
        "Course created"
    );
};

export const createModule = async (
    courseId,
    moduleName,
    axiosPrivateInstance
) => {
    return executeRequest(
        () =>
            axiosPrivateInstance.post(
                "/courses/modules",
                { name: moduleName },
                { params: { courseId } }
            ),
        201,
        "Module created"
    );
};

export const createMaterial = async (
    courseId,
    moduleId,
    material,
    axiosPrivateInstance
) => {
    return executeRequest(
        () =>
            axiosPrivateInstance.post("/courses/modules/materials", material, {
                params: { courseId, moduleId },
            }),
        201,
        "Material created"
    );
};

export const createAssignment = async (
    courseId,
    moduleId,
    assignment,
    axiosPrivateInstance
) => {
    return executeRequest(
        () =>
            axiosPrivateInstance.post(
                "/courses/modules/assignments",
                assignment,
                { params: { courseId, moduleId } }
            ),
        201,
        "Assignment created"
    );
};

export const createSubmission = async (
    courseId,
    moduleId,
    assignmentId,
    submissionUrl,
    axiosPrivateInstance
) => {
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

export const gradeSubmission = async (
    submissionId,
    grade,
    axiosPrivateInstance
) => {
    return executeRequest(
        () =>
            axiosPrivateInstance.post(
                "/courses/modules/assignments/submissions/grade",
                { submissionId, grade }
            ),
        201,
        "Submission graded"
    );
};
