import React, { useContext, useState, useEffect } from "react";
import styles from "./AuthModal.module.css";
import { login, register } from "../../api/auth";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notification from "../basic/Notification";

const AuthModal = ({ isOpen, onClose, initialIsRegistering = false }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    region: "",
    educationDepartment: "",
    school: "",
    customSchoolName: "",
    customSchoolDescription: ""
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(initialIsRegistering);
  const [error, setError] = useState(null);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [regions, setRegions] = useState([]);
  const [educationDepartments, setEducationDepartments] = useState([]);
  const [schools, setSchools] = useState([]);
  const [createCustomSchool, setCreateCustomSchool] = useState(false);

  useEffect(() => {
    setIsRegistering(initialIsRegistering);
  }, [initialIsRegistering]);

  useEffect(() => {
    if (isRegistering && !createCustomSchool) {
      axios.get("/api/regions").then((response) => setRegions(response.data));
    }
  }, [isRegistering, createCustomSchool]);

  useEffect(() => {
    if (formData.region && !createCustomSchool) {
      axios
        .get(`/api/education-departments?region=${formData.region}`)
        .then((response) => setEducationDepartments(response.data));
      setFormData((prev) => ({ ...prev, educationDepartment: "", school: "" }));
    }
  }, [formData.region, createCustomSchool]);

  useEffect(() => {
    if (formData.educationDepartment && !createCustomSchool) {
      axios
        .get(`/api/schools?educationDepartment=${formData.educationDepartment}`)
        .then((response) => setSchools(response.data));
      setFormData((prev) => ({ ...prev, school: "" }));
    }
  }, [formData.educationDepartment, createCustomSchool]);

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

  const handleCreateCustomSchoolChange = (e) => {
    setCreateCustomSchool(e.target.checked);
    if (e.target.checked) {
      setFormData((prev) => ({ ...prev, region: "", educationDepartment: "", school: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isRegistering) {
        await register(
          formData.username,
          formData.email,
          formData.password,
          createCustomSchool
            ? { customSchoolName: formData.customSchoolName, customSchoolDescription: formData.customSchoolDescription }
            : { region: formData.region, educationDepartment: formData.educationDepartment, school: formData.school }
        );
      } else {
        await login(formData.username, formData.password, rememberMe, setAuth, navigate);
        onClose();
      }
      onClose();
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
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
          <span className={styles.schoolText}>School</span>
          <span className={styles.hubText}>Hub</span>
        </div>
        <div className={styles.authForm}>
          <Notification message={error} type="error" />
          <form onSubmit={handleSubmit}>
            {isRegistering && (
              <>
                <div className={styles.registrationExtra}>
                  {!createCustomSchool ? (
                    <>
                      <select className={styles.regselector} value={formData.region} onChange={handleChange} required>
                        <option value="">Оберіть область</option>
                        {regions.map((region) => (
                          <option key={region.id} value={region.name}>
                            {region.name}
                          </option>
                        ))}
                      </select>
                      <select
                        className={styles.regselector}
                        value={formData.educationDepartment}
                        onChange={handleChange}
                        disabled={!formData.region}
                        required
                      >
                        <option value="">Оберіть відділ освіти</option>
                        {educationDepartments.map((department) => (
                          <option key={department.id} value={department.name}>
                            {department.name}
                          </option>
                        ))}
                      </select>
                      <select
                        className={styles.regselector}
                        value={formData.school}
                        onChange={handleChange}
                        disabled={!formData.educationDepartment}
                        required
                      >
                        <option value="">Оберіть навчальний заклад</option>
                        {schools.map((school) => (
                          <option key={school.id} value={school.name}>
                            {school.name}
                          </option>
                        ))}
                      </select>
                    </>
                  ) : (
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
                        className={styles.customSchoolDescription}
                        placeholder="Опис школи"
                        value={formData.customSchoolDescription}
                        onChange={handleChange}
                        required
                      />
                    </>
                  )}
                  <input
                    type="email"
                    name="email"
                    placeholder="Введіть пошту майбутнього адміна"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>
              </>
            )}
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
              <button type="button" className={styles.showPasswordButton} onClick={toggleShowPassword}>
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {isRegistering &&(
                <div className={styles.rememberMeContainer}>
                    <input
                      name="newSchool"
                      type="checkbox"
                      checked={createCustomSchool}
                      onChange={handleCreateCustomSchoolChange}
                    />
                    <label htmlFor="newSchool">Створити власну школу</label>
                </div>              
            )}
            {!isRegistering && (
              <div className={styles.rememberMeContainer}>
                <input type="checkbox" name="rememberMe" checked={rememberMe} onChange={handleRememberMeChange} />
                <label htmlFor="rememberMe">Запам'ятати мене</label>
              </div>
            )}
            <button type="submit" className={`${styles["bn632-hover"]} ${styles.bn25}`}>
              {isRegistering ? "Зареєструватись" : "Увійти"}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AuthModal;
