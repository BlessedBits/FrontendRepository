import React from "react";
import Modal from "./ProfileModal";
import styles from "./Settings.module.css"; 

const SettingsProfile = ({ isOpen, onClose, onChangePassword }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Налаштування профілю">
            <div className={styles.settingsMenu}>
                <button className={styles.actionButton} onClick={onChangePassword}>
                    Змінити пароль
                </button>
                <button className={styles.actionButton} onClick={() => alert("Змінити Gmail")}>
                    Змінити Gmail
                </button>
            </div>
        </Modal>
    );
};

export default SettingsProfile;