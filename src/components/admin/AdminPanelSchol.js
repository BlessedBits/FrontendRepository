import React, { useState, useEffect } from "react";
import styles from "./AdminPanel.module.css";
import Notification from "../basic/Notification";
import ClassList from "./ClassList";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getAllClassesWithHomeTeacher, createClasses, deleteClasses, updateClass } from "../../api/class";
import { getAllUserSchools } from "../../api/school";
import UserList from "./UserList";

const AdminPanelSchool = ({ baseInfo }) => {
    const axiosPrivate = useAxiosPrivate();
    const [classes, setClasses] = useState([]);
    const [users, setUsers] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [notification, setNotification] = useState({ message: "", type: "" });
    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [activeSection, setActiveSection] = useState("classes");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // Get classes with teacher information
                const classesResponse = await getAllClassesWithHomeTeacher(baseInfo.schoolId, axiosPrivate);
                setClasses(classesResponse);

                const schoolResponse = await getAllUserSchools(baseInfo.schoolId, axiosPrivate);
                const fetchedUsers = schoolResponse.users || [];
                setUsers(fetchedUsers);
                setTeachers(fetchedUsers.filter((u) => u.role === "TEACHER"));
            } catch (error) {
                setNotification({
                    message: "Помилка завантаження даних: " + (error.response?.data || "Невідома помилка"),
                    type: "error",
                });
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [axiosPrivate, baseInfo.schoolId]);

    const handleAddClass = async (name, teacherId) => {
        try {
            const data = {
                name,
                homeroomTeacher: teacherId,
                schoolId: baseInfo.schoolId,
            };
            const response = await createClasses(data, axiosPrivate);

            setClasses((prev) => [...prev, response]);

            setNotification({ message: "Клас успішно створено!", type: "success" });
        } catch (error) {
            setNotification({
                message: "Помилка створення класу: " + (error.response?.data || "Невідома помилка"),
                type: "error",
            });
        }
    };

    const handleDeleteClass = async (classId) => {
        if (window.confirm("Ви впевнені, що хочете видалити цей клас?")) {
            try {
                await deleteClasses(classId, axiosPrivate);
                setClasses(classes.filter((cls) => cls.id !== classId));
                setNotification({ message: "Клас успішно видалено!", type: "success" });
            } catch (error) {
                setNotification({
                    message: "Помилка видалення класу: " + (error.response?.data || "Невідома помилка"),
                    type: "error",
                });
            }
        }
    };

    const handleEditClass = async (classId, updates) => {
        try {
            const originalClass = classes.find((cls) => cls.id === classId);
            if (!originalClass) {
                setNotification({ message: "Клас не знайдено", type: "error" });
                return;
            }

            const updatedData = {
                name: updates.name ?? originalClass.name,
                homeroomTeacher: updates.homeroomTeacher?.username ?? originalClass.homeroomTeacher?.username,
            };

            await updateClass(classId, updatedData, axiosPrivate);

            setClasses((prevClasses) =>
                prevClasses.map((cls) =>
                    cls.id === classId
                        ? {
                              ...cls,
                              name: updatedData.name,
                              homeroomTeacher: updates.homeroomTeacher ?? originalClass.homeroomTeacher,
                          }
                        : cls
                )
            );

            setNotification({ message: "Клас успішно оновлено!", type: "success" });
        } catch (error) {
            setNotification({
                message: "Помилка оновлення класу: " + (error.response?.data || "Невідома помилка"),
                type: "error",
            });
        }
    };

    const renderContent = () => {
        switch (activeSection) {
            case "classes":
                return (
                    <ClassList
                        classes={classes}
                        teachers={teachers}
                        selectedTeacher={selectedTeacher}
                        setSelectedTeacher={setSelectedTeacher}
                        onAddClass={handleAddClass}
                        onDeleteClass={handleDeleteClass}
                        onEditClass={handleEditClass}
                        isLoading={isLoading}
                    />
                );
            case "users":
                return (
                    <UserList
                        schoolId={baseInfo.schoolId}
                        classes={classes}
                        users={users}
                        setNotification={setNotification}
                        setUsers={setUsers}
                    />
                );
            case "schedule":
                return <div className={styles.scheduleSection}>Schedule section coming soon...</div>;
            default:
                return null;
        }
    };

    return (
        <>
            <div className={styles.adminPanel}>
                <div className={styles.headerBox}>
                    <h2 className={styles.pageTitle}>Адмін Панель</h2>
                    <div className={styles.navigation}>
                        <button
                            className={`${styles.navButton} ${activeSection === "classes" ? styles.active : ""}`}
                            onClick={() => setActiveSection("classes")}
                        >
                            Classes
                        </button>
                        <button
                            className={`${styles.navButton} ${activeSection === "users" ? styles.active : ""}`}
                            onClick={() => setActiveSection("users")}
                        >
                            Users
                        </button>
                        <button
                            className={`${styles.navButton} ${activeSection === "schedule" ? styles.active : ""}`}
                            onClick={() => setActiveSection("schedule")}
                        >
                            Schedule
                        </button>
                    </div>
                    {renderContent()}
                </div>
            </div>
            <Notification message={notification.message} type={notification.type} />
        </>
    );
};

export default AdminPanelSchool;
