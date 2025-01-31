import React from "react";
import styles from "./Info.module.css"; 

const InfoProfile = () => {
    return (
        <section className={styles.profileDetails}>
            <h2>Інформація</h2>
            <hr />
            <div className={styles.profileRow}>
                <div className={styles.profileItem}>
                    <p className={styles.label}>
                        <strong>Email:</strong>
                    </p>
                    <p className={styles.value}>user@example.com</p>
                </div>
                <div className={styles.profileItem}>
                    <p className={styles.label}>
                        <strong>Статус:</strong>
                    </p>
                    <p className={styles.value}>Учень/Вчитель</p>
                </div>
            </div>
            <div className={styles.profileRow}>
                <div className={styles.profileItem}>
                    <p className={styles.label}>
                        <strong>Школа:</strong>
                    </p>
                    <p className={styles.value}>Назва школи</p>
                </div>
            </div>
        </section>
    );
};

export default InfoProfile;