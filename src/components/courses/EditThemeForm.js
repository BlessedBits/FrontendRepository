import React, { useState } from "react";
import { updateTheme } from "../../api/theme";
import styles from "./EditThemeForm.module.css";
import Notification from "../basic/Notification";

function EditThemeForm({ theme, courseId, onCancel, onSave, setCourseList }) {
    const [formData, setFormData] = useState({
        name: theme.name || "",
        description: theme.description || "",
        homework: theme.homework || "",
        links: theme.links ? theme.links.join(", ") : "",
    });
    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setNotification(null);

        const updatedTheme = {
            ...formData,
            links: formData.links.split(",").map((link) => link.trim()), // Розділяємо посилання
        };

        try {
            setLoading(true);
            const response = await updateTheme(courseId, theme.id, updatedTheme); // API-запит
            setNotification({ type: "success", text: "Тему успішно оновлено!" });

            onSave(response); // Оновлюємо дані у батьківському компоненті
            setTimeout(() => {
                setNotification(null);
            }, 1500);
        } catch (error) {
            setNotification({
                type: "error",
                text: "Щось пішло не так. Перевірте дані та спробуйте знову.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.editForm}>
            <Notification message={notification?.text} type={notification?.type} />

            <h3>Редагувати тему</h3>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Назва:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>Опис:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                    <label>Домашнє завдання:</label>
                    <textarea name="homework" value={formData.homework} onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                    <label>Посилання (через кому):</label>
                    <textarea name="links" value={formData.links} onChange={handleChange} />
                </div>
                <div className={styles.actions}>
                    <button type="submit" disabled={loading} className={styles.saveButton}>
                        {loading ? "Збереження..." : "Зберегти"}
                    </button>
                    <button type="button" onClick={onCancel} className={styles.cancelButton}>
                        Скасувати
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditThemeForm;
