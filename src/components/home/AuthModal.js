import React, { useContext, useState, useEffect } from "react";
import styles from "./AuthModal.module.css";
import { login, register } from "../../api/auth";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthModal = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState("login");
    const [formData, setFormData] = useState({ username: "", password: "", email: "", region: "", educationDepartment: "", school: "", customSchoolName: "", customSchoolDescription: "" });
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState(null);
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [regions, setRegions] = useState([]);
    const [educationDepartments, setEducationDepartments] = useState([]);
    const [schools, setSchools] = useState([]);
    const [createCustomSchool, setCreateCustomSchool] = useState(false);

    useEffect(() => {
        axios.get("/api/regions").then(response => setRegions(response.data));
    }, []);

    useEffect(() => {
        if (formData.region) {
            axios.get(`/api/education-departments?region=${formData.region}`)
                .then(response => setEducationDepartments(response.data));
            setEducationDepartments([]);
            setFormData(prev => ({ ...prev, educationDepartment: "", school: "" }));
        }
    }, [formData.region]);

    useEffect(() => {
        if (formData.educationDepartment) {
            axios.get(`/api/schools?educationDepartment=${formData.educationDepartment}`)
                .then(response => setSchools(response.data));
            setSchools([]);
            setFormData(prev => ({ ...prev, school: "" }));
        }
    }, [formData.educationDepartment]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };

    const handleCreateCustomSchoolChange = (e) => {
        setCreateCustomSchool(e.target.checked);
        if (e.target.checked) {
            setFormData(prev => ({ ...prev, region: "", educationDepartment: "", school: "" }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            if (activeTab === "login") {
                await login(formData.username, formData.password, rememberMe, setAuth, navigate);
            } else {
                await register(formData.username, formData.password, formData.email);
            }
            onClose();
        } catch (err) {
            setError(err.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.authModal}>
                <button className={styles.closeModalBtn} onClick={onClose}>&times;</button>
                <div className={styles.LogoTitleContainer}>
                    <img src={`${process.env.PUBLIC_URL}/weblogo.png`} alt="SchoolHub Logo" className={styles.weblogo} />
                    <h2>SchoolHub</h2>
                </div>
                <div className={styles.authTabs}>
                    <button className={`${styles.authTab} ${activeTab === "login" ? styles.active : ""}`} onClick={() => setActiveTab("login")}>Увійти</button>
                    <button className={`${styles.authTab} ${activeTab === "register" ? styles.active : ""}`} onClick={() => setActiveTab("register")}>Зареєструватися</button>
                </div>
                <div className={styles.authForm}>
                    {error && <div className={styles.error}>{error}</div>}
                    {activeTab === "login" ? (
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="username" placeholder="Введіть логін" value={formData.username} onChange={handleChange} autoComplete="username" required />
                            <input type="password" name="password" placeholder="Введіть пароль" value={formData.password} onChange={handleChange} autoComplete="current-password" required />
                            <div className={styles.rememberMeContainer}>
                                <input type="checkbox" name="rememberMe" checked={rememberMe} onChange={handleRememberMeChange} />
                                <label htmlFor="rememberMe">Запам'ятати мене</label>
                            </div>
                            <button type="submit">Увійти</button>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className={styles.rememberMeContainer}>
                                <label>
                                    <input type="checkbox" checked={createCustomSchool}
                                           onChange={handleCreateCustomSchoolChange}/> Створити власну школу
                                </label>
                            </div>

                                {!createCustomSchool ? (
                                    <>
                                        <select name="region" value={formData.region} onChange={handleChange} required>
                                            <option value="">Оберіть область</option>
                                            {regions.map((region) => (
                                                <option key={region.id} value={region.name}>{region.name}</option>
                                            ))}
                                        </select>
                                        <select name="educationDepartment" value={formData.educationDepartment}
                                                onChange={handleChange} disabled={!formData.region} required>
                                            <option value="">Оберіть відділ освіти</option>
                                            {educationDepartments.map((department) => (
                                                <option key={department.id}
                                                        value={department.name}>{department.name}</option>
                                            ))}
                                        </select>
                                        <select name="school" value={formData.school} onChange={handleChange}
                                                disabled={!formData.educationDepartment} required>
                                            <option value="">Оберіть навчальний заклад</option>
                                            {schools.map((school) => (
                                                <option key={school.id} value={school.name}>{school.name}</option>
                                            ))}
                                        </select>
                                    </>
                                ) : (
                                    <>
                                        <input type="text" name="customSchoolName" placeholder="Назва школи"
                                               value={formData.customSchoolName} onChange={handleChange} required/>
                                        <textarea name="customSchoolDescription" placeholder="Опис школи"
                                                  value={formData.customSchoolDescription} onChange={handleChange}
                                                  required/>
                                    </>
                                )}

                                <input type="email" name="email" placeholder="Введіть пошту майбутнього адміна"
                                       value={formData.email} onChange={handleChange} autoComplete="email" required/>
                                <button type="submit">Зареєструватись</button>
                        </form>
                        )}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
