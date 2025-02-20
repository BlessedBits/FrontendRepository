import React, { useState, useEffect, useCallback } from "react";
import styles from "./ContactSchool.module.css";
import { getSchoolContacts, updateSchoolContacts } from "../../api/school";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Loading } from "../basic/LoadingAnimation";
import Notification from "../basic/Notification";

function EditableInput({ label, name, value, onChange }) {
    return (
        <div className={styles.formGroup}>
            <label>{label}</label>
            <input type="text" name={name} value={value || ""} onChange={onChange} className={styles.inputField} />
        </div>
    );
}

function ContactSchool({ baseInfo }) {
    const [schoolData, setSchoolData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedData, setUpdatedData] = useState({});
    const [notification, setNotification] = useState({ message: "", type: "" });
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        async function fetchSchoolData() {
            try {
                const data = await getSchoolContacts(axiosPrivate);
                setSchoolData(data);
                setUpdatedData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchSchoolData();
    }, [axiosPrivate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = useCallback(async () => {
        setNotification({ message: "Оновлення даних...", type: "loading" });
        try {
            const updated = await updateSchoolContacts(updatedData, axiosPrivate);
            setSchoolData(updated);
            setNotification({ message: "Дані оновлено!", type: "success" });
            setEditMode(false);
        } catch (error) {
            setNotification({ message: "Помилка оновлення!", type: "error" });
        }
        setTimeout(() => setNotification({ message: "", type: "" }), 3000);
    }, [updatedData, axiosPrivate]);

    if (loading)
        return (
            <section className={styles.contacts}>
                <Loading />
            </section>
        );
    if (error)
        return (
            <section className={styles.contacts}>
                <p>
                    <strong>Помилка завантаження контактів.</strong>
                </p>
            </section>
        );
    if (!schoolData)
        return (
            <section className={styles.contacts}>
                <p>
                    <strong>Дані відсутні.</strong>
                </p>
            </section>
        );

    return (
        <section id="contacts" className={styles.contacts}>
            <h2>Контакти школи</h2>

            {!editMode ? (
                <div className={styles.contactInfo}>
                    <p>
                        <strong>Телефон:</strong> {schoolData.phoneNumber}
                    </p>
                    <p>
                        <strong>Email:</strong> {schoolData.email}
                    </p>

                    <div className={styles.socialMedia}>
                        <h3>Ми в соцмережах:</h3>
                        <ul className={styles.socialIcons}>
                            {["youtube", "facebook", "instagram", "tiktok"].map(
                                (platform) =>
                                    schoolData[`${platform}Link`] && (
                                        <li key={platform}>
                                            <img src={`/icons/${platform}.png`} alt={platform} />
                                            <a
                                                href={schoolData[`${platform}Link`]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                            </a>
                                        </li>
                                    )
                            )}
                        </ul>
                    </div>

                    {baseInfo.role === "SCHOOL_ADMIN" && (
                        <button className={styles.editButton} onClick={() => setEditMode(true)}>
                            Редагувати
                        </button>
                    )}
                </div>
            ) : (
                <div className={styles.editForm}>
                    <h3>Редагувати контакти</h3>

                    <EditableInput
                        label="Телефон"
                        name="phoneNumber"
                        value={updatedData.phoneNumber}
                        onChange={handleInputChange}
                    />
                    <EditableInput label="Email" name="email" value={updatedData.email} onChange={handleInputChange} />

                    {["youtube", "facebook", "instagram", "tiktok"].map((platform) => (
                        <EditableInput
                            key={platform}
                            label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                            name={`${platform}Link`}
                            value={updatedData[`${platform}Link`]}
                            onChange={handleInputChange}
                        />
                    ))}

                    <div className={styles.buttonGroup}>
                        <button className={styles.saveButton} onClick={handleSave}>
                            Зберегти
                        </button>
                        <button className={styles.cancelButton} onClick={() => setEditMode(false)}>
                            Скасувати
                        </button>
                    </div>
                </div>
            )}

            <Notification message={notification.message} type={notification.type} />
        </section>
    );
}

export default ContactSchool;
