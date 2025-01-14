import React, { useState, useRef, useEffect } from "react";
import SuccessTick from "./SuccessTick";
import { updateProfileInfo, updateProfileImage } from "../misc/ProfileApi"; 

const Modal = ({ isOpen, onClose }) => {
    const inputRef = useRef(null);
    const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
    const [isGmailModalOpen, setGmailModalOpen] = useState(false);
    const [isSuccessVisible, setSuccessVisible] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [gmail, setGmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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

    // Upload profile photo
    const handlePhotoUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setErrorMessage(""); 
            try {
                const reader = new FileReader();
                reader.onload = (e) => setSelectedPhoto(e.target.result);
                reader.readAsDataURL(file);

                await updateProfileImage(file);
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

    // Update Gmail
    const handleGmailSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Reset error message
        try {
            await updateProfileInfo({ email: gmail });
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

    if (!isOpen) {
        return null;
    }

    if (isChangePasswordOpen) {
        const handleSubmit = (e) => {
            e.preventDefault();
            setSuccessVisible(true);
            setTimeout(() => {
                setSuccessVisible(false);
                setChangePasswordOpen(false);
            }, 2000);
        };

        return (
            <div className="modal" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <span className="close-btn" onClick={() => setChangePasswordOpen(false)}>
                        &times;
                    </span>
                    <h1>Змінити пароль</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Старий пароль</label>
                            <input type="password" placeholder="Введіть старий пароль" required />
                        </div>
                        <div className="form-group">
                            <label>Новий пароль</label>
                            <input type="password" placeholder="Введіть новий пароль" required />
                        </div>
                        <button type="submit" className="submit-button">Відправити</button>
                    </form>
                </div>
                <SuccessTick isVisible={isSuccessVisible} />
            </div>
        );
    }

    if (isGmailModalOpen) {
        return (
            <div className="modal" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <span className="close-btn" onClick={() => setGmailModalOpen(false)}>
                        &times;
                    </span>
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
                </div>
                <SuccessTick isVisible={isSuccessVisible} />
            </div>
        );
    }

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close-btn" onClick={onClose}>&times;</span>
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
                                    borderRadius: "5px",
                                    marginTop: "10px",
                                }}
                            />
                        </div>
                    )}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            </div>
            <SuccessTick isVisible={isSuccessVisible} />
        </div>
    );
};

export default Modal;
