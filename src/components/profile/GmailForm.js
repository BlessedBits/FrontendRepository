import React, { useState } from "react";
import { updateProfileInfo } from "../../api/profile";
import styles from "./GmailForm.module.css"; 

const GmailForm = ({ axiosPrivate, onClose }) => {
    const [gmail, setGmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await updateProfileInfo({ email: gmail }, axiosPrivate);
            onClose();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <h1>Прив'язати Gmail</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Ваш Gmail</label>
                    <input
                        type="email"
                        value={gmail}
                        onChange={(e) => setGmail(e.target.value)}
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

export default GmailForm;