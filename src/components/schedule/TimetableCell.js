import React, { useState } from "react";
import styles from "./Schedule.module.css";

const TimetableCell = ({ data, isAdmin, day, time, onCreate, onUpdate, onDelete, courses }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(data?.course?.id || "");
    const [roomNumber, setRoomNumber] = useState(data?.room || "");

    const handleUpdate = () => {
        onUpdate(data.id, {
            courseId: selectedCourse,
            roomNumber: roomNumber.trim() === "" ? 0 : roomNumber,
            startTime: time.start,
            endTime: time.end,
            dayOfWeek: day,
        });
        setIsEditing(false);
    };

    return (
        <div className="timetable-cell">
            {isEditing ? (
                <div>
                    <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                        <option value="" disabled>
                            Оберіть курс
                        </option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                        placeholder="Кабінет"
                    />
                    <button onClick={handleUpdate}>Зберегти</button>
                    <button onClick={() => setIsEditing(false)}>Скасувати</button>
                </div>
            ) : data ? (
                <>
                    <div>{data.course?.name || "Без курсу"}</div>
                    {data.room && data.room !== "0" && <div>Кабінет {data.room}</div>}
                    {isAdmin && (
                        <div className="admin-actions">
                            <button className={styles.iconBtn} onClick={() => setIsEditing(true)}>
                                ✏️ Редагувати
                            </button>
                            <button className={styles.iconBtn} onClick={() => onDelete(data.id)}>
                                🗑️ Видалити
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {isAdmin && (
                        <button className={styles.iconBtn} onClick={() => onCreate(day, time)}>
                            ➕ Додати заннятя
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default TimetableCell;
