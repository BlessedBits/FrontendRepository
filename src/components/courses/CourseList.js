import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import CourseItem from "./CourseItem";
import { Loading } from "../basic/LoadingAnimation";
import { getUserCourses, updateCourse } from "../../api/course";
import styles from "./CourseList.module.css";
import NewCourseModal from "./NewCourseModal";
import Notification from "../basic/Notification";
import { getUserId, getBaseInfo } from "../../api/user";
import { getAllClassesSchool } from "../../api/class";

function CourseList({ userRole }) {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [classes, setSchoolClasses] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notification, setNotification] = useState({ message: "", type: "" });
    const [base, setBaseInfo] = useState(null);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const id = await getUserId(axiosPrivate);
                const data = await getBaseInfo(id, axiosPrivate);
                setBaseInfo(data);
                const response = await getUserCourses(data, userRole, axiosPrivate);
                setCourses(response);
                if (["TEACHER", "SCHOOL_ADMIN"].includes(userRole)) {
                    const response2 = await getAllClassesSchool(data.schoolId, axiosPrivate);
                    setSchoolClasses(response2);
                }
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
            const updatedCourses = await getUserCourses(base, userRole, axiosPrivate);
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
        }
    };

    const handleCourseDeleted = (deletedCourseId) => {
        setCourses((prevCourses) => prevCourses.filter((course) => course.id !== deletedCourseId));
    };

    const handleCourseUpdated = async (courseId, newName) => {
        setCourses((prevCourses) =>
            prevCourses.map((course) => (course.id === courseId ? { ...course, name: newName } : course))
        );
    };

    if (loading) return <Loading />;
    if (error) return <p className={styles.error}>{error}</p>;

    return (
        <div className={styles.courses}>
            {userRole === "SCHOOL_ADMIN" ? (
                <h1 className={styles.title}> Курси школи</h1>
            ) : (
                <h1 className={styles.title}> Мої курси </h1>
            )}

            <ul className={styles.list}>
                {courses.map((course) => (
                    <CourseItem
                        key={course.id}
                        course={course}
                        userRole={userRole}
                        onCourseDeleted={handleCourseDeleted}
                        onCourseUpdated={handleCourseUpdated}
                        data={base}
                        ClassesSchool={classes}
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
                    data={base}
                    userRole={userRole}
                />
            )}

            <Notification message={notification?.text} type={notification?.type} />
        </div>
    );
}

export default CourseList;
