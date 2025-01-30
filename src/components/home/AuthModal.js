import React, { useContext, useState } from "react";
import styles from "./AuthModal.module.css";
import { login } from "../../api/auth";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await login(formData.username, formData.password, rememberMe, setAuth, navigate);
      console.log("Login successful:", result);
      onClose();
    } catch (err) {
      setError(err.message); 
    }
  };

  if (!isOpen) return null;

  return (
    <dialog className={styles.modalOverlay}>
      <div className={styles.authModal}>
        <button className={styles.closeModalBtn} onClick={onClose}>
          &times;
        </button>
        <div className={styles.LogoTitleContainer}>
          {/* <img src={`${process.env.PUBLIC_URL}/weblogo.png`} alt="SchoolHub Logo" className={styles.weblogo} /> */}
          <span className={styles.schoolText}>School</span>
          <span className={styles.hubText}>Hub</span>
        </div>
        <div className={styles.authForm}>
          {error && <div className={styles.error}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Введіть логін"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              required
            />
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"} 
                name="password"
                placeholder="Введіть пароль"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className={styles.showPasswordButton}
                onClick={toggleShowPassword}
              >
                {showPassword ? "🙈" : "👁️"} {/* Іконка для перемикання видимості */}
              </button>
            </div>
            <div className={styles.rememberMeContainer}>
              <input
                type="checkbox"
                name="rememberMe"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <label htmlFor="rememberMe">Запам'ятати мене</label>
            </div>
            <button type="submit" className={`${styles["bn632-hover"]} ${styles.bn25}`}>Увійти</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AuthModal;