import React, { useState } from "react";
import style from "./NewCourseModal.module.css";
import { createCourse } from "../../api/course";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Notification from "../basic/Notification";

function NewCourseModal({ onClose, onCourseCreated, data }) {
    const [courseData, setCourseData] = useState({ name: "" });
    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            await createCourse(data.schoolId, data.id, courseData.name, axiosPrivate);
            setNotification({
                type: "success",
                text: "Курс успішно створено!",
            });
            onCourseCreated();
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (err) {
            if (err.status === 500) {
                setNotification({
                    type: "error",
                    text: "Такий курс вже існує",
                });
            } else {
                setNotification({
                    type: "error",
                    text: "Щось пішло не так, спробуйте пізніше",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={style.modal}>
            <div className={style.modalContent}>
                <Notification message={notification?.text} type={notification?.type} />
                <h3>Додати новий курс</h3>
                <form onSubmit={handleSubmit} className={style.form}>
                    <input
                        className={style.input}
                        type="text"
                        placeholder="Назва курсу"
                        value={courseData.name}
                        onChange={(e) =>
                            setCourseData((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                        required
                    />
                    <div className={style.modalActions}>
                        <button type="submit" className={style.saveButton} disabled={loading}>
                            {loading ? "Завантаження..." : "Зберегти"}
                        </button>
                        <button type="button" className={style.cancelButton} onClick={onClose}>
                            Скасувати
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewCourseModal;
