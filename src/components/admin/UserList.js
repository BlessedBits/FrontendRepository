import React, { useState, useEffect } from "react";
import styles from "./AdminPanel.module.css";
import { updateUserName, changePasswordAdmin } from "../../api/user";
import Notification from "../basic/Notification";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const UserList = ({ classes, users }) => {
    const axiosPrivate = useAxiosPrivate();
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filter, setFilter] = useState("allTeachers");
    const [editingUserId, setEditingUserId] = useState(null);
    const [editingPasswordId, setEditingPasswordId] = useState(null);
    const [editedName, setEditedName] = useState({ firstName: "", lastName: "" });
    const [editedPassword, setEditedPassword] = useState("");
    const [notification, setNotification] = useState({ message: "", type: "" });

    useEffect(() => {
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
    }, [filter, users]);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSaveName = async (userId) => {
        try {
            await updateUserName(userId, editedName, axiosPrivate);
            setEditingUserId(null);
            setNotification({ message: "Ім'я оновлено!", type: "success" });
        } catch {
            setNotification({ message: "Не вдалося оновити ім'я", type: "error" });
        }
    };

    const handleSavePassword = async (userId) => {
        try {
            await changePasswordAdmin(userId, { password: editedPassword }, axiosPrivate);
            setEditingPasswordId(null);
            setNotification({ message: "Пароль змінено!", type: "success" });
        } catch {
            setNotification({ message: "Не вдалося змінити пароль", type: "error" });
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
                                        value={editedName.firstName}
                                        onChange={(e) => setEditedName({ ...editedName, firstName: e.target.value })}
                                        placeholder="Ім'я"
                                    />
                                    <input
                                        value={editedName.lastName}
                                        onChange={(e) => setEditedName({ ...editedName, lastName: e.target.value })}
                                        placeholder="Прізвище"
                                    />
                                    <button className={styles.iconBtn} onClick={() => handleSaveName(user.id)}>
                                        ✅
                                    </button>
                                    <button className={styles.iconBtn} onClick={() => setEditingUserId(null)}>
                                        ❌
                                    </button>
                                </>
                            ) : editingPasswordId === user.id ? (
                                <>
                                    <input
                                        type="password"
                                        value={editedPassword}
                                        onChange={(e) => setEditedPassword(e.target.value)}
                                        placeholder="Новий пароль"
                                    />
                                    <button className={styles.iconBtn} onClick={() => handleSavePassword(user.id)}>
                                        ✅
                                    </button>
                                    <button className={styles.iconBtn} onClick={() => setEditingPasswordId(null)}>
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
                                            setEditedName({ firstName: user.firstName, lastName: user.lastName });
                                        }}
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        className={styles.iconBtn}
                                        onClick={() => {
                                            setEditingPasswordId(user.id);
                                            setEditedPassword("");
                                        }}
                                    >
                                        🔑
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
