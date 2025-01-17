import axios from "axios";

const COURSES_BASE_URL = 'https://ypgblessedbits.azurewebsites.net/courses'; 
// const BASE_URL = 'http://localhost:8080/courses'; 

const coursesInstance = axios.create({
    baseURL: COURSES_BASE_URL,
});

coursesInstance.interceptors.request.use(config => {
    const accessToken = localStorage.getItem("accessToken");
    const tokenType = localStorage.getItem("tokenType") || 'Bearer ';
    console.log("Request config:", config);

    if (accessToken) {
        config.headers.Authorization = `${tokenType}${accessToken}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
});

export const createCourse = async (courseName) => {
    try {
        const response = await coursesInstance.post('/new', {
            name: courseName
        });

        if (response.status === 201) {
            return "Course created"; 
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        if (error.response) {
            const { status } = error.response;
            switch (status) {
                case 401:
                    throw new Error('Unauthorized: Invalid access token.');
                case 500:
                    throw new Error('Internal Server Error: Failed to save course to database.');
                default:
                    throw new Error(`Unhandled response status: ${status}`);
            }
        }
        throw new Error(error.message || 'An unknown error occurred.');
    }
};

export const getUserCourses = async () => {
    try {
        const response = await coursesInstance.get('/user');
        
        if (response.status === 200) {
            return response.data;  
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        if (error.response) {
            const { status } = error.response;
            switch (status) {
                case 401:
                    throw new Error('Unauthorized: Invalid access token.');
                case 500:
                    throw new Error('Internal Server Error: Failed to fetch user courses.');
                default:
                    throw new Error(`Unhandled response status: ${status}`);
            }
        }
        throw new Error(error.message || 'An unknown error occurred.');
    }
};

export const createModule = async (courseId, moduleName) => {
    try {
        const response = await coursesInstance.post('/modules', {
            name: moduleName
        }, {
            params: {
                courseId: courseId
            }
        });

        if (response.status === 201) {
            return "Module created"; 
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        if (error.response) {
            const { status } = error.response;
            switch (status) {
                case 401:
                    throw new Error('Unauthorized: Invalid access token.');
                case 403:
                    throw new Error('Forbidden: You are not allowed to modify this course.');
                case 500:
                    throw new Error('Internal Server Error: Failed to save module to database.');
                default:
                    throw new Error(`Unhandled response status: ${status}`);
            }
        }
        throw new Error(error.message || 'An unknown error occurred.');
    }
};

export const createMaterial = async (courseId, moduleId, material) => {
    try {
        const response = await coursesInstance.post('/modules/materials', material, {
            params: {
                courseId: courseId,
                moduleId: moduleId
            }
        });

        if (response.status === 201) {
            return "Material created"; 
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        if (error.response) {
            const { status } = error.response;
            switch (status) {
                case 401:
                    throw new Error('Unauthorized: Invalid access token.');
                case 403:
                    throw new Error('Forbidden: You are not allowed to modify this course.');
                case 500:
                    throw new Error('Internal Server Error: Failed to save material to database.');
                default:
                    throw new Error(`Unhandled response status: ${status}`);
            }
        }
        throw new Error(error.message || 'An unknown error occurred.');
    }
};

export const createAssignment = async (courseId, moduleId, assignment) => {
    try {
        const response = await coursesInstance.post('/modules/assignments', assignment, {
            params: {
                courseId: courseId,
                moduleId: moduleId
            }
        });

        if (response.status === 201) {
            return "Assignment created";
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        if (error.response) {
            const { status } = error.response;
            switch (status) {
                case 401:
                    throw new Error('Unauthorized: Invalid access token.');
                case 403:
                    throw new Error('Forbidden: You are not allowed to modify this course.');
                case 500:
                    throw new Error('Internal Server Error: Failed to save assignment to database.');
                default:
                    throw new Error(`Unhandled response status: ${status}`);
            }
        }
        throw new Error(error.message || 'An unknown error occurred.');
    }
};

export const createSubmission = async (courseId, moduleId, assignmentId, submissionUrl) => {
    try {
        const response = await coursesInstance.post('/modules/assignments/submissions', { url: submissionUrl }, {
            params: {
                courseId: courseId,
                moduleId: moduleId,
                assignmentId: assignmentId
            }
        });

        if (response.status === 201) {
            return "Submission created"; 
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        if (error.response) {
            const { status } = error.response;
            switch (status) {
                case 401:
                    throw new Error('Unauthorized: Invalid access token.');
                case 403:
                    throw new Error('Forbidden: You are not allowed to modify this course.');
                case 500:
                    throw new Error('Internal Server Error: Failed to save submission to database.');
                default:
                    throw new Error(`Unhandled response status: ${status}`);
            }
        }
        throw new Error(error.message || 'An unknown error occurred.');
    }
};

export const gradeSubmission = async (submissionId, grade) => {
    try {
        const response = await coursesInstance.post('/modules/assignments/submissions/grade', {
            submissionId: submissionId,
            grade: grade
        });

        if (response.status === 201) {
            return "Submission graded"; 
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        if (error.response) {
            const { status } = error.response;
            switch (status) {
                case 401:
                    throw new Error('Unauthorized: Invalid access token.');
                case 403:
                    throw new Error('Forbidden: You are not allowed to grade this submission.');
                case 500:
                    throw new Error('Internal Server Error: Failed to save changes to database.');
                default:
                    throw new Error(`Unhandled response status: ${status}`);
            }
        }
        throw new Error(error.message || 'An unknown error occurred.');
    }
};
