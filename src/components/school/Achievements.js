import React, { useState, useEffect, useRef } from "react";
import styles from "./Achievements.module.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
    getSchoolAchievements,
    createSchoolAchievements,
    updateSchoolAchievements,
    deleteSchoolAchievements
} from "../../api/school";
import { Loading } from "../basic/LoadingAnimation";
import Notification from "../basic/Notification";

function AchievementsSchool({ userRole }) {
    const [achievements, setAchievements] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleCards, setVisibleCards] = useState(3);
    const [newAchievement, setNewAchievement] = useState({ id: null, title: "", description: "", image: null });
    const [notification, setNotification] = useState({ message: "", type: "" });
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const galleryRef = useRef(null);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        async function fetchAchievements() {
            try {
                const response = await getSchoolAchievements(axiosPrivate);
                const sortedAchievements = response.sort((a, b) => b.id - a.id);
                setAchievements(sortedAchievements);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchAchievements();
    }, [axiosPrivate]);

    useEffect(() => {
        const updateVisibleCards = () => {
            const screenWidth = window.innerWidth;
            setVisibleCards(screenWidth >= 1800 ? 4 : screenWidth >= 1240 ? 3 : screenWidth >= 1040 ? 2 : 1);
        };

        updateVisibleCards();
        window.addEventListener("resize", updateVisibleCards);
        return () => window.removeEventListener("resize", updateVisibleCards);
    }, []);

    const handlePrev = () => setCurrentIndex(prev => Math.max(prev - visibleCards, 0));
    const handleNext = () => setCurrentIndex(prev => Math.min(prev + visibleCards, achievements.length - visibleCards));

    const handleAddOrEditAchievement = async () => {
        if (!newAchievement.title || !newAchievement.description || (!isEditing && !newAchievement.image)) {
            setNotification({ message: "Заповніть всі поля!", type: "error" });
            return;
        }

        setNotification({ message: isEditing ? "Оновлюється досягнення..." : "Додається досягнення...", type: "loading" });

        try {
            const formData = new FormData();
            formData.append("title", newAchievement.title);
            formData.append("description", newAchievement.description);
            if (newAchievement.image instanceof File) {
                formData.append("image", newAchievement.image);
            }

            let response;
            if (isEditing) {
                response = await updateSchoolAchievements(newAchievement.id, formData, axiosPrivate);
                setAchievements(prev =>
                    prev.map(ach => (ach.id === newAchievement.id ? response : ach))
                );
                setNotification({ message: "Досягнення оновлено!", type: "success" });
            } else {
                response = await createSchoolAchievements(formData, axiosPrivate);
                setAchievements(prev => [response, ...prev]);
                setCurrentIndex(0);
                setNotification({ message: "Досягнення додано!", type: "success" });
            }

            setNewAchievement({ id: null, title: "", description: "", image: null });
            setIsEditing(false);
            setShowForm(false);
        } catch (error) {
            console.error("Помилка:", error);
            setNotification({ message: "Помилка при обробці!", type: "error" });
        }

        setTimeout(() => setNotification({ message: "", type: "" }), 3000);
    };

    const handleDeleteAchievement = async (id) => {
        if (!window.confirm("Ви впевнені, що хочете видалити це досягнення?")) return;

        try {
            await deleteSchoolAchievements(id, axiosPrivate);
            setAchievements(prev => prev.filter(ach => ach.id !== id));
            setNotification({ message: "Досягнення видалено!", type: "success" });
        } catch (error) {
            console.error("Помилка видалення:", error);
            setNotification({ message: "Помилка при видаленні!", type: "error" });
        }

        setTimeout(() => setNotification({ message: "", type: "" }), 3000);
    };

    const handleEditAchievement = (achievement) => {
        setNewAchievement(achievement);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleFileChange = (e) => {
        setNewAchievement({ ...newAchievement, image: e.target.files[0] });
    };

    const toggleForm = () => {
        setShowForm(prev => !prev);
        setIsEditing(false);
        setNewAchievement({ id: null, title: "", description: "", image: null });
    };

    if (loading) return <Loading />;
    if (error) return <p>{error}</p>;

    return (
        <section id="achievements" className={styles.achievementsComponent}>
            <span className={styles.headH2}>Коротко про наші досягнення</span>
            <div className={styles.galleryContainer} ref={galleryRef}>
                <button className={styles.navButton} onClick={handlePrev} disabled={currentIndex === 0}>←</button>
                <div className={styles.gallery}>
                    {achievements.slice(currentIndex, currentIndex + visibleCards).map(achievement => (
                        <div key={achievement.id} className={styles.achievementCard}>
                            <img src={achievement.image} alt={achievement.title} className={styles.achievementImage} />
                            <p>{achievement.title}</p>
                            <p className={styles.achievementDescription}>{achievement.description}</p>
                            {userRole === "SCHOOL_ADMIN" && (
                                <div className={styles.adminActions}>
                                    <button className={styles.editButton} onClick={() => handleEditAchievement(achievement)}>✏️</button>
                                    <button className={styles.deleteButton} onClick={() => handleDeleteAchievement(achievement.id)}>🗑️</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <button className={styles.navButton} onClick={handleNext} disabled={currentIndex + visibleCards >= achievements.length}>→</button>
            </div>

            {userRole === "SCHOOL_ADMIN" && (
                <>
                    <button className={`${styles["toggleButton-hover"]} ${styles.bn25}`} onClick={toggleForm}>
                        <span>{showForm ? "❌" : "➕"}</span>
                    </button>
                    {showForm && (
                        <div className={styles.formContainer}>
                            <h3 className={styles.formTitle}>
                                {isEditing ? "Редагувати досягнення" : "Додати нове досягнення"}
                            </h3>

                            {/* Поле для введення назви */}
                            <div className={styles.formGroup}>
                                <input
                                    className={styles.inputField}
                                    type="text"
                                    placeholder=" "
                                    value={newAchievement.title}
                                    onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                                />
                                <label className={styles.inputLabel}>Назва</label>
                            </div>

                            {/* Поле для опису */}
                            <div className={styles.formGroup}>
                                <textarea
                                    className={styles.textareaField}
                                    placeholder=" "
                                    value={newAchievement.description}
                                    onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                                />
                                <label className={styles.inputLabel}>Опис</label>
                            </div>

                            {/* Завантаження зображення */}
                            <div className={styles.fileUploadWrapper}>
                                <label className={styles.fileInputLabel}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className={styles.fileInput}
                                    />
                                    <span className={styles.uploadButton}>Обрати зображення</span>
                                    <span className={styles.fileName}>
                                        {newAchievement.image ? newAchievement.image.name : "Файл не обрано"}
                                    </span>
                                </label>
                            </div>

                            {/* Кнопка підтвердження */}
                            <button className={styles.submitButton} onClick={handleAddOrEditAchievement}>
                                {isEditing ? "Оновити" : "Додати"}
                            </button>
                        </div>
                    )}
                </>
            )}

            <Notification message={notification.message} type={notification.type} />
        </section>
    );
}

export default AchievementsSchool;
