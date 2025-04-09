import React, { useState } from "react";
import styles from "./ClassList.module.css";

const ClassList = ({
  classes,
  onClassSelect,
  onAddClass,
  onDeleteClass,
  onEditClass,
  teachers,
  selectedTeacher,
  setSelectedTeacher,
  isLoading,
}) => {
  const [newClassName, setNewClassName] = useState("");
  const [editingClass, setEditingClass] = useState(null);
  const [editName, setEditName] = useState("");
  const [editTeacher, setEditTeacher] = useState("");

  const handleAdd = () => {
    if (newClassName && selectedTeacher) {
      onAddClass(newClassName, selectedTeacher);
      setNewClassName("");
      setSelectedTeacher("");
    }
  };

  const handleEdit = (cls) => {
    setEditingClass(cls);
    setEditName(cls.name);
    setEditTeacher(cls.teacher?.username || "");
  };

  const handleUpdate = () => {
    if (editingClass) {
      onEditClass(editingClass.id, {
        name: editName !== editingClass.name ? editName : undefined,
        homeroomTeacher:
          editTeacher !== editingClass.teacher?.username
            ? editTeacher
            : undefined,
      });
      setEditingClass(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingClass(null);
    setEditName("");
    setEditTeacher("");
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Завантаження класів...</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Список класів</h3>
      <table className={styles.classTable}>
        <thead>
          <tr>
            <th>№</th>
            <th>Клас</th>
            <th>Класний керівник</th>
            <th>К-сть учнів</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls, index) => (
            <tr key={cls.id}>
              <td>{index + 1}</td>
              <td>
                {editingClass?.id === cls.id ? (
                  <input
                    type="text"
                    className={styles.editInput}
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  cls.name
                )}
              </td>
              <td>
                {editingClass?.id === cls.id ? (
                  <select
                    className={styles.editInput}
                    value={editTeacher}
                    onChange={(e) => setEditTeacher(e.target.value)}
                  >
                    <option value="">Виберіть вчителя</option>
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.username}>
                        {teacher.firstName} {teacher.lastName}
                      </option>
                    ))}
                  </select>
                ) : (
                  `${cls.teacher?.firstName || ""} ${
                    cls.teacher?.lastName || ""
                  }`
                )}
              </td>
              <td>{cls.studentCount ?? 0}</td>
              <td>
                {editingClass?.id === cls.id ? (
                  <>
                    <button
                      className={`${styles.actionBtn} ${styles.saveBtn}`}
                      onClick={handleUpdate}
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
                      className={`${styles.actionBtn} ${styles.cancelBtn}`}
                      onClick={handleCancelEdit}
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
                  <>
                    <button
                      className={styles.editBtn}
                      onClick={() => handleEdit(cls)}
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
                      className={styles.deleteBtn}
                      onClick={() => onDeleteClass(cls.id)}
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
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.addClass}>
        <input
          type="text"
          placeholder="Назва класу"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
        />
        <select
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
        >
          <option value="">Виберіть вчителя класу</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.username}>
              {teacher.firstName} {teacher.lastName}
            </option>
          ))}
        </select>
        <button className={styles.createBtn} onClick={handleAdd}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 12H19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Додати клас
        </button>
      </div>
    </div>
  );
};

export default ClassList;
