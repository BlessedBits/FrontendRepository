import React, { useEffect, useState, memo } from "react";
import styles from "./Notification.module.css";

const Notification = memo(({ message, type, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!message) return;

        setVisible(true);

        if (type !== "loading") {
            const timeout = setTimeout(() => {
                setVisible(false);
                if (onClose) onClose();
            }, 5000);
            return () => clearTimeout(timeout);
        }
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
});

export default Notification;
