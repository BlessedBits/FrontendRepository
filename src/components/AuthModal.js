import React, { useState } from "react";
import "../AuthModal.css";

const AuthModal = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState("login"); // "login" or "register"

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="auth-modal">
                <button className="close-modal-btn" onClick={onClose}>
                    &times;
                </button>
                <div className="logo-title-container">
                    <img src={`${process.env.PUBLIC_URL}/weblogo.jpg`} alt="SchoolHub Logo" className="modal-logo"/>
                    <h2>SchoolHub</h2>
                </div>
                <div className="auth-tabs">
                    <button
                        className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
                        onClick={() => setActiveTab("login")}
                    >
                        Увійти
                    </button>
                    <button
                        className={`auth-tab ${activeTab === "register" ? "active" : ""}`}
                        onClick={() => setActiveTab("register")}
                    >
                        Зареєструватися
                    </button>
                </div>
                <div className="auth-form">
                    {activeTab === "login" ? (
                        <form>
                            <input type="text" placeholder="Введіть логін" required />
                            <input type="password" placeholder="Введіть пароль" required />
                            <button type="submit">Увійти</button>
                        </form>
                    ) : (
                        <form>
                            <input type="text" placeholder="Введіть логін" required />
                            <input type="email" placeholder="Введіть email (необов'язково)" />
                            <input type="password" placeholder="Введіть пароль" required />
                            <button type="submit">Зареєструватись</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
