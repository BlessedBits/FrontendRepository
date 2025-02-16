import React, { useState } from "react";
import { updateProfileInfo } from "../../api/profile";
import Notification from "../basic/Notification";
import styles from "./GmailForm.module.css";

const GmailForm = ({ axiosPrivate, onClose }) => {
    const [gmail, setGmail] = useState("");
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: "loading", text: "Обробка запиту..." });

        try {
            await updateProfileInfo({ email: gmail }, axiosPrivate);
            setMessage({ type: "success", text: "Лист підтвердження відправлено." });
            setTimeout(onClose, 1500);
        } catch (error) {
            const errorMessage =
                error.message === "Incorrect data"
                    ? "Цей email вже зайнятий."
                    : error.message === "Unauthorized: Invalid access token."
                    ? "У вас вже прив'язаний email."
                    : "Щось пішло не так, спробуйте пізніше.";
            setMessage({ type: "error", text: errorMessage });
        }
    };

    return (
        <>
            <Notification message={message?.text} type={message?.type} />
            <h1>Прив'язати Gmail</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Ваш Gmail</label>
                    <input type="email" value={gmail} onChange={(e) => setGmail(e.target.value)} required />
                </div>
                <button type="submit" className={styles.submitButton}>
                    Відправити
                </button>
            </form>
        </>
    );
};

export default GmailForm;
