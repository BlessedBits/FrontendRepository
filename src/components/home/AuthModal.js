import React, { useContext, useState, useEffect } from "react";
import styles from "./AuthModal.module.css";
import { login } from "../../api/auth";
import Notification from "../basic/Notification";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ isOpen, onClose, initialIsRegistering = false }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        region: "",
        educationDepartment: "",
        school: "",
        customSchoolName: "",
        customSchoolDescription: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const { setAuth } = useContext(AuthContext);
    const [rememberMe, setRememberMe] = useState(false);
    const [isRegistering, setIsRegistering] = useState(initialIsRegistering);
    const [regions, setRegions] = useState([]);
    const [educationDepartments, setEducationDepartments] = useState([]);
    const [schools, setSchools] = useState([]);
    const [notification, setNotification] = useState({ message: "", type: "" });
    const [createCustomSchool, setCreateCustomSchool] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsRegistering(initialIsRegistering);
    }, [initialIsRegistering]);

    useEffect(() => {
        if (isRegistering && !createCustomSchool) {
            fetch("/data/regionList.json")
                .then((res) => res.json())
                .then(setRegions)
                .catch(console.error);
        }
    }, [isRegistering, createCustomSchool]);

    useEffect(() => {
        if (formData.region && !createCustomSchool) {
            const selectedRegion = regions.find((r) => r.name === formData.region);
            if (selectedRegion) {
                fetch(`/data/regions/${selectedRegion.file}`)
                    .then((res) => res.json())
                    .then((data) => setEducationDepartments(data.educationDepartments || []))
                    .catch(console.error);
                setFormData((prev) => ({ ...prev, educationDepartment: "", school: "" }));
            }
        }
    }, [formData.region, createCustomSchool, regions]);

    useEffect(() => {
        if (formData.educationDepartment && !createCustomSchool) {
            const selectedDepartment = educationDepartments.find((d) => d.name === formData.educationDepartment);
            if (selectedDepartment) {
                setSchools(selectedDepartment.schools);
                setFormData((prev) => ({ ...prev, school: "" }));
            }
        }
    }, [formData.educationDepartment, createCustomSchool, educationDepartments]);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleRemember = () => {
        setRememberMe(!rememberMe);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegistering) {
                const registrationData = new FormData();
                registrationData.append("email", formData.email);

                if (createCustomSchool) {
                    registrationData.append("action", "register_custom_school");
                    registrationData.append("customSchoolName", formData.customSchoolName);
                    registrationData.append("customSchoolDescription", formData.customSchoolDescription);
                } else {
                    registrationData.append("action", "register_school");
                    registrationData.append("region", formData.region);
                    registrationData.append("educationDepartment", formData.educationDepartment);
                    registrationData.append("school", formData.school);
                }

                const response = await fetch("https://getform.io/f/bzywdqla", {
                    method: "POST",
                    body: registrationData,
                    headers: {
                        Accept: "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Form submission failed");
                }

                setNotification({
                    message: "Реєстрація успішна! Очікуйте підтвердження.",
                    type: "success",
                });
                setFormData({
                    username: "",
                    password: "",
                    email: "",
                    region: "",
                    educationDepartment: "",
                    school: "",
                    customSchoolName: "",
                    customSchoolDescription: "",
                });

                setTimeout(() => {
                    setNotification({ message: "", type: "" });
                    onClose();
                }, 2000);
            } else {
                setNotification({ message: "Виконується вхід...", type: "loading" });
                await login(formData.username, formData.password, rememberMe, setAuth);
                navigate("/school/");
            }
        } catch (err) {
            console.error(err.message);
            let errorMessage = "Виникла помилка, спробуйте пізніше";
            if (err.message === "User") errorMessage = "Неправильний логін або пароль";
            else if (err.message === "Server") errorMessage = "Сайт не працює, спробуйте пізніше";

            setNotification({ message: errorMessage, type: "error" });
        }
    };

    if (!isOpen) return null;

    return (
        <dialog className={styles.modalOverlay}>
            {notification.message && <Notification message={notification.message} type={notification.type} />}
            <div className={styles.authModal}>
                <button className={styles.closeModalBtn} onClick={onClose}>
                    &times;
                </button>

                <div className={styles.LogoTitleContainer}>
                    <span className={styles.schoolText}>School</span>
                    <span className={styles.hubText}>Hub</span>
                </div>

                {isRegistering ? (
                    <form className={styles.authForm} onSubmit={handleSubmit}>
                        {!createCustomSchool && (
                            <>
                                <select name="region" value={formData.region} onChange={handleChange} required>
                                    <option value="">Оберіть область</option>
                                    {regions.map((r) => (
                                        <option key={r.id} value={r.name}>
                                            {r.name}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    name="educationDepartment"
                                    value={formData.educationDepartment}
                                    onChange={handleChange}
                                    disabled={!formData.region}
                                    required
                                >
                                    <option value="">Оберіть відділ освіти</option>
                                    {educationDepartments.map((d) => (
                                        <option key={d.id} value={d.name}>
                                            {d.name}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    name="school"
                                    value={formData.school}
                                    onChange={handleChange}
                                    disabled={!formData.educationDepartment}
                                    required
                                >
                                    <option value="">Оберіть навчальний заклад</option>
                                    {schools.map((s) => (
                                        <option key={s.id} value={s.name}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Введіть пошту"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    required
                                />
                            </>
                        )}

                        {createCustomSchool && (
                            <>
                                <input
                                    type="text"
                                    name="customSchoolName"
                                    placeholder="Назва школи"
                                    value={formData.customSchoolName}
                                    onChange={handleChange}
                                    required
                                />
                                <textarea
                                    name="customSchoolDescription"
                                    placeholder="Опис школи"
                                    value={formData.customSchoolDescription}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Введіть пошту"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    required
                                />
                            </>
                        )}

                        <div className={styles.rememberMeContainer}>
                            <input
                                type="checkbox"
                                checked={createCustomSchool}
                                onChange={() => setCreateCustomSchool((prev) => !prev)}
                            />
                            <label>Створити власну школу</label>
                        </div>

                        <button type="submit" className={`${styles["bn632-hover"]} ${styles.bn25}`}>
                            Зареєструватись
                        </button>
                    </form>
                ) : (
                    <form className={styles.authForm} onSubmit={handleSubmit}>
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
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>

                        <div className={styles.rememberMeContainer}>
                            <input type="checkbox" name="rememberMe" checked={rememberMe} onChange={handleRemember} />
                            <label htmlFor="rememberMe" onClick={handleRemember}>
                                Запам'ятати мене
                            </label>
                        </div>

                        <button type="submit" className={`${styles["bn632-hover"]} ${styles.bn25}`}>
                            Увійти
                        </button>
                    </form>
                )}
            </div>
        </dialog>
    );
};

export default AuthModal;
