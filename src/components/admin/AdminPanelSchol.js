import React, { useState, useEffect } from "react";
import styles from "./AdminPanel.module.css";
import Notification from "../basic/Notification";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
    getAllClassesSchool,
    getAllClassesStudents,
    createClasses,
    deleteClasses,
    addStudentsToClass,
} from "../../api/class";
import { getProfileInfoById, changePassword } from "../../api/profile";
import { updateUserName, updateRole, getUserSchool } from "../../api/user";
import { getSchoolTeachers } from "../../api/school";

const AdminPanelSchool = () => {
    const axiosPrivate = useAxiosPrivate();
    const [classes, setClasses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [students, setStudents] = useState([]);
    const [userSchoolId, setUserSchoolId] = useState(null);
    const [newClassName, setNewClassName] = useState("");
    const [notification, setNotification] = useState({ message: "", type: "" });

    useEffect(() => {
        async function fetchData() {
            try {
                const id = await getUserSchool(axiosPrivate);
                setUserSchoolId(id);
                const classesResponse = await getAllClassesSchool(id, axiosPrivate);
                setClasses(classesResponse);

                const teachersResponse = await getSchoolTeachers(0, axiosPrivate);
                setTeachers(teachersResponse);
            } catch (error) {
                setNotification({ message: "Помилка завантаження даних", type: "error" });
            }
        }

        fetchData();
    }, [axiosPrivate]);

    // Завантаження учнів для обраного класу
    const fetchStudents = async (classId) => {
        setSelectedClassId(classId);
        try {
            const response = await getAllClassesStudents(userSchoolId, axiosPrivate);
            const selectedClass = response.find((cls) => cls.id === classId);
            setStudents(selectedClass ? selectedClass.students : []);
        } catch (error) {
            setNotification({ message: "Помилка завантаження учнів", type: "error" });
        }
    };

    // Додавання класу
    const handleAddClass = async () => {
        if (!newClassName) return;
        try {
            const data = {
                name: newClassName,
                homeroomTeacher: "School52Teacher1",
                schooId: userSchoolId,
            };
            const response = await createClasses(data, axiosPrivate);
            setClasses([...classes, response.data]);
            setNewClassName("");
            setNotification({ message: "Клас створено!", type: "success" });
        } catch (error) {
            setNotification({ message: "Не вдалося створити клас", type: "error" });
        }
    };

    // Видалення класу
    const handleDeleteClass = async (classId) => {
        try {
            await deleteClasses(axiosPrivate, classId);
            setClasses(classes.filter((cls) => cls.id !== classId));
            setNotification({ message: "Клас видалено!", type: "success" });
        } catch (error) {
            setNotification({ message: "Не вдалося видалити клас", type: "error" });
        }
    };

    return (
        <div className={styles.adminPanel}>
            <h2>Адмін Панель</h2>

            {/* Сповіщення */}
            {notification.message && <Notification message={notification.message} type={notification.type} />}

            {/* Список класів */}
            <h3>Список класів</h3>
            <ul className={styles.classList}>
                {classes.map((cls) => (
                    <li key={cls.id} onClick={() => fetchStudents(cls.id)}>
                        {cls.name}
                        <button onClick={() => handleDeleteClass(cls.id)}>🗑 Видалити</button>
                    </li>
                ))}
                <div className={styles.addClass}>
                    <input
                        type="text"
                        placeholder="Назва класу"
                        value={newClassName}
                        onChange={(e) => setNewClassName(e.target.value)}
                    />

                    <select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
                        <option value="">Виберіть вчителя класу</option>
                        {teachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                                {teacher.firstName} {teacher.lastName}
                            </option>
                        ))}
                    </select>
                    <button className={styles.createBtn} onClick={handleAddClass}>
                        Додати клас
                    </button>
                </div>
            </ul>

            {/* Список учнів у класі */}
            {selectedClassId && (
                <div>
                    <h3>Учні</h3>
                    <ul className={styles.studentList}>
                        {students.length > 0 ? (
                            students.map((student) => <li key={student.id}>{student.username}</li>)
                        ) : (
                            <p>Учнів не знайдено</p>
                        )}
                    </ul>
                </div>
            )}

            {/* Список вчителів */}
            <h3>Список вчителів</h3>
            <ul className={styles.teacherList}>
                {teachers.map((teacher) => (
                    <li key={teacher.id}>
                        {teacher.firstName} {teacher.lastName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanelSchool;
