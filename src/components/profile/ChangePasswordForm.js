import React, { useState } from "react";
import { changePassword } from "../../api/profile";

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
                <div className="form-group">
                    <label>Старий пароль</label>
                    <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Новий пароль</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Підтвердьте новий пароль</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <button type="submit" className="submit-button">Відправити</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </>
    );
};

export default ChangePasswordForm;
