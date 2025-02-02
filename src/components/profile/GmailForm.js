import React, { useState } from "react";
import { updateProfileInfo } from "../../api/profile";
import styles from "./GmailForm.module.css"; 
import Notification from "../basic/Notification"; 

const GmailForm = ({ axiosPrivate, onClose }) => {
    const [gmail, setGmail] = useState("");
    const [message, setMessage] = useState(null); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        try {
            await updateProfileInfo({ email: gmail }, axiosPrivate);
            setMessage({ type: "success", text: "Наш направлено лист підтвердження" });

            setTimeout(() => {
                onClose(); 
            }, 1500);
        } catch (error) {
            if (error.message === "Incorrect data") {
                setMessage({ type: "error", text: "Цей email вже зайнятий" });
            } else if(error.message === "Unauthorized: Invalid access token."){
                setMessage({ type: "error", text: "У вас вже прив'язаний email" });
            } else {
                setMessage({ type: "error", text: "Щось пішло не так, спробуйте пізніше" });
            }
        }
    };

    return (
        <>
            <Notification message={message?.text} type={message?.type} />

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
        </>
    );
};

export default GmailForm;
