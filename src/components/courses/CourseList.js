import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Loading } from "../basic/LoadingAnimation";
import { getUserCourses, deleteCourse, updateCourse } from "../../api/course";
import styles from "./CourseList.module.css";
import NewCourseModal from "./NewCourseModal";
import Notification from "../basic/Notification";

function CourseList({ baseInfo }) {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notification, setNotification] = useState({ message: "", type: "" });
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [editingCourseId, setEditingCourseId] = useState(null);
    const [newCourseName, setNewCourseName] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await getUserCourses(baseInfo, axiosPrivate);
                setCourses(response);
            } catch (err) {
                console.error(err.message);
                setError("Не вдалося завантажити курси. Спробуйте пізніше.");
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, [axiosPrivate]);

    const refreshCourses = async () => {
        try {
            setNotification({ type: "loading", message: "Оновлюємо список курсів..." });
            const updatedCourses = await getUserCourses(baseInfo, axiosPrivate);
            setCourses(updatedCourses);
            setNotification({ type: "success", message: "Список курсів оновлено!" });
        } catch (err) {
            setNotification({ type: "error", message: "Не вдалося оновити список курсів. Спробуйте пізніше." });
        }
    };

    const handleDeleteCourse = async (id) => {
        if (!window.confirm("Ви впевнені, що хочете видалити даний предмет?")) return;
        setNotification({ type: "loading", message: "Курс видаляється..." });
        try {
            await deleteCourse(id, axiosPrivate);
            setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
            setNotification({ type: "success", message: "Курс видалено" });
        } catch (error) {
            console.error("Помилка при видаленні курсу:", error);
            setNotification({ type: "error", message: "Помилка. Спробуйте пізніше" });
        }
    };

    const handleUpdateCourse = async (id, newName) => {
        try {
            await updateCourse(id, { name: newName }, axiosPrivate);
            setCourses((prevCourses) =>
                prevCourses.map((course) => (course.id === id ? { ...course, name: newName } : course))
            );
            setNotification({ type: "success", message: "Курс оновлено!" });
        } catch (error) {
            console.error("Помилка при оновленні курсу:", error);
            setNotification({ type: "error", message: "Не вдалося оновити курс." });
        }
    };

    if (loading) return <Loading />;
    if (error) return <p className={styles.error}>{error}</p>;

    return (
        <div className={styles.courses}>
            {baseInfo?.role === "SCHOOL_ADMIN" ? (
                <h1 className={styles.title}> Курси школи</h1>
            ) : (
                <h1 className={styles.title}> Мої курси </h1>
            )}

            <ul className={styles.list}>
                {courses.map((course) => (
                    <li key={course.id} className={styles.courseItem}>
                        <p
                            onClick={() => {
                                if (editingCourseId !== course.id) {
                                    navigate(`/courses/${course.id}`);
                                }
                            }}
                            className={styles.courseName}
                        >
                            {editingCourseId === course.id ? (
                                <input
                                    type="text"
                                    value={newCourseName}
                                    onClick={(e) => e.stopPropagation()} // ← ось це зупиняє клік
                                    onChange={(e) => setNewCourseName(e.target.value)}
                                    className={styles.courseInput}
                                />
                            ) : (
                                course.name
                            )}
                        </p>

                        {["TEACHER", "SCHOOL_ADMIN"].includes(baseInfo.role) && (
                            <div className={styles.editContainer}>
                                {editingCourseId === course.id ? (
                                    <>
                                        <button
                                            className={styles.editButton}
                                            onClick={() => {
                                                handleUpdateCourse(course.id, newCourseName);
                                                setEditingCourseId(null);
                                            }}
                                        >
                                            Зберегти
                                        </button>
                                        <button
                                            className={styles.cancelButton}
                                            onClick={() => {
                                                setNewCourseName(course.name);
                                                setEditingCourseId(null);
                                            }}
                                        >
                                            Скасувати
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className={styles.iconBtn}
                                        onClick={() => {
                                            setEditingCourseId(course.id);
                                            setNewCourseName(course.name);
                                        }}
                                    >
                                        ✏️
                                    </button>
                                )}
                                <button className={styles.iconBtn} onClick={() => handleDeleteCourse(course.id)}>
                                    🗑️
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {["TEACHER", "SCHOOL_ADMIN"].includes(baseInfo?.role) && (
                <button
                    className={`${styles["createButton"]} ${styles.createButton27}`}
                    onClick={() => setIsModalOpen(true)}
                >
                    Створити новий курс
                </button>
            )}

            {isModalOpen && (
                <NewCourseModal
                    onClose={() => setIsModalOpen(false)}
                    onCourseCreated={refreshCourses}
                    data={baseInfo}
                />
            )}

            <Notification message={notification?.message} type={notification?.type} />
        </div>
    );
}

export default CourseList;
