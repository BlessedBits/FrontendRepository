import React, { useState, useEffect } from "react";
import style from "./NewCourseModal.module.css";
import { createCourse } from "../../api/course";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Notification from "../basic/Notification";
import { getSchoolTeachers } from "../../api/school";

function NewCourseModal({ onClose, onCourseCreated, data }) {
    const [courseData, setCourseData] = useState({ name: "", teacherIds: [] });
    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        // Fetch teachers when the modal opens
        const fetchTeachers = async () => {
            try {
                const teacherList = await getSchoolTeachers(0, axiosPrivate);
                setTeachers(teacherList);
            } catch (err) {
                console.error("Error fetching teachers:", err);
                setNotification({
                    type: "error",
                    text: "Не вдалося завантажити список вчителів",
                });
            }
        };

        if (data.role === "SCHOOL_ADMIN") {
            fetchTeachers();
        }
    }, [axiosPrivate, data.role]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { name, teacherIds } = courseData;
            teacherIds.push(data.id);

            await createCourse(data.schoolId, teacherIds, name, axiosPrivate);
            setNotification({
                type: "success",
                text: "Курс успішно створено!",
            });
            onCourseCreated();
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (err) {
            if (err.status === 500) {
                setNotification({
                    type: "error",
                    text: "Такий курс вже існує",
                });
            } else {
                setNotification({
                    type: "error",
                    text: "Щось пішло не так, спробуйте пізніше",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleTeacherSelection = (teacherId) => {
        setCourseData((prev) => {
            const teacherIds = prev.teacherIds.includes(teacherId)
                ? prev.teacherIds.filter((id) => id !== teacherId) // Remove if already selected
                : [...prev.teacherIds, teacherId]; // Add if not selected
            return { ...prev, teacherIds };
        });
    };

    return (
        <div className={style.modal}>
            <div className={style.modalContent}>
                <Notification message={notification?.text} type={notification?.type} />
                <h3>Додати новий курс</h3>
                <form onSubmit={handleSubmit} className={style.form}>
                    {/* Course Name Input */}
                    <input
                        className={style.input}
                        type="text"
                        placeholder="Назва курсу"
                        value={courseData.name}
                        onChange={(e) =>
                            setCourseData((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                        required
                    />

                    {/* Teacher Selection for SCHOOL_ADMIN */}
                    {data.role === "SCHOOL_ADMIN" && (
                        <div className={style.teachersContainer}>
                            <h4 className={style.h4}>Виберіть вчителів:</h4>
                            <ul className={style.teachersList}>
                                {teachers.map((teacher) => (
                                    <li key={teacher.id} className={style.teacherItem}>
                                        <input
                                            type="checkbox"
                                            value={teacher.id}
                                            onChange={() => handleTeacherSelection(teacher.id)}
                                        />
                                        {teacher.firstName} {teacher.secondName}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Actions */}
                    <div className={style.modalActions}>
                        <button type="submit" className={style.saveButton} disabled={loading}>
                            {loading ? "Завантаження..." : "Зберегти"}
                        </button>
                        <button type="button" className={style.cancelButton} onClick={onClose}>
                            Скасувати
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewCourseModal;
