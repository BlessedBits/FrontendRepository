import React, { useState } from "react";
import ModuleItem from "./ModuleItem";
import styles from "./CourseItem.module.css";
import { deleteCourse, getCourseInfo, createModule, updateCourse } from "../../api/course";
import { connectCourseClass, delConnectCourseClass } from "../../api/course";
import Notification from "../basic/Notification";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function CourseItem({ course, data, onCourseDeleted, onCourseUpdated, ClassesSchool }) {
    const [expanded, setExpanded] = useState(false);
    const [classes, setClasses] = useState([]);
    const [availableClasses, setAvailableClasses] = useState([]);
    const [loadingClasses, setLoadingClasses] = useState(false);
    const [selectedClass, setSelectedClass] = useState("");
    const [notification, setNotification] = useState({ message: "", type: "" });
    const [courseDetails, setCourseDetails] = useState(null);
    const [loadingCourseDetails, setLoadingCourseDetails] = useState(false);
    const [newCourseName, setNewCourseName] = useState(course.name);
    const [newModule, setNewModule] = useState({ name: "", courseId: course.id });

    // Стейти для відображення форм редагування та створення модуля
    const [isEditingCourse, setIsEditingCourse] = useState(false);
    const [isCreatingModule, setIsCreatingModule] = useState(false);

    const axiosPrivate = useAxiosPrivate();

    const fetchCourseDetails = async () => {
        setLoadingCourseDetails(true);
        try {
            const response = await getCourseInfo(course.id, axiosPrivate);
            setCourseDetails(response);
        } catch (error) {
            console.error("Помилка при завантаженні інформації про курс:", error);
            setNotification({ type: "error", message: "Не вдалося завантажити інформацію про курс" });
        } finally {
            setLoadingCourseDetails(false);
        }
    };

    const handleToggleExpand = async () => {
        const newExpandedState = !expanded;
        setExpanded(newExpandedState);

        if (!newExpandedState) return;

        if (!courseDetails) {
            await fetchCourseDetails();
        }

        if (["TEACHER", "SCHOOL_ADMIN"].includes(data.role) && classes.length === 0) {
            setClasses(course.classes);
            const filteredClasses = ClassesSchool.filter(
                (classItem) => !course.classes.some((c) => c.id === classItem.id)
            );
            setAvailableClasses(filteredClasses);
        }
    };

    // Видалення курсу
    const handleDeleteCourse = async (id) => {
        if (!window.confirm("Ви впевнені, що хочете видалити даний предмет?")) return;
        setNotification({ type: "loading", message: "Курс видаляється..." });
        try {
            await deleteCourse(id, axiosPrivate);
            setNotification({ type: "success", message: "Курс видалено" });
            if (onCourseDeleted) {
                onCourseDeleted(id);
            }
        } catch (error) {
            console.error("Помилка при видаленні курсу:", error);
            setNotification({ type: "error", message: "Помилка. Спробуйте пізніше" });
        }
    };

    const handleUpdateCourse = async (id, newName) => {
        try {
            await updateCourse(id, { name: newName }, axiosPrivate);
            setNotification({ type: "success", message: "Курс оновлено!" });
            if (onCourseUpdated) {
                onCourseUpdated(id, newName);
            }
        } catch (error) {
            console.error("Помилка при оновленні курсу:", error);
            setNotification({ type: "error", message: "Не вдалося оновити курс." });
        }
    };

    const handleCreateModule = async () => {
        if (!newModule.name.trim()) {
            setNotification({ type: "error", message: "Назва теми не може бути порожньою" });
            return;
        }

        setNotification({ type: "loading", message: "Створення теми..." });

        try {
            const response = await createModule(newModule, axiosPrivate);
            setCourseDetails([...courseDetails, response]);
            setNotification({ type: "success", message: "Тема створено успішно" });
            setNewModule({ name: "", courseId: course.id });
            setIsCreatingModule(false);
        } catch (error) {
            console.error("Помилка при створенні теми:", error);
            setNotification({ type: "error", message: "Не вдалося створити теми" });
        }
    };

    const handleAddConnectionClass = async () => {
        if (!selectedClass) return;
        setNotification({ type: "loading", message: "Додаємо клас..." });

        try {
            await connectCourseClass(selectedClass, course.id, axiosPrivate);
            setNotification({ type: "success", message: "Клас успішно додано" });

            const selectedClassId = parseInt(selectedClass, 10);
            const newClass = availableClasses.find((c) => c.id === selectedClassId);
            if (newClass) {
                setClasses([...classes, newClass]);
                setAvailableClasses(availableClasses.filter((c) => c.id !== selectedClassId));
            } else {
                setNotification({ type: "error", message: "Вибраний клас не знайдено" });
            }

            setSelectedClass("");
        } catch (error) {
            console.error("Помилка при додаванні класу:", error);
            setNotification({ type: "error", message: "Не вдалося додати клас" });
        }
    };

    const handleDeleteConnectionClass = async (id) => {
        setNotification({ type: "loading", message: "Видаляємо зв'язок..." });

        try {
            await delConnectCourseClass(id, course.id, axiosPrivate);
            setNotification({ type: "success", message: "Зв'язок видалено" });

            setClasses((prevClasses) => prevClasses.filter((classItem) => classItem.id !== id));

            const deletedClass = classes.find((classItem) => classItem.id === id);
            if (deletedClass) {
                setAvailableClasses((prevAvailableClasses) => [...prevAvailableClasses, deletedClass]);
            }
        } catch (error) {
            console.error("Помилка при видаленні зв'язку:", error);
            setNotification({ type: "error", message: "Помилка. Спробуйте пізніше" });
        }
    };

    const handleModuleDeleted = (moduleId) => {
        setCourseDetails((prevModules) => prevModules.filter((module) => module.id !== moduleId));
    };

    return (
        <li className={expanded ? styles.courseItemExpanded : styles.courseItem}>
            <div className={styles.moduleEditContainer}>
                <button className={styles.courseBtn} onClick={handleToggleExpand}>
                    {expanded ? "🔽" : "▶️"} {course.name}
                </button>
                {expanded && ["TEACHER", "SCHOOL_ADMIN"].includes(data.role) && (
                    <div className={styles.editContainer}>
                        {isEditingCourse ? (
                            <>
                                <input
                                    type="text"
                                    value={newCourseName}
                                    onChange={(e) => setNewCourseName(e.target.value)}
                                    className={styles.courseInput}
                                />
                                <button
                                    className={styles.editButton}
                                    onClick={() => {
                                        handleUpdateCourse(course.id, newCourseName);
                                        setIsEditingCourse(false);
                                    }}
                                >
                                    Зберегти
                                </button>
                                <button
                                    className={styles.cancelButton}
                                    onClick={() => {
                                        setNewCourseName(course.name);
                                        setIsEditingCourse(false);
                                    }}
                                >
                                    Скасувати
                                </button>
                            </>
                        ) : (
                            <button className={styles.iconBtn} onClick={() => setIsEditingCourse(true)}>
                                ✏️ Редагувати
                            </button>
                        )}
                        <button className={styles.iconBtn} onClick={() => handleDeleteCourse(course.id)}>
                            🗑️ Видалити
                        </button>
                    </div>
                )}
            </div>

            {expanded && (
                <>
                    {loadingCourseDetails ? (
                        <p>Завантаження інформації про курс...</p>
                    ) : (
                        <div className={styles.moduleContainer}>
                            <h4 className={styles.h4}>Список тем</h4>
                            <ul className={styles.modules}>
                                {courseDetails?.length > 0 ? (
                                    courseDetails.map((module) => (
                                        <ModuleItem
                                            key={module.id}
                                            module={module}
                                            userRole={data.role}
                                            onModuleDeleted={handleModuleDeleted}
                                        />
                                    ))
                                ) : (
                                    <p>Теми відсутні</p>
                                )}
                            </ul>
                            {["TEACHER", "SCHOOL_ADMIN"].includes(data.role) && (
                                <div className={styles.createModuleContainer}>
                                    {isCreatingModule ? (
                                        <>
                                            <input
                                                type="text"
                                                placeholder="Назва теми"
                                                value={newModule.name}
                                                onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
                                                className={styles.moduleInput}
                                            />
                                            <button className={styles.createBtn} onClick={handleCreateModule}>
                                                Додати тему
                                            </button>
                                            <button
                                                className={styles.cancelButton}
                                                onClick={() => {
                                                    setIsCreatingModule(false);
                                                    setNewModule({ name: "", courseId: course.id });
                                                }}
                                            >
                                                Скасувати
                                            </button>
                                        </>
                                    ) : (
                                        <button className={styles.addBtn} onClick={() => setIsCreatingModule(true)}>
                                            ➕ Додати тему
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {["TEACHER", "SCHOOL_ADMIN"].includes(data.role) && (
                        <div className={styles.classesContainer}>
                            <h4 className={styles.h5}>Класи в яких є даний предмет:</h4>
                            {loadingClasses ? (
                                <p>Завантаження класів...</p>
                            ) : classes.length > 0 ? (
                                <ul className={styles.classesList}>
                                    {classes.map((classItem) => (
                                        <li key={classItem.id} className={styles.classItem}>
                                            {classItem.name}
                                            {["TEACHER", "SCHOOL_ADMIN"].includes(data.role) && (
                                                <button
                                                    className={styles.deleteClassButton}
                                                    onClick={() => handleDeleteConnectionClass(classItem.id)}
                                                >
                                                    ❌
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Відсутні</p>
                            )}

                            {["TEACHER", "SCHOOL_ADMIN"].includes(data.role) && availableClasses.length > 0 && (
                                <div className={styles.addClassContainer}>
                                    <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                                        <option value="">Виберіть клас</option>
                                        {availableClasses.map((classItem) => (
                                            <option key={classItem.id} value={classItem.id}>
                                                {classItem.name}
                                            </option>
                                        ))}
                                    </select>
                                    <button className={styles.createBtn} onClick={handleAddConnectionClass}>
                                        Додати клас
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}

            <Notification message={notification.message} type={notification.type} />
        </li>
    );
}

export default CourseItem;
