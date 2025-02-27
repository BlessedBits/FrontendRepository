import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ChangePasswordForm from "./ChangePasswordForm";
import GmailForm from "./GmailForm";
import PhotoUpload from "./PhotoUpload";
import styles from "./ProfileModal.module.css"; 

const ProfileModal = ({ isOpen, onClose, userId }) => {
    const [activeForm, setActiveForm] = useState(null); 
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setActiveForm(null); 
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const renderActiveForm = () => {
        switch (activeForm) {
            case "changePassword":
                return (
                    <ChangePasswordForm
                        axiosPrivate={axiosPrivate}
                        onClose={() => setActiveForm(null)}
                    />
                );
            case "gmail":
                return (
                    <GmailForm
                        axiosPrivate={axiosPrivate}
                        onClose={() => setActiveForm(null)}
                    />
                );
            case "photoUpload":
                return (
                    <PhotoUpload
                        axiosPrivate={axiosPrivate}
                        userId={userId}
                        onClose={() => setActiveForm(null)}
                    />
                );
            default:
                return (
                    <>
                        <h1>Налаштування</h1>
                        <div className={styles.formButtons}>
                            <button onClick={() => setActiveForm("changePassword")} className={styles.actionButton}>
                                Змінити пароль
                            </button>
                            <button onClick={() => setActiveForm("gmail")} className={styles.actionButton}>
                                Прив'язати Gmail
                            </button>
                            <button onClick={() => setActiveForm("photoUpload")} className={styles.actionButton}>
                                Завантажити фото
                            </button>
                        </div>
                    </>
                );
        }
    };

    return (
        <dialog className={styles.modal} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <span className={styles.closeBtn} onClick={onClose}>&times;</span>
                {renderActiveForm()}
            </div>
        </dialog>
    );
};

export default ProfileModal;
