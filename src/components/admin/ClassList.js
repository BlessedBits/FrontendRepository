import React, { useState } from "react";
import styles from "./AdminPanel.module.css";

const ClassList = ({
    classes,
    onClassSelect,
    onAddClass,
    onDeleteClass,
    teachers,
    selectedTeacher,
    setSelectedTeacher,
}) => {
    const [newClassName, setNewClassName] = useState("");

    const handleAdd = () => {
        if (newClassName) {
            onAddClass(newClassName, selectedTeacher);
        }
    };

    return (
        <div>
            <h3>Список класів</h3>
            <ul className={styles.classList}>
                {classes.map((cls) => (
                    <li key={cls.id} onClick={() => onClassSelect(cls.id)}>
                        {cls.name}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeleteClass(cls.id);
                            }}
                        >
                            🗑 Видалити
                        </button>
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
                            <option key={teacher.id} value={teacher.username}>
                                {teacher.firstName} {teacher.lastName}
                            </option>
                        ))}
                    </select>
                    <button className={styles.createBtn} onClick={handleAdd}>
                        Додати клас
                    </button>
                </div>
            </ul>
        </div>
    );
};

export default ClassList;
