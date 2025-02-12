import React, { useState, useEffect } from "react";
import styles from "./TeacherSchool.module.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getSchoolTeachers } from "../../api/school";
import { Loading } from "../basic/LoadingAnimation";
import Notification from "../basic/Notification";
import { setUserDuty } from "../../api/profile";

function TeacherSchool({ userRole }) {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState(null);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        async function fetchTeachers() {
            try {
                const data = await getSchoolTeachers(axiosPrivate);
                setTeachers(data);
            } catch (error) {
                setError("Не вдалося завантажити вчителів.");
            } finally {
                setLoading(false);
            }
        }

        fetchTeachers();
    }, [axiosPrivate]);

    const handleDutyChange = (id, newDuty) => {
        setTeachers((prevTeachers) =>
            prevTeachers.map((teacher) =>
                teacher.id === id ? { ...teacher, duty: newDuty } : teacher
            )
        );
    };

    const saveDuty = async (id, duty) => {
        try {
            await setUserDuty(id, duty, axiosPrivate);
            setNotification({
                type: "success",
                message: "Дані успішно оновлено.",
            });
        } catch {
            setNotification({
                type: "error",
                message: "Не вдалося оновити дані.",
            });
        }
        setTimeout(() => setNotification({ message: "", type: "" }), 3000);
    };

    if (loading) {
        return (
            <section id="Teacher" className={styles.teacher}>
                <Loading />
            </section>
        );
    }

    if (error) {
        return (
            <section id="Teacher" className={styles.teacher}>
                <p>Помилка завантаження даних: {error}</p>
            </section>
        );
    }

    if (teachers.length === 0) {
        return (
            <section id="Teacher" className={styles.teacher}>
                <p>Дані відсутні</p>
            </section>
        );
    }
    return (
        <section id="Teacher" className={styles.teacher}>
            <h2 className={styles.header}>Наші вчителі</h2>
            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}
            <div className={styles.teacherCard}>
                {teachers.map((teacher) => (
                    <div key={teacher.id} className={styles.teacherItem}>
                        <img
                            src={teacher.profileImage}
                            alt={teacher.firstName + " " + teacher.secondName}
                            className={styles.teacherImage}
                        />
                        <p className={styles.teacherName}>
                            {teacher.firstName} {teacher.secondName}
                        </p>
                        {userRole === "SCHOOL_ADMIN" ? (
                            <div className={styles.dutyEdit}>
                                <input
                                    type="text"
                                    value={teacher.duty}
                                    onChange={(e) =>
                                        handleDutyChange(
                                            teacher.id,
                                            e.target.value
                                        )
                                    }
                                    className={styles.dutyInput}
                                />
                                <button
                                    onClick={() =>
                                        saveDuty(teacher.id, teacher.duty)
                                    }
                                    className={styles.saveButton}
                                >
                                    Зберегти
                                </button>
                            </div>
                        ) : (
                            <p className={styles.teacherFun}>{teacher.duty}</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default TeacherSchool;
