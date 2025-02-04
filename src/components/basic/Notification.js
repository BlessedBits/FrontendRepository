import React from "react";
import styles from "./Notification.module.css"; 

const Notification = ({ message, type }) => {
    if (!message) return null; 

    return (
        <div className={`${styles.notification} 
                         ${type === "success" ? styles.success : 
                          type === "error" ? styles.error : 
                          styles.loading}`}>
            {message}
        </div>
    );
};

export default Notification;
