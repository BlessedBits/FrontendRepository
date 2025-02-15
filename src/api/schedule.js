import { executeRequest } from "../utils/apiUtils";

export const createSchedule = async (scheduleData, axiosPrivateInstance) => {
    return executeRequest(
        () =>
            axiosPrivateInstance.post("/schedules/", {
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
    executeRequest(() => axiosPrivateInstance.get("/schedules"), 200);

export const getScheduleById = async (id, axiosPrivateInstance) =>
    executeRequest(
        () => axiosPrivateInstance.get(`/schedules/${id}`),
        200,
        `Schedule fetched successfully with ID: ${id}`
    );

export const getScheduleByClassesId = async (id, axiosPrivateInstance) =>
    executeRequest(
        () => axiosPrivateInstance.get(`/schedules/class/${id}`),
        200,
        `Schedule fetched successfully with class ID: ${id}`
    );

export const updateScheduleById = async (id, data, axiosPrivateInstance) =>
    executeRequest(
        () => axiosPrivateInstance.put(`/schedules/${id}`, data),
        200,
        `Schedule updated successfully with ID: ${id}`
    );

export const daleteScheduleById = async (id, axiosPrivateInstance) =>
    executeRequest(
        () => axiosPrivateInstance.delete(`/schedules/${id}`),
        204,
        `Schedule delete successfully with ID: ${id}`
    );
