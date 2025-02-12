import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import CourseItem from "./CourseItem";
import { Loading } from "../basic/LoadingAnimation";
import { getUserCourses } from "../../api/course";
import styles from "./CourseList.module.css";
import NewCourseModal from "./NewCourseModal";
import Notification from "../basic/Notification";
import { getUserId } from "../../api/user";

function CourseList({ userRole }) {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notification, setNotification] = useState(null);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const id = await getUserId(axiosPrivate);
                setUserId(id);
                const data = await getUserCourses(id, userRole, axiosPrivate);
                setCourses(data);
            } catch (err) {
                console.error(err.message);
                setError("Не вдалося завантажити курси. Спробуйте пізніше.");
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, [axiosPrivate]);

    const handleCourseCreated = async () => {
        try {
            setNotification({
                type: "loading",
                text: "Оновлюємо список курсів...",
            });
            const updatedCourses = await getUserCourses(userId, axiosPrivate);
            setCourses(updatedCourses);
            setNotification({
                type: "success",
                text: "Список курсів оновлено!",
            });
        } catch (err) {
            setNotification({
                type: "error",
                text: "Не вдалося оновити список курсів. Спробуйте пізніше.",
            });
        } finally {
            setTimeout(() => setNotification(null), 3000);
        }
    };

    if (loading) return <Loading />;
    if (error) return <p className={styles.error}>{error}</p>;

    return (
        <div className={styles.courses}>
            <h1 className={styles.title}>Мої курси:</h1>

            <ul className={styles.list}>
                {courses.map((course) => (
                    <CourseItem
                        key={course.id}
                        course={course}
                        userRole={userRole}
                    />
                ))}
            </ul>

            {["TEACHER", "SCHOOL_ADMIN"].includes(userRole) && (
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
                    onCourseCreated={handleCourseCreated}
                />
            )}

            <Notification
                message={notification?.text}
                type={notification?.type}
            />
        </div>
    );
}

export default CourseList;
