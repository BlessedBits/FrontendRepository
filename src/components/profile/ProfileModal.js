import React, { useState, useEffect, useCallback } from "react";
import SuccessTick from "./SuccessTick";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ChangePasswordForm from "./ChangePasswordForm";
import GmailForm from "./GmailForm";
import PhotoUpload from "./PhotoUpload";
import styles from "./ProfileModal.module.css"; 

const Modal = ({ isOpen, onClose }) => {
    const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
    const [isGmailModalOpen, setGmailModalOpen] = useState(false);
    const [isSuccessVisible, setSuccessVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setChangePasswordOpen(false);
                setGmailModalOpen(false);
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    const showSuccessMessage = useCallback(() => {
        setSuccessVisible(true);
        setTimeout(() => setSuccessVisible(false), 2000);
    }, []);

    if (!isOpen) return null;

    return (
        <div className={styles.modal} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <span className={styles.closeBtn} onClick={onClose}>&times;</span>

                {isChangePasswordOpen ? (
                    <ChangePasswordForm 
                        axiosPrivate={axiosPrivate}
                        onSuccess={showSuccessMessage}
                        onClose={() => setChangePasswordOpen(false)}
                    />
                ) : isGmailModalOpen ? (
                    <GmailForm
                        axiosPrivate={axiosPrivate}
                        onSuccess={showSuccessMessage}
                        onClose={() => setGmailModalOpen(false)}
                    />
                ) : (
                    <>
                        <h1>Налаштування</h1>
                        <div className={styles.formButtons}>
                            <button onClick={() => setChangePasswordOpen(true)} className={styles.actionButton}>
                                Змінити пароль
                            </button>
                            <button onClick={() => setGmailModalOpen(true)} className={styles.actionButton}>
                                Прив'язати Gmail
                            </button>
                            <PhotoUpload axiosPrivate={axiosPrivate} onSuccess={showSuccessMessage} />
                            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                        </div>
                    </>
                )}
            </div>
            <SuccessTick isVisible={isSuccessVisible} />
        </div>
    );
};

export default Modal;