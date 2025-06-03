import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModuleItem from "./ModuleItem";
import styles from "./CourseItem.module.css";
import { getCourseInfo, getCourse, createModule, getSubmissions } from "../../api/course";
import { connectCourseClass, delConnectCourseClass } from "../../api/course";
import Notification from "../basic/Notification";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getAllClassesSchool } from "../../api/class";

function CourseItem({ baseInfo }) {
    const { courseId } = useParams();
    const [classes, setClasses] = useState([]);
    const [modules, setModules] = useState([]);
    const [availableClasses, setAvailableClasses] = useState([]);
    const [loadingClasses, setLoadingClasses] = useState(false);
    const [selectedClass, setSelectedClass] = useState("");
    const [notification, setNotification] = useState({ message: "", type: "" });
    const [courseDetails, setCourseDetails] = useState(null);
    const [loadingCourseDetails, setLoadingCourseDetails] = useState(false);
    const [newModule, setNewModule] = useState({ name: "", courseId: courseId });
    const [isCreatingModule, setIsCreatingModule] = useState(false);
    const [submissions, setSubmissions] = useState({});
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    // Завантажуємо деталі курсу
    useEffect(() => {
        const fetchCourseDetails = async () => {
            setLoadingCourseDetails(true);
            try {
                const response = await getCourse(courseId, axiosPrivate);
                setCourseDetails(response);
            } catch (error) {
                console.error("Помилка при завантаженні інформації про курс:", error);
                setNotification({ type: "error", message: "Не вдалося завантажити інформацію про курс" });
            } finally {
                setLoadingCourseDetails(false);
            }
        };
        fetchCourseDetails();
    }, [courseId, axiosPrivate]);

    // Завантажуємо модулі курсу
    useEffect(() => {
        const fetchModules = async () => {
            if (!courseDetails) return;
            setLoadingClasses(true);
            try {
                const response = await getCourseInfo(courseId, axiosPrivate);
                setModules(response);
            } catch (error) {
                console.error("Помилка при завантаженні модулів:", error);
                setNotification({ type: "error", message: "Не вдалося завантажити модулі курсу" });
            } finally {
                setLoadingClasses(false);
            }
        };
        fetchModules();
    }, [courseDetails, courseId, axiosPrivate]);

    useEffect(() => {
        if (["TEACHER", "SCHOOL_ADMIN"].includes(baseInfo.role) && courseDetails && courseDetails.classes) {
            const fetchClasses = async () => {
                setLoadingClasses(true);
                try {
                    const response = await getAllClassesSchool(baseInfo.schoolId, axiosPrivate);
                    setAvailableClasses(
                        response.filter((classItem) => !courseDetails.classes.some((cls) => cls.id === classItem.id))
                    );
                    setClasses(courseDetails.classes);
                } catch (err) {
                    console.error(err.message);
                    setNotification({ type: "error", message: "Не вдалося завантажити класи." });
                } finally {
                    setLoadingClasses(false);
                }
            };
            fetchClasses();
        }
    }, [axiosPrivate, baseInfo.role, baseInfo.schoolId, courseDetails]);

    // Функція для завантаження відповідей при натисканні на модуль
    const handleModuleClick = async (moduleId, assignmentId) => {
        if (!["TEACHER", "SCHOOL_ADMIN"].includes(baseInfo.role) || !assignmentId) return;
        try {
            const response = await getSubmissions(assignmentId, axiosPrivate);
            setSubmissions((prev) => ({
                ...prev,
                [moduleId]: response,
            }));
            console.log(submissions);
        } catch (error) {
            console.error("Помилка при завантаженні відповідей:", error);
            setNotification({ type: "error", message: "Не вдалося завантажити відповіді до завдання" });
        }
    };

    // Створення нового модуля
    const handleCreateModule = async () => {
        if (!newModule.name.trim()) {
            setNotification({ type: "error", message: "Назва теми не може бути порожньою" });
            return;
        }
        setNotification({ type: "loading", message: "Створення теми..." });
        try {
            const response = await createModule(newModule, axiosPrivate);
            setModules((prevModules) => [...prevModules, response]);

            setNotification({ type: "success", message: "Тема створено успішно" });
            setNewModule({ name: "", courseId: courseId });
            setIsCreatingModule(false);
        } catch (error) {
            console.error("Помилка при створенні теми:", error);
            setNotification({ type: "error", message: "Не вдалося створити тему" });
        }
    };

    const handleAddConnectionClass = async () => {
        if (!selectedClass) return;
        setNotification({ type: "loading", message: "Додаємо клас..." });
        try {
            await connectCourseClass(selectedClass, courseId, axiosPrivate);
            setNotification({ type: "success", message: "Клас успішно додано" });

            const newClass = availableClasses.find((c) => c.id === parseInt(selectedClass, 10));
            setClasses([...classes, newClass]);
            setAvailableClasses(availableClasses.filter((c) => c.id !== parseInt(selectedClass, 10)));
            setSelectedClass("");
        } catch (error) {
            console.error("Помилка при додаванні класу:", error);
            setNotification({ type: "error", message: "Не вдалося додати клас" });
        }
    };

    const handleDeleteConnectionClass = async (id) => {
        setNotification({ type: "loading", message: "Видаляємо зв'язок..." });
        try {
            await delConnectCourseClass(id, courseId, axiosPrivate);
            setNotification({ type: "success", message: "Зв'язок видалено" });
            setClasses((prevClasses) => prevClasses.filter((classItem) => classItem.id !== id));
            setAvailableClasses((prevAvailableClasses) => [
                ...prevAvailableClasses,
                classes.find((classItem) => classItem.id === id),
            ]);
        } catch (error) {
            console.error("Помилка при видаленні зв'язку:", error);
            setNotification({ type: "error", message: "Помилка. Спробуйте пізніше" });
        }
    };

    const onModuleDeleted = (moduleId) => {
        setModules((prevModules) => prevModules.filter((module) => module.id !== moduleId));
        setSubmissions((prevSubmissions) => {
            const updatedSubmissions = { ...prevSubmissions };
            delete updatedSubmissions[moduleId];
            return updatedSubmissions;
        });
    };

    return (
        <>
            <>
                {loadingCourseDetails ? (
                    <p>Завантаження інформації про курс...</p>
                ) : (
                    <div className={styles.moduleContainer}>
                        <a className={styles.backLink} onClick={() => navigate("/courses/")}>
                            Вернутися назад
                        </a>
                        {courseDetails && <h4 className={styles.h4}>{courseDetails.name}</h4>}
                        <ul className={styles.modules}>
                            {modules?.length > 0 ? (
                                modules.map((module) => (
                                    <ModuleItem
                                        key={module.id}
                                        module={module}
                                        userRole={baseInfo.role}
                                        submissions={submissions[module.id] || []}
                                        onModuleClick={handleModuleClick}
                                        onModuleDeleted={onModuleDeleted}
                                    />
                                ))
                            ) : (
                                <p>Теми відсутні</p>
                            )}
                        </ul>
                        {["TEACHER", "SCHOOL_ADMIN"].includes(baseInfo.role) && (
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
                                            onClick={() => setIsCreatingModule(false)}
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

                {["TEACHER", "SCHOOL_ADMIN"].includes(baseInfo.role) && (
                    <div className={styles.classesContainer}>
                        <h4 className={styles.h5}>Класи в яких є даний предмет:</h4>
                        {loadingClasses ? (
                            <p>Завантаження класів...</p>
                        ) : classes.length > 0 ? (
                            <ul className={styles.classesList}>
                                {classes.map((classItem) => (
                                    <li key={classItem.id} className={styles.classItem}>
                                        {classItem.name}
                                        {["TEACHER", "SCHOOL_ADMIN"].includes(baseInfo.role) && (
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

                        {["TEACHER", "SCHOOL_ADMIN"].includes(baseInfo.role) && availableClasses.length > 0 && (
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
            <Notification message={notification.message} type={notification.type} />
        </>
    );
}

export default CourseItem;
