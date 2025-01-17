import React, { useState } from "react";
import Modal from "./ProfileModal";

const ActivityProfile = ({ userId }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleClose = () => {
        setIsEditing(false);
    };

    return (
        <div className="profile-container">
            <div className="profile-sidebar">
                <img src={"/ava.png"} alt="Аватар користувача" />
                <p className="profile-name">
                    <strong>Ім'я Користувача</strong>
                </p>
                <button className="edit-button" onClick={handleEditClick}>
                    Редагувати
                </button>
            </div>           
            {isEditing &&
                <SettingsProfile
                    userId={userId}
                    onClose={handleClose}
                    onChangePassword={() => alert("Зміна паролю")}
                />
            }
        </div>
    );
};

const SettingsProfile = ({ userId, onClose, onChangePassword }) => {
    return (
        <Modal isOpen={true} onClose={onClose} title="Налаштування профілю">
            <div className="settings-menu">
                <button className="action-button" onClick={onChangePassword}>
                    Змінити пароль
                </button>
                <button className="action-button" onClick={() => alert("Змінити Gmail")}>
                    Змінити Gmail
                </button>
                <button className="close-button" onClick={onClose}>
                    Закрити
                </button>
            </div>
        </Modal>
    );
};

export default ActivityProfile;
