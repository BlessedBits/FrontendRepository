import React, { useState } from "react";
import { changePassword } from "../../api/profile";
import styles from "./ChangePasswordForm.module.css";
import Notification from "../basic/Notification"; 

const ChangePasswordForm = ({ axiosPrivate, onClose }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (newPassword !== confirmPassword) {
            setError("Нові паролі не співпадають");
            setMessage({ type: "error", text: "Нові паролі не співпадають" });
            setTimeout(() => setMessage(null), 5000);
            return;
        }

        try {
            await changePassword(oldPassword, newPassword, confirmPassword, axiosPrivate);
            setMessage({ type: "success", text: "Пароль успішно змінено!" });
            setTimeout(() => {
                setMessage(null);
                onClose();
            }, 3000);
        } catch (error) {
            if (error.message === "Incorrect data") {
                setError("Неправильний пароль.");
                setMessage({ type: "error", text: "Неправильний пароль." });
            } else {
                setError("Щось пішло не так, спробуйте ще раз");
                setMessage({ type: "error", text: "Щось пішло не так, спробуйте ще раз" });
            }
            setTimeout(() => setMessage(null), 5000);
        }
    };

    return (
        <>
            <Notification message={message?.text} type={message?.type} />

            <h1>Змінити пароль</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Старий пароль</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Новий пароль</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Підтвердьте новий пароль</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.submitButton}>
                    Відправити
                </button>
            </form>
        </>
    );
};

export default ChangePasswordForm;