import React, { useState } from "react";
import Modal from "./ProfileModal";
import styles from "./Activity.module.css";

const ActivityProfile = ({ profileData }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleClose = () => {
        setIsEditing(false);
    };

    if (!profileData) return

    return (
        <section className={styles.profileContainer}>
        <div className={styles.profileSidebar}>
            <img src={profileData?.profileImage || "/ava.png" } alt="Profile" />
            <p className={styles.firstName}>
            <strong>{profileData?.firstName}</strong>
            <strong>{profileData?.secondName}</strong>
            </p>
            <button className={styles.editButton} onClick={handleEditClick}>
            Редагувати
            </button>
        </div>
        {isEditing && (
            <SettingsProfile
            onClose={handleClose}
            onChangePassword={() => alert("Зміна паролю")}
            />
        )}
        </section>
    );
};

const SettingsProfile = ({ onClose, onChangePassword }) => {
    return (
        <Modal isOpen={true} onClose={onClose} title="Налаштування профілю">
        <div className={styles.settingsMenu}>
            <button className={styles.actionButton} onClick={onChangePassword}>
            Змінити пароль
            </button>
            <button className={styles.actionButton} onClick={() => alert("Змінити Gmail")}>
            Змінити Gmail
            </button>
            <button className={styles.closeButton} onClick={onClose}>
            Закрити
            </button>
        </div>
        </Modal>
  );
};

export default ActivityProfile;
