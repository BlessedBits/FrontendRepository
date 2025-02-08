import { executeRequest } from '../utils/apiUtils';

export const getUserCourses = async (axiosPrivateInstance) => {
    return (
        executeRequest(
            () => axiosPrivateInstance.get('/courses/user'),
            200
        )
    );
};


export const createCourse = async (courseName, userId, axiosPrivateInstance) => {
    return (
        executeRequest(
            () => axiosPrivateInstance.post('/courses/new/', { name: courseName, teacherId: userId }),
            201,
            "Course created"
        )
    );
};

export const createModule = async (courseId, moduleName, axiosPrivateInstance) => {
    return (
        executeRequest(
            () => axiosPrivateInstance.post(
                '/courses/modules', 
                { name: moduleName }, 
                { params: { courseId } }
            ),
            201,
            "Module created"
        )
    );
};

export const createMaterial = async (courseId, moduleId, material, axiosPrivateInstance) => {
    return (
        executeRequest(
            () => axiosPrivateInstance.post(
                '/courses/modules/materials', 
                material, 
                { params: { courseId, moduleId } }
            ),
            201,
            "Material created"
        )
    );
};

export const createAssignment = async (courseId, moduleId, assignment, axiosPrivateInstance) => {
    return (
        executeRequest(
            () => axiosPrivateInstance.post(
                '/courses/modules/assignments', 
                assignment, 
                { params: { courseId, moduleId } }
            ),
            201,
            "Assignment created"
        )
    );
};

export const createSubmission = async (courseId, moduleId, assignmentId, submissionUrl, axiosPrivateInstance) => {
    return (
        executeRequest(
            () => axiosPrivateInstance.post(
                '/courses/modules/assignments/submissions', 
                { url: submissionUrl }, 
                { params: { courseId, moduleId, assignmentId } }
            ),
            201,
            "Submission created"
        )
    );
};

export const gradeSubmission = async (submissionId, grade, axiosPrivateInstance) => {
    return (
        executeRequest(
            () => axiosPrivateInstance.post(
                '/courses/modules/assignments/submissions/grade', 
                { submissionId, grade }
            ),
            201,
            "Submission graded"
        )
    );
};