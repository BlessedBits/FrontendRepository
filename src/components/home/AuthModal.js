import React, { useState } from "react";
import styles from "./AuthModal.module.css";
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
        <div className={styles.modalOverlay}>
            <div className={styles.authModal}>
                <button className={styles.closeModalBtn} onClick={onClose}>
                    &times;
                </button>
                <div className={styles.LogoTitleContainer}>
                    <img src={`${process.env.PUBLIC_URL}/weblogo.png`} alt="SchoolHub Logo" className={styles.weblogo}/>
                    <h2>SchoolHub</h2>
                </div>
                <div className={styles.authTabs}>
                    <button
                        className={`${styles.authTab} ${activeTab === "login" ? styles.active : ""}`}
                        onClick={() => setActiveTab("login")}
                    >
                        Увійти
                    </button>
                    <button
                        className={`${styles.authTab} ${activeTab === "register" ? styles.active : ""}`}
                        onClick={() => setActiveTab("register")}
                    >
                        Зареєструватися
                    </button>
                </div>
                <div className={styles.authForm}>
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
