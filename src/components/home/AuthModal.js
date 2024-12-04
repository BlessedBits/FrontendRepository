import React, { useState } from "react";
import "./AuthModal.css";
import { login, register } from "../misc/AuthApi";

const AuthModal = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState("login"); // "login" or "register"
    const [formData, setFormData] = useState({ username: "", password: "", email: "" });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset errors

        try {
            if (activeTab === "login") {
                const result = await login(formData.username, formData.password);
                console.log("Login successful:", result);
            } else {
                const result = await register(formData.username, formData.password, formData.email);
                console.log("Registration successful:", result);
            }
            onClose(); // Close modal on success
        } catch (err) {
            setError(err.message); // Display error to the user
        }
    };

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
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="username"
                                placeholder="Введіть логін"
                                value={formData.username}
                                onChange={handleChange} required />
                            <input
                                type="password"
                                name="password"
                                placeholder="Введіть пароль"
                                value={formData.password}
                                onChange={handleChange} required />
                            <button type="submit">Увійти</button>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="username"
                                placeholder="Введіть логін"
                                value={formData.username}
                                onChange={handleChange} required />
                            <input
                                type="email"
                                name="email"
                                placeholder="Введіть email (необов'язково)"
                                value={formData.email}
                                onChange={handleChange} />
                            <input
                                type="password"
                                name="password"
                                placeholder="Введіть пароль"
                                value={formData.password}
                                onChange={handleChange} required />
                            <button type="submit">Зареєструватись</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
