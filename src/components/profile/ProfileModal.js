import React, { useState, useRef, useEffect } from "react";
import SuccessTick from "./SuccessTick";
import { updateProfileInfo, updateProfileImage, changePassword } from "../../api/profile"; 
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


const Modal = ({ isOpen, onClose }) => {
    const inputRef = useRef(null);
    const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
    const [isGmailModalOpen, setGmailModalOpen] = useState(false);
    const [isSuccessVisible, setSuccessVisible] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [gmail, setGmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // States for change password
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [changePasswordError, setChangePasswordError] = useState("");
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                if (isChangePasswordOpen || isGmailModalOpen) {
                    setChangePasswordOpen(false);
                    setGmailModalOpen(false);
                } else {
                    onClose();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, isChangePasswordOpen, isGmailModalOpen, onClose]);

    const handlePhotoUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setErrorMessage(""); 
            try {
                const reader = new FileReader();
                reader.onload = (e) => setSelectedPhoto(e.target.result);
                reader.readAsDataURL(file);

                await updateProfileImage(file, axiosPrivate);
                setSuccessVisible(true);
                setTimeout(() => setSuccessVisible(false), 2000);
            } catch (error) {
                setErrorMessage(error.message || "Failed to update the profile image.");
            }
        }
    };

    const triggerFileInput = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleGmailSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(""); 
        try {
            await updateProfileInfo({ email: gmail }, axiosPrivate);
            setSuccessVisible(true);
            setTimeout(() => {
                setSuccessVisible(false);
                setGmailModalOpen(false);
                setGmail("");
            }, 2000);
        } catch (error) {
            setErrorMessage(error.message || "Failed to update Gmail.");
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setChangePasswordError("");
        try {
            await changePassword(oldPassword, newPassword, confirmPassword, axiosPrivate);
            setSuccessVisible(true);
            setTimeout(() => {
                setSuccessVisible(false);
                setChangePasswordOpen(false);
            }, 2000);
        } catch (error) {
            setChangePasswordError(error.message);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close-btn" onClick={onClose}>&times;</span>
                {isChangePasswordOpen ? (
                    <>
                        <h1>Змінити пароль</h1>
                        <form onSubmit={handlePasswordSubmit}>
                            <div className="form-group">
                                <label>Старий пароль</label>
                                <input
                                    type="password"
                                    placeholder="Введіть старий пароль"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Новий пароль</label>
                                <input
                                    type="password"
                                    placeholder="Введіть новий пароль"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Підтвердьте новий пароль</label>
                                <input
                                    type="password"
                                    placeholder="Підтвердьте новий пароль"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-button">
                                Відправити
                            </button>
                        </form>
                        {changePasswordError && <p className="error-message">{changePasswordError}</p>}
                    </>
                ) : isGmailModalOpen ? (
                    <>
                        <h1>Прив'язати Gmail</h1>
                        <form onSubmit={handleGmailSubmit}>
                            <div className="form-group">
                                <label>Ваш Gmail</label>
                                <input
                                    type="email"
                                    value={gmail}
                                    onChange={(e) => setGmail(e.target.value)}
                                    placeholder="Введіть вашу адресу Gmail"
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-button">Відправити</button>
                        </form>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </>
                ) : (
                    <>
                        <h1>Налаштування</h1>
                        <div className="form-buttons">
                            <button
                                type="button"
                                onClick={() => setChangePasswordOpen(true)}
                                className="action-button"
                            >
                                Змінити пароль
                            </button>
                            <button
                                type="button"
                                onClick={() => setGmailModalOpen(true)}
                                className="action-button"
                            >
                                Прив'язати Gmail
                            </button>
                            <button className="action-button" type="button" onClick={triggerFileInput}>
                                Завантажити фото
                            </button>
                            <input
                                ref={inputRef}
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handlePhotoUpload}
                            />
                            {selectedPhoto && (
                                <div className="photo-preview">
                                    <img
                                        src={selectedPhoto}
                                        alt="Попередній перегляд"
                                        style={{
                                            width: "100%",
                                            maxWidth: "300px",
                                            border: "1px solid #ddd",
                                            borderRadius: "12px",
                                            marginTop: "10px",
                                        }}
                                    />
                                </div>
                            )}
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                        </div>
                    </>
                )}
            </div>
            <SuccessTick isVisible={isSuccessVisible} />
        </div>
    );
};

export default Modal;
