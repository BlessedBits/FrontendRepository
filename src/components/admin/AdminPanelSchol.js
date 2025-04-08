import React, { useState, useEffect } from "react";
import styles from "./AdminPanel.module.css";
import Notification from "../basic/Notification";
import ClassList from "./ClassList";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getAllClassesSchool, createClasses, deleteClasses } from "../../api/class";
import { getAllUserSchools } from "../../api/school";
import UserList from "./UserList";

const AdminPanelSchool = ({ baseInfo }) => {
    const axiosPrivate = useAxiosPrivate();
    const [classes, setClasses] = useState([]);
    const [users, setUsers] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [notification, setNotification] = useState({ message: "", type: "" });
    const [selectedTeacher, setSelectedTeacher] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const classesResponse = await getAllClassesSchool(baseInfo.schoolId, axiosPrivate);
                setClasses(classesResponse);

                const schoolResponse = await getAllUserSchools(baseInfo.schoolId, axiosPrivate);
                const fetchedUsers = schoolResponse.users || [];
                setUsers(fetchedUsers);
                setTeachers(fetchedUsers.filter((u) => u.role === "TEACHER"));
            } catch {
                setNotification({ message: "Помилка завантаження даних", type: "error" });
            }
        };
        fetchData();
    }, [axiosPrivate, baseInfo.schoolId]);

    const handleAddClass = async (name, teacherId) => {
        try {
            const data = { name, homeroomTeacher: teacherId, schoolId: baseInfo.schoolId };
            await createClasses(data, axiosPrivate);
            setClasses([...classes, data]);

            setNotification({ message: "Клас створено!", type: "success" });
        } catch {
            setNotification({ message: "Не вдалося створити клас", type: "error" });
        }
    };

    const handleDeleteClass = async (classId) => {
        try {
            await deleteClasses(classId, axiosPrivate);
            setClasses(classes.filter((cls) => cls.id !== classId));
            setNotification({ message: "Клас видалено!", type: "success" });
        } catch (error) {
            setNotification({ message: "Не вдалося видалити клас", type: "error" });
        }
    };

    return (
        <div className={styles.adminPanel}>
            <h2>Адмін Панель</h2>
            {notification.message && <Notification message={notification.message} type={notification.type} />}

            {classes && (
                <ClassList
                    classes={classes}
                    teachers={teachers}
                    selectedTeacher={selectedTeacher}
                    setSelectedTeacher={setSelectedTeacher}
                    onAddClass={handleAddClass}
                    onDeleteClass={handleDeleteClass}
                />
            )}
            <UserList schoolId={baseInfo.schoolId} classes={classes} users={users} />
        </div>
    );
};

export default AdminPanelSchool;
