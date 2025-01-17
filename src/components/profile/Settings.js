import React from "react";
import Modal from "./ProfileModal";

const SettingsProfile = ({ isOpen, onClose, onChangePassword }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Налаштування профілю">
            <div className="settings-menu">
                <button className="action-button" onClick={onChangePassword}>
                    Змінити пароль
                </button>
                <button className="action-button" onClick={() => alert("Змінити Gmail")}>
                    Змінити Gmail
                </button>
            </div>
        </Modal>
    );
};

export default SettingsProfile;
