import React, { useState, useEffect } from "react";
import styles from "./ContactSchool.module.css";
import { getSchoolContacts, updateSchoolContacts } from "../../api/school";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Loading } from "../basic/LoadingAnimation";
import Notification from "../basic/Notification";

function ContactSchool({ userRole }) {
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
                setUpdatedData(data); // Ініціалізуємо форму
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchSchoolData();
    }, [axiosPrivate]);

    const handleSave = async () => {
        setNotification({ message: "Оновлення даних...", type: "loading" });
        try {
            const updated = await updateSchoolContacts(updatedData, axiosPrivate);
            setSchoolData(updated); // Оновлюємо дані після успішного збереження
            setNotification({ message: "Дані успішно оновлені!", type: "success" });
            setEditMode(false);
        } catch (error) {
            console.error("Помилка оновлення:", error);
            setNotification({ message: "Не вдалося оновити дані!", type: "error" });
        }

        setTimeout(() => setNotification({ message: "", type: "" }), 3000);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prev) => ({ ...prev, [name]: value }));
    };

    if (loading) {
        return (
            <section id="contacts" className={styles.contacts}>
                <Loading />
            </section>
        );
    }

    if (error) {
        return (
            <section id="contacts" className={styles.contacts}>
                <p>
                    <strong>На жаль, не вдалось знайти контакти даної школи. Спробуйте пізніше.</strong>
                </p>
            </section>
        );
    }

    if (!schoolData) {
        return (
            <section id="contacts" className={styles.contacts}>
                <p>
                    <strong>Дана школа немає контактів</strong>
                </p>
            </section>
        );
    }

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
                            {schoolData.youtubeLink && (
                                <li>
                                    <img src="/icons/youtube.png" alt="YouTube" />
                                    <a
                                        href={schoolData.youtubeLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialLink}
                                    >
                                        YouTube
                                    </a>
                                </li>
                            )}
                            {schoolData.facebookLink && (
                                <li>
                                    <img src="/icons/facebook.png" alt="Facebook" />
                                    <a
                                        href={schoolData.facebookLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialLink}
                                    >
                                        Facebook
                                    </a>
                                </li>
                            )}
                            {schoolData.instagramLink && (
                                <li>
                                    <img src="/icons/instagram.png" alt="Instagram" />
                                    <a
                                        href={schoolData.instagramLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialLink}
                                    >
                                        Instagram
                                    </a>
                                </li>
                            )}
                            {schoolData.tiktokLink && (
                                <li>
                                    <img src="/icons/tiktok.png" alt="TikTok" />
                                    <a
                                        href={schoolData.tiktokLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialLink}
                                    >
                                        TikTok
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>

                    {userRole === "SCHOOL_ADMIN" && (
                        <button className={styles.editButton} onClick={() => setEditMode(true)}>
                            Редагувати
                        </button>
                    )}
                </div>
            ) : (
                <div className={styles.editForm}>
                    <h3>Редагувати контакти</h3>

                    {/* Поле для телефону */}
                    <div className={styles.formGroup}>
                        <label>Телефон</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={updatedData.phoneNumber}
                            onChange={handleInputChange}
                            className={styles.inputField}
                        />
                    </div>

                    {/* Поле для email */}
                    <div className={styles.formGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={updatedData.email}
                            onChange={handleInputChange}
                            className={styles.inputField}
                        />
                    </div>

                    {/* Поля для соцмереж */}
                    <div className={styles.formGroup}>
                        <label>YouTube</label>
                        <input
                            type="url"
                            name="youtubeLink"
                            value={updatedData.youtubeLink || ""}
                            onChange={handleInputChange}
                            className={styles.inputField}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Facebook</label>
                        <input
                            type="url"
                            name="facebookLink"
                            value={updatedData.facebookLink || ""}
                            onChange={handleInputChange}
                            className={styles.inputField}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Instagram</label>
                        <input
                            type="url"
                            name="instagramLink"
                            value={updatedData.instagramLink || ""}
                            onChange={handleInputChange}
                            className={styles.inputField}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>TikTok</label>
                        <input
                            type="url"
                            name="tiktokLink"
                            value={updatedData.tiktokLink || ""}
                            onChange={handleInputChange}
                            className={styles.inputField}
                        />
                    </div>

                    {/* Кнопки */}
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
