import React, { useState } from "react";
import Sidebar, { StudentSidebarData } from "../components/basic/Sidebar";
import ChangePasswordModal from "../components/profile/ProfileModal";
import Modal from "../components/profile/ProfileModal";
import "../components/profile/profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useUser } from "../Context/Context";

const ProfilePage = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Відкриття меню налаштувань
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // Відкриття мод. вікна паролю

    const userInfo = useUser();
    const sidebarData = StudentSidebarData({
        userId: userInfo?.user_id,
        schoolId: userInfo?.schoolId,
    });

    const openSettings = () => setIsSettingsOpen(true); // Відкриття меню налаштувань
    const closeSettings = () => setIsSettingsOpen(false); // Закриття меню налаштувань

    const openPasswordModal = () => {
        setIsSettingsOpen(false); // Закриваємо меню налаштувань
        setIsPasswordModalOpen(true); // Відкриваємо модальне вікно зміни пароля
    };

    const closePasswordModal = () => setIsPasswordModalOpen(false); // Закриття модального вікна паролю

    return (
        <div className="profile-page">
            <Sidebar menu={sidebarData.menu} />
            <div className="main-content">
                <div className="transparent-box">
                    <header className="profile-header">
                        <h1>Профіль користувача</h1>
                    </header>

                    <div className="profile-container">
                        {/* Сайдбар з аватаром */}
                        <div className="profile-sidebar">
                            <img src={"/ava.png"} alt="Аватар користувача" />
                            <p className="profile-name">
                                <strong>Ім'я Користувача</strong>
                            </p>
                            <button className="edit-button" onClick={openSettings}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                        </div>

                        {/* Деталі профілю */}
                        <div className="profile-details">
                            <h2>Інформація</h2>
                            <hr />
                            <div className="profile-row">
                                <div className="profile-item">
                                    <p className="label">
                                        <strong>Email:</strong>
                                    </p>
                                    <p className="value">user@example.com</p>
                                </div>
                                <div className="profile-item">
                                    <p className="label">
                                        <strong>Статус:</strong>
                                    </p>
                                    <p className="value">Учень/Вчитель</p>
                                </div>
                            </div>
                            <div className="profile-row">
                                <div className="profile-item">
                                    <p className="label">
                                        <strong>Школа:</strong>
                                    </p>
                                    <p className="value">Назва школи</p>
                                </div>
                                <div className="profile-item">
                                    <p className="label">
                                        <strong>Останній вхід:</strong>
                                    </p>
                                    <p className="value">2024-12-01</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Модальне вікно налаштувань */}
                {isSettingsOpen && (
                    <Modal isOpen={isSettingsOpen} onClose={closeSettings} title="Налаштування профілю">
                        <div className="settings-menu">
                            <button className="action-button" onClick={openPasswordModal}>
                                Змінити пароль
                            </button>
                            <button className="action-button" onClick={() => alert("Змінити Gmail")}>
                                Змінити Gmail
                            </button>
                        </div>
                    </Modal>
                )}

                {/* Модальне вікно зміни пароля */}
                <ChangePasswordModal
                    isOpen={isPasswordModalOpen}
                    onClose={closePasswordModal}
                />
            </div>
        </div>
    );
};

export default ProfilePage;