import React, { useState, useEffect, useRef } from 'react';
import styles from './Achievements.module.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { getSchoolAchievements, createSchoolAchievements } from '../../api/school';
import { Loading } from '../basic/LoadingAnimation';

function AchievementsSchool({ schoolId, userRole }) {
    const [achievements, setAchievements] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleCards, setVisibleCards] = useState(3);
    const [newAchievement, setNewAchievement] = useState({ title: '', description: '', image: null });
    const galleryRef = useRef(null);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        async function fetchAchievements() {
            try {
                const response = await getSchoolAchievements(schoolId, axiosPrivate);
                setAchievements(response);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        if (schoolId) {
            fetchAchievements();
        }
    }, [schoolId, axiosPrivate]);

    useEffect(() => {
        const updateVisibleCards = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 1800) {
                setVisibleCards(4);
            } else if (screenWidth >= 1240) {
                setVisibleCards(3);
            } else if (screenWidth >= 1040) {
                setVisibleCards(2);
            } else {
                setVisibleCards(1);
            }
        };

        updateVisibleCards();
        window.addEventListener('resize', updateVisibleCards);
        return () => window.removeEventListener('resize', updateVisibleCards);
    }, []);

    const handlePrev = () => {
        setCurrentIndex(prev => Math.max(prev - visibleCards, 0));
    };

    const handleNext = () => {
        setCurrentIndex(prev => Math.min(prev + visibleCards, achievements.length - visibleCards));
    };

    const handleAddAchievement = async () => {
        try {
            const formData = new FormData();
            formData.append('title', newAchievement.title);
            formData.append('description', newAchievement.description);
            if (newAchievement.image) {
                formData.append('image', newAchievement.image);
            }

            const response = await createSchoolAchievements(schoolId, formData, axiosPrivate);
            setAchievements(prev => [...prev, response]);
            
            setNewAchievement({ title: '', description: '', image: null });
        } catch (error) {
            console.error('Помилка додавання:', error);
        }
    };

    const handleFileChange = (e) => {
        setNewAchievement({ ...newAchievement, image: e.target.files[0] });
    };

    if (loading) {
        return (
            <section id="achievements" className={styles.achievementsComponent}>
                <h2>Наші досягнення</h2>
                <Loading />
            </section>
        );
    }

    if (error) {
        return (
            <section id="achievements" className={styles.achievementsComponent}>
                <h2>Наші досягнення</h2>
                <p>{error}</p>
            </section>
        );
    }

    return (
        <section id="achievements" className={styles.achievementsComponent}>
            <h2>Наші досягнення</h2>
            <div className={styles.galleryContainer} ref={galleryRef}>
                <button className={styles.navButton} onClick={handlePrev} disabled={currentIndex === 0}>←</button>
                <div className={styles.gallery}>
                    {achievements.slice(currentIndex, currentIndex + visibleCards).map((achievement) => (
                        <div key={achievement.id} className={styles.achievementCard}>
                            <img src={achievement.image} alt={achievement.title} className={styles.achievementImage} />
                            <p>{achievement.title}</p>
                            <p className={styles.achievementDescription}>{achievement.description}</p>
                        </div>
                    ))}
                </div>
                <button className={styles.navButton} onClick={handleNext} disabled={currentIndex + visibleCards >= achievements.length}>→</button>
            </div>

            {userRole === "SCHOOL_ADMIN" && (
                <div className={styles.formContainer}>
                    <h3 className={styles.formTitle}>Додати нове досягнення</h3>
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
                    
                    <div className={styles.formGroup}>
                        <textarea
                            className={styles.textareaField}
                            placeholder=" "
                            value={newAchievement.description}
                            onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                        />
                        <label className={styles.inputLabel}>Опис</label>
                    </div>
                
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
                
                    <button className={styles.submitButton} onClick={handleAddAchievement}>
                        Додати досягнення
                    </button>
                </div>
            )}
        </section>
    );
}

export default AchievementsSchool;
