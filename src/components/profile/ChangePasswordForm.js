import React, { useState } from "react";
import { changePassword } from "../../api/profile";
import styles from "./ChangePasswordForm.module.css"; // Імпорт модульних стилів

const ChangePasswordForm = ({ axiosPrivate, onSuccess, onClose }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await changePassword(oldPassword, newPassword, confirmPassword, axiosPrivate);
            onSuccess();
            onClose();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
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
            {error && <p className={styles.errorMessage}>{error}</p>}
        </>
    );
};

export default ChangePasswordForm;