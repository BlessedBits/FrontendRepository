import { executeRequest } from '../utils/apiUtils';

export const createSchedule = async (scheduleData, axiosPrivateInstance) => {
    return executeRequest(
        () =>
            axiosPrivateInstance.post('/schedules/new', {
                classId: scheduleData.classId,
                courseId: scheduleData.courseId,
                dayOfWeek: scheduleData.dayOfWeek,
                startTime: scheduleData.startTime,
                endTime: scheduleData.endTime,
                roomNumber: scheduleData.roomNumber,
            }),
        201,
        "Schedule created"
    );
};



export const getAllSchedules = async (axiosPrivateInstance) => 
    executeRequest(
        () => axiosPrivateInstance.get('/schedules/'),
        200
    );

export const getScheduleById = async (id, axiosPrivateInstance) => 
    executeRequest(
        () => axiosPrivateInstance.get(`/schedules/${id}`),
        200,
        `Schedule fetched successfully with ID: ${id}`
    );
