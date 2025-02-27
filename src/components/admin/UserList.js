import React, { useState, useEffect } from "react";
import styles from "./AdminPanel.module.css";
import { updateUserName, changePasswordAdmin } from "../../api/user";
import Notification from "../basic/Notification";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const UserList = ({ schoolId, classes, users }) => {
    const axiosPrivate = useAxiosPrivate();
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filter, setFilter] = useState("allTeachers");
    const [editingUserId, setEditingUserId] = useState(null);
    const [editedData, setEditedData] = useState({ firstName: "", lastName: "", password: "" });
    const [notification, setNotification] = useState({ message: "", type: "" });

    useEffect(() => {
        // Фільтруємо користувачів кожного разу, коли змінюється filter або users
        let filtered = [];
        if (filter === "all") {
            filtered = users;
        } else if (filter === "allTeachers") {
            filtered = users.filter((u) => u.role === "TEACHER");
        } else if (filter === "allStudents") {
            filtered = users.filter((u) => u.role === "STUDENT");
        } else {
            filtered = users.filter((u) => u.role === "STUDENT" && String(u.userClassId) === String(filter));
        }
        setFilteredUsers(filtered);
    }, [filter, users]); // Ефект спрацьовує лише коли filter або users змінюються

    const handleFilterChange = (e) => {
        const selectedFilter = e.target.value;
        setFilter(selectedFilter);
    };

    const handleSave = async (userId) => {
        try {
            if (editedData.firstName && editedData.lastName) {
                await updateUserName(
                    userId,
                    { firstName: editedData.firstName, lastName: editedData.lastName },
                    axiosPrivate
                );
            }
            if (editedData.password) {
                await changePasswordAdmin(userId, { password: editedData.password }, axiosPrivate);
            }

            const updated = users.map((user) =>
                user.id === userId ? { ...user, firstName: editedData.firstName, lastName: editedData.lastName } : user
            );
            setEditingUserId(null);
            setNotification({ message: "Дані оновлено!", type: "success" });
        } catch {
            setNotification({ message: "Не вдалося оновити дані", type: "error" });
        }
    };

    return (
        <div className={styles.userList}>
            {notification.message && <Notification message={notification.message} type={notification.type} />}
            <h3>Список користувачів</h3>
            <select value={filter} onChange={handleFilterChange}>
                <option value="all">Усі</option>
                <option value="allTeachers">Усі вчителі</option>
                <option value="allStudents">Усі учні</option>
                {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                        Учні {cls.name}
                    </option>
                ))}
            </select>

            <ul className={styles.userListTable}>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <li key={user.id}>
                            {editingUserId === user.id ? (
                                <>
                                    <input
                                        value={editedData.firstName}
                                        onChange={(e) => setEditedData({ ...editedData, firstName: e.target.value })}
                                        placeholder="Ім'я"
                                    />
                                    <input
                                        value={editedData.lastName}
                                        onChange={(e) => setEditedData({ ...editedData, lastName: e.target.value })}
                                        placeholder="Прізвище"
                                    />
                                    <input
                                        value={editedData.password}
                                        onChange={(e) => setEditedData({ ...editedData, password: e.target.value })}
                                        placeholder="Новий пароль"
                                    />
                                    <button className={styles.iconBtn} onClick={() => handleSave(user.id)}>
                                        ✅
                                    </button>
                                    <button className={styles.iconBtn} onClick={() => setEditingUserId(null)}>
                                        ❌
                                    </button>
                                </>
                            ) : (
                                <>
                                    {user.firstName} {user.lastName} | {user.role}
                                    <button
                                        className={styles.iconBtn}
                                        onClick={() => {
                                            setEditingUserId(user.id);
                                            setEditedData({
                                                firstName: user.firstName,
                                                lastName: user.lastName,
                                                password: "",
                                            });
                                        }}
                                    >
                                        ✏️
                                    </button>
                                </>
                            )}
                        </li>
                    ))
                ) : (
                    <p>Користувачів не знайдено</p>
                )}
            </ul>
        </div>
    );
};

export default UserList;
