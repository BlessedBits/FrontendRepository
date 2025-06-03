import React, { useState } from "react";
import { updateUserName, updateRole, changePasswordAdmin } from "../../api/user";
import styles from "./User.list.module.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const UserList = ({ users, classes, isLoading, setNotification, setUsers }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortDirection, setSortDirection] = useState("asc");
    const [editUserId, setEditUserId] = useState(null);
    const [editFirstName, setEditFirstName] = useState("");
    const [editLastName, setEditLastName] = useState("");
    const [editRole, setEditRole] = useState("");
    const axiosPrivate = useAxiosPrivate();

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = !roleFilter || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const getRoleChipClass = (role) => {
        switch (role) {
            case "STUDENT":
                return styles.roleStudent;
            case "TEACHER":
                return styles.roleTeacher;
            case "SCHOOL_ADMIN":
            case "PLATFORM_ADMIN":
                return styles.roleAdmin;
            default:
                return "";
        }
    };

    const getTranslatedRole = (role) => {
        switch (role) {
            case "STUDENT":
                return "Учень";
            case "TEACHER":
                return "Вчитель";
            case "SCHOOL_ADMIN":
                return "Адмін школи";
            default:
                return role;
        }
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const startEditing = (user) => {
        setEditUserId(user.id);
        setEditFirstName(user.firstName || "");
        setEditLastName(user.lastName || "");
        setEditRole(user.role || "");
    };

    const saveChanges = async () => {
        const userIndex = users.findIndex((user) => user.id === editUserId);

        if (userIndex === -1) {
            setNotification({ message: "Користувача не знайдено", type: "error" });
            return;
        }

        const originalUser = users[userIndex]; // зберігаємо оригінал

        try {
            // Якщо є зміни імені або прізвища
            const hasNameChanges = editFirstName !== originalUser.firstName || editLastName !== originalUser.lastName;

            if (hasNameChanges) {
                await updateUserName(
                    editUserId,
                    {
                        firstName: editFirstName,
                        lastName: editLastName,
                    },
                    axiosPrivate
                );
            }

            const hasRoleChange = editRole && editRole !== originalUser.role;

            if (hasRoleChange && ["STUDENT", "TEACHER", "SCHOOL_ADMIN"].includes(editRole)) {
                await updateRole(editUserId, { role: editRole }, axiosPrivate);
            }

            // Створюємо копію списку користувачів і оновлюємо лише потрібного
            const updatedUsers = [...users];
            updatedUsers[userIndex] = {
                ...originalUser,
                firstName: editFirstName,
                lastName: editLastName,
                role: editRole,
            };

            setUsers(updatedUsers); // замінюємо після всіх успішних запитів
            setEditUserId(null);
            setNotification({ message: "Користувача оновлено", type: "success" });
        } catch (error) {
            setNotification({
                message: "Помилка при збереженні: " + (error.response?.data || "Невідома помилка"),
                type: "error",
            });
        }
    };

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        const aField = a[sortField] || "";
        const bField = b[sortField] || "";

        const aVal = typeof aField === "string" ? aField.toLowerCase() : aField;
        const bVal = typeof bField === "string" ? bField.toLowerCase() : bField;

        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
        return 0;
    });

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Завантаження користувачів...</p>
            </div>
        );
    }

    return (
        <div>
            <h3>Список користувачів</h3>

            <div className={styles.userFilters}>
                <input
                    type="text"
                    placeholder="Пошук за ім'ям, прізвищем або email"
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className={styles.filterSelect}
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                >
                    <option value="">Всі ролі</option>
                    <option value="STUDENT">Учні</option>
                    <option value="TEACHER">Вчителі</option>
                    <option value="SCHOOL_ADMIN">Адміністратори школи</option>
                </select>
            </div>

            <table className={styles.userTable}>
                <thead>
                    <tr>
                        <th className={styles.sort} onClick={() => handleSort("index")}>
                            №
                        </th>
                        <th className={styles.sort} onClick={() => handleSort("firstName")}>
                            Ім'я
                        </th>
                        <th className={styles.sort} onClick={() => handleSort("lastName")}>
                            Прізвище
                        </th>
                        <th className={styles.sort} onClick={() => handleSort("email")}>
                            Email
                        </th>
                        <th className={styles.sort} onClick={() => handleSort("role")}>
                            Роль
                        </th>
                        <th>Клас</th>
                        <th>Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>
                                {editUserId === user.id ? (
                                    <input value={editFirstName} onChange={(e) => setEditFirstName(e.target.value)} />
                                ) : (
                                    user.firstName
                                )}
                            </td>
                            <td>
                                {editUserId === user.id ? (
                                    <input value={editLastName} onChange={(e) => setEditLastName(e.target.value)} />
                                ) : (
                                    user.lastName
                                )}
                            </td>
                            <td>{user.email}</td>
                            <td>
                                {editUserId === user.id ? (
                                    <select value={editRole} onChange={(e) => setEditRole(e.target.value)}>
                                        <option value="STUDENT">Учень</option>
                                        <option value="TEACHER">Вчитель</option>
                                        <option value="SCHOOL_ADMIN">Адмін школи</option>
                                    </select>
                                ) : (
                                    <span className={`${styles.roleChip} ${getRoleChipClass(user.role)}`}>
                                        {getTranslatedRole(user.role)}
                                    </span>
                                )}
                            </td>
                            <td>
                                {user.role === "STUDENT"
                                    ? classes.find((c) => c.id === user.userClassId)?.name || "-"
                                    : user.role === "TEACHER"
                                    ? classes
                                          .filter((c) => c.homeroomTeacherId === user.id)
                                          .map((c) => c.name)
                                          .join(", ") || "-"
                                    : "-"}
                            </td>
                            <td>
                                {editUserId === user.id ? (
                                    <>
                                        <button
                                            onClick={saveChanges}
                                            className={`${styles.actionBtn} ${styles.saveBtn}`}
                                        >
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M20 6L9 17L4 12"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            Зберегти
                                        </button>
                                        <button
                                            onClick={() => setEditUserId(null)}
                                            className={`${styles.actionBtn} ${styles.cancelBtn}`}
                                        >
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M18 6L6 18"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M6 6L18 18"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            Скасувати
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => startEditing(user)}
                                        className={`${styles.actionButton} ${styles.editButton}`}
                                    >
                                        Редагувати
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
