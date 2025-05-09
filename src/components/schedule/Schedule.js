import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { createSchedule, updateScheduleById, daleteScheduleById } from "../../api/schedule";
import styles from "./Schedule.module.css";
import TimetableCell from "./TimetableCell";
import { Loading } from "../basic/LoadingAnimation";
import Notification from "../basic/Notification";
import { getAllClassesSchool, getClassesSchedule } from "../../api/class";
import { getUserCourses } from "../../api/course";

function Schedule({ baseInfo }) {
    const [selectedClass, setSelectedClass] = useState("");
    const [classes, setClasses] = useState([]);
    const [timetableData, setTimetableData] = useState([]);
    const [availableCourses, setAvailableCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(null);
    const [isAddingNewTime, setIsAddingNewTime] = useState(false);
    const [newTime, setNewTime] = useState({ start: "", end: "" });

    const axiosPrivate = useAxiosPrivate();

    function transformScheduleData(schedule) {
        const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
        let timetableMap = new Map();

        schedule.forEach((lesson) => {
            const key = `${lesson.startTime}-${lesson.endTime}`;
            if (!timetableMap.has(key)) {
                timetableMap.set(key, {
                    time: { start: lesson.startTime, end: lesson.endTime },
                    monday: null,
                    tuesday: null,
                    wednesday: null,
                    thursday: null,
                    friday: null,
                    saturday: null,
                });
            }
            const row = timetableMap.get(key);
            row[lesson.dayOfWeek.toLowerCase()] = lesson;
        });

        return Array.from(timetableMap.values()).sort((a, b) => {
            const aStart = a.time.start.split(":").map(Number);
            const bStart = b.time.start.split(":").map(Number);
            return aStart[0] * 60 + aStart[1] - (bStart[0] * 60 + bStart[1]);
        });
    }

    useEffect(() => {
        async function fetchAllData() {
            setLoading(true);
            try {
                const schoolClasses = await getAllClassesSchool(baseInfo.schoolId, axiosPrivate);
                const userCourses = await getUserCourses(baseInfo, axiosPrivate);

                setClasses(schoolClasses);
                setAvailableCourses(userCourses);

                if (baseInfo.class_id) {
                    setSelectedClass(baseInfo.class_id);
                } else if (schoolClasses.length > 0) {
                    setSelectedClass(schoolClasses[0].id);
                }
            } catch (err) {
                setNotification({ type: "error", message: "Не вдалося завантажити дані." });
                console.error("Помилка завантаження:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchAllData();
    }, [axiosPrivate]);

    useEffect(() => {
        if (!selectedClass) return;

        async function fetchSchedule() {
            setLoading(true);
            try {
                const response = await getClassesSchedule(selectedClass, axiosPrivate);
                setTimetableData(transformScheduleData(response));
                setNotification({ message: "" });
            } catch (err) {
                setNotification({ type: "error", message: "Не вдалося завантажити розклад." });
                console.error("Помилка завантаження розкладу:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchSchedule();
    }, [selectedClass, axiosPrivate]);

    const handleCreate = async (day, time) => {
        try {
            const newSchedule = {
                classId: selectedClass,
                courseId: availableCourses[0]?.id,
                dayOfWeek: day.toUpperCase(),
                startTime: time.start,
                endTime: time.end,
                roomNumber: 0,
            };

            await createSchedule(newSchedule, axiosPrivate);
            setNotification({ type: "success", message: "Заняття створено успішно!" });

            const updatedSchedule = await getClassesSchedule(selectedClass, axiosPrivate);
            setTimetableData(transformScheduleData(updatedSchedule));
        } catch (err) {
            setNotification({ type: "error", message: "Не вдалося додати заняття." });
            console.error("Помилка створення:", err);
        }
    };

    const handleUpdate = async (id, lessonData) => {
        try {
            const updatedData = {
                classId: selectedClass,
                courseId: lessonData.courseId,
                dayOfWeek: lessonData.dayOfWeek,
                startTime: lessonData.startTime,
                endTime: lessonData.endTime,
                roomNumber: lessonData.roomNumber,
            };

            await updateScheduleById(id, updatedData, axiosPrivate);
            setNotification({ type: "success", message: "Розклад оновлено!" });

            const updatedSchedule = await getClassesSchedule(selectedClass, axiosPrivate);
            setTimetableData(transformScheduleData(updatedSchedule));
        } catch (err) {
            setNotification({ type: "error", message: "Не вдалося оновити розклад." });
            console.error("Помилка оновлення:", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await daleteScheduleById(id, axiosPrivate);
            setNotification({ type: "success", message: "Розклад видалено!" });

            const updatedSchedule = await getClassesSchedule(selectedClass, axiosPrivate);
            setTimetableData(transformScheduleData(updatedSchedule));
        } catch (err) {
            setNotification({ type: "error", message: "Не вдалося видалити розклад." });
            console.error("Помилка видалення:", err);
        }
    };

    const handleCreateNewTime = async () => {
        if (!newTime.start || !newTime.end) {
            setNotification({ type: "error", message: "Введіть час початку і кінця!" });
            return;
        }
        const [startHours, startMinutes] = newTime.start.split(":").map(Number);
        const [endHours, endMinutes] = newTime.end.split(":").map(Number);

        if (startHours > endHours || (startHours === endHours && startMinutes >= endMinutes)) {
            setNotification({ type: "error", message: "Час початку має бути раніше за час закінчення!" });
            return;
        }

        try {
            const newSchedule = {
                classId: selectedClass,
                courseId: availableCourses[0]?.id || null,
                dayOfWeek: "MONDAY",
                startTime: newTime.start,
                endTime: newTime.end,
                roomNumber: "",
            };

            await createSchedule(newSchedule, axiosPrivate);
            setNotification({ type: "success", message: "Новий час додано!" });

            const updatedSchedule = await getClassesSchedule(selectedClass, axiosPrivate);
            setTimetableData(transformScheduleData(updatedSchedule));
            setIsAddingNewTime(false);
            setNewTime({ start: "", end: "" });
        } catch (err) {
            setNotification({ type: "error", message: "Не вдалося створити розклад." });
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (!timetableData.length) {
        return (
            <div className={styles.app}>
                {notification && <Notification type={notification.type} message={notification.message} />}
                <div className={styles.classSelector}>
                    <label htmlFor="class-select">Виберіть клас: </label>
                    <select id="class-select" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                        {classes.map((classItem) => (
                            <option key={classItem.id} value={classItem.id}>
                                {classItem.name}
                            </option>
                        ))}
                    </select>
                </div>
                <p className={styles.description}>Розкладу для дано класу ще немає</p>
                {baseInfo.role === "SCHOOL_ADMIN" && (
                    <>
                        {isAddingNewTime ? (
                            <div className="new-time-form">
                                <input
                                    type="time"
                                    value={newTime.start}
                                    onChange={(e) => setNewTime({ ...newTime, start: e.target.value })}
                                    placeholder="Час початку"
                                />
                                <input
                                    type="time"
                                    value={newTime.end}
                                    onChange={(e) => setNewTime({ ...newTime, end: e.target.value })}
                                    placeholder="Час закінчення"
                                />
                                <button onClick={handleCreateNewTime}>Зберегти</button>
                                <button onClick={() => setIsAddingNewTime(false)}>Скасувати</button>
                            </div>
                        ) : (
                            <button className={styles.addButton} onClick={() => setIsAddingNewTime(true)}>
                                Додати розклад
                            </button>
                        )}
                    </>
                )}
            </div>
        );
    }

    return (
        <div className={styles.app}>
            {notification && <Notification type={notification.type} message={notification.message} />}

            <div className={styles.classSelector}>
                <label htmlFor="class-select">Виберіть клас: </label>
                <select id="class-select" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                    {classes.map((classItem) => (
                        <option key={classItem.id} value={classItem.id}>
                            {classItem.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.timetableContainer}>
                <table className={styles.timetable}>
                    <thead>
                        <tr>
                            <th className={styles.timeColumn}>Час</th>
                            <th>Понеділок</th>
                            <th>Вівторок</th>
                            <th>Середа</th>
                            <th>Четвер</th>
                            <th>П’ятниця</th>
                            <th>Субота</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timetableData.map((row, index) => (
                            <tr key={index}>
                                <td>
                                    <div>
                                        <strong>{index + 1}</strong>
                                    </div>
                                    <div>
                                        {row.time.start} - {row.time.end}
                                    </div>
                                </td>
                                {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].map((day) => (
                                    <td key={day} className={styles.dayCell}>
                                        <TimetableCell
                                            data={row[day]}
                                            isAdmin={baseInfo.role === "SCHOOL_ADMIN"}
                                            day={day.toUpperCase()}
                                            time={row.time}
                                            courses={availableCourses}
                                            onCreate={handleCreate}
                                            onUpdate={handleUpdate}
                                            onDelete={handleDelete}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {baseInfo.role === "SCHOOL_ADMIN" && (
                            <tr>
                                <td className={styles.timeCell}>
                                    {isAddingNewTime ? (
                                        <div className={styles.newTimeForm}>
                                            <input
                                                type="time"
                                                value={newTime.start}
                                                onChange={(e) => setNewTime({ ...newTime, start: e.target.value })}
                                                placeholder="Час початку"
                                            />
                                            <input
                                                type="time"
                                                value={newTime.end}
                                                onChange={(e) => setNewTime({ ...newTime, end: e.target.value })}
                                                placeholder="Час закінчення"
                                            />
                                            <button onClick={handleCreateNewTime}>Зберегти</button>
                                            <button onClick={() => setIsAddingNewTime(false)}>Скасувати</button>
                                        </div>
                                    ) : (
                                        <button className={styles.addButton} onClick={() => setIsAddingNewTime(true)}>
                                            Додати новий час
                                        </button>
                                    )}
                                </td>
                                <td colSpan="6"></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Schedule;
