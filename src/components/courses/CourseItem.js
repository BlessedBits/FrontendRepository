import React, { useState } from "react";
import ModuleItem from "./ModuleItem";
import styles from "./CourseItem.module.css";
import { deleteCourse } from "../../api/course";
import Notification from "../basic/Notification";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getAllClassesCourses } from "../../api/class";

function CourseItem({ course, userRole, onCourseDeleted }) {
    const [expanded, setExpanded] = useState(false);
    const [classes, setClasses] = useState([]); // State for storing fetched classes
    const [loadingClasses, setLoadingClasses] = useState(false); // State for class loading status
    const [notification, setNotification] = useState({ message: "", type: "" });

    const axiosPrivate = useAxiosPrivate();

    const handleToggleExpand = async () => {
        setExpanded(!expanded);

        // Fetch classes when expanded for the first time
        if (!expanded && classes.length === 0) {
            setLoadingClasses(true);
            try {
                const response = await getAllClassesCourses(course.id, axiosPrivate); // Fetch classes
                setClasses(response); // Set classes in state
            } catch (err) {
                console.error(err.message);
                setNotification({ type: "error", message: "Помилка при завантаженні класів" });
            } finally {
                setLoadingClasses(false);
            }
        }
    };

    const handleDeleteCourse = async (id) => {
        if (!window.confirm("Ви впевнені, що хочете видалити даний предмет?")) return;
        setNotification({ type: "loading", message: "Курс видаляється..." });
        try {
            await deleteCourse(id, axiosPrivate);
            setNotification({ type: "success", message: "Курс видалено" });

            // Notify the parent component
            if (onCourseDeleted) {
                onCourseDeleted(id);
            }
        } catch (error) {
            console.error("Помилка при видаленні курсу:", error);
            setNotification({
                type: "error",
                message: "Помилка. Спробуйте пізніше",
            });
        } finally {
            setTimeout(() => setNotification({ message: "", type: "" }), 3000);
        }
    };

    return (
        <li className={expanded ? styles.courseItemExpanded : styles.courseItem}>
            {/* Course Name with Expand/Collapse Button */}
            <button className={styles.toggleButton} onClick={handleToggleExpand}>
                {expanded ? "🔽" : "▶️"} {course.name}
            </button>

            {/* Delete Button for Admins */}
            {expanded && userRole === "SCHOOL_ADMIN" && (
                <button className={styles.deleteButton} onClick={() => handleDeleteCourse(course.id)}>
                    Видалити курс
                </button>
            )}

            {/* Expanded Content: Modules and Classes */}
            {expanded && (
                <>
                    <ul className={styles.modules}>
                        {course.modules.map((module) => (
                            <ModuleItem key={module.id} module={module} userRole={userRole} />
                        ))}
                    </ul>

                    {/* Show Classes */}
                    <div className={styles.classesContainer}>
                        <h4>Класи в яких є даний предмет:</h4>
                        {loadingClasses ? (
                            <p>Завантаження класів...</p>
                        ) : classes && classes.classes && classes.classes.length > 0 ? (
                            <ul className={styles.classesList}>
                                {classes.classes.map((classItem) => (
                                    <li key={classItem.id} className={styles.classItem}>
                                        {classItem.name}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Відсутні</p>
                        )}
                    </div>
                </>
            )}

            {/* Notification */}
            <Notification message={notification.message} type={notification.type} />
        </li>
    );
}

export default CourseItem;
