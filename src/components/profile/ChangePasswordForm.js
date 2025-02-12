import React, { useState } from "react";
import { changePassword } from "../../api/profile";
import Notification from "../basic/Notification";
import styles from "./ChangePasswordForm.module.css";

const ChangePasswordForm = ({ axiosPrivate, onClose }) => {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [message, setMessage] = useState(null);

    const [showPasswords, setShowPasswords] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field], 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { oldPassword, newPassword, confirmPassword } = formData;

        if (newPassword !== confirmPassword) {
            setMessage({ type: "error", text: "Нові паролі не співпадають" });
            return;
        }

        setMessage({ type: "loading", text: "Оновлення паролю..." });

        try {
            await changePassword(oldPassword, newPassword, confirmPassword, axiosPrivate);
            setMessage({ type: "success", text: "Пароль успішно змінено!" });
            setTimeout(onClose, 1500);
        } catch (error) {
            if(error.message === "Incorrect data.")
                setMessage({ type: "error", text: "Невірний логін, або пароль" });
            else
            setMessage({ type: "error", text: "Помилка. Спробуйте ще раз." });
        }
    };

    return (
        <>
            <Notification message={message?.text} type={message?.type} />
            <h1>Змінити пароль</h1>
            <form onSubmit={handleSubmit}>
                {["oldPassword", "newPassword", "confirmPassword"].map((field, idx) => (
                    <div className={styles.formGroup} key={idx}>
                        <label>
                            {field === "oldPassword"
                                ? "Старий пароль"
                                : field === "newPassword"
                                ? "Новий пароль"
                                : "Підтвердіть пароль"}
                        </label>
                        <div className={styles.passwordContainer}>
                            <input
                                type={showPasswords[field] ? "text" : "password"}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className={styles.showPasswordButton}
                                onClick={() => togglePasswordVisibility(field)}
                            >
                                {showPasswords[field] ? "🙈" : "👁️"} 
                            </button>
                        </div>
                    </div>
                ))}
                <button type="submit" className={styles.submitButton}>
                    Відправити
                </button>
            </form>
        </>
    );
};

export default ChangePasswordForm;
