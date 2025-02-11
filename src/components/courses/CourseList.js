import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import CourseItem from "./CourseItem";
import { Loading } from "../basic/LoadingAnimation";
import { getUserCourses } from "../../api/course";
import styles from "./CourseList.module.css";
import { getUserId } from "../../api/user";

function CourseList({ userRole }) {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const id = await getUserId(axiosPrivate);
                setUserId(id);
                const data = await getUserCourses(id, axiosPrivate);
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
        </div>
    );
}

export default CourseList;
