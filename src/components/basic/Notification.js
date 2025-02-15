import React, { useEffect, useState } from "react";
import styles from "./Notification.module.css";

const Notification = ({ message, type, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (!message) return;

        const timeout = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
        }, 5000);

        return () => clearTimeout(timeout);
    }, [message]);

    if (!message || !visible) return null;

    return (
        <div
            className={`${styles.notification} 
                         ${type === "success" ? styles.success : type === "error" ? styles.error : styles.loading}`}
        >
            {message}
        </div>
    );
};

export default Notification;
