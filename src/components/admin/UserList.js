import React, { useState } from "react";
import styles from "./User.list.module.css";

const UserList = ({ users, classes, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

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
      case "PLATFORM_ADMIN":
        return "Адмін платформи";
      default:
        return role;
    }
  };

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
          <option value="PLATFORM_ADMIN">Адміністратори платформи</option>
        </select>
      </div>

      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>№</th>
            <th>Ім'я</th>
            <th>Прізвище</th>
            <th>Email</th>
            <th>Роль</th>
            <th>Клас</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <span
                  className={`${styles.roleChip} ${getRoleChipClass(
                    user.role
                  )}`}
                >
                  {getTranslatedRole(user.role)}
                </span>
              </td>
              <td>
                {user.role === "STUDENT"
                  ? classes.find((c) => c.id === user.classId)?.name || "-"
                  : user.role === "TEACHER"
                  ? classes
                      .filter((c) => c.homeroomTeacherId === user.id)
                      .map((c) => c.name)
                      .join(", ") || "-"
                  : "-"}
              </td>
              <td>
                <button
                  className={`${styles.actionButton} ${styles.editButton}`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Редагувати
                </button>
                <button
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 6H5H21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Видалити
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
