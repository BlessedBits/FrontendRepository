import React, { useState, useEffect } from 'react';
import styles from './Achievements.module.css';

function AchievementsSchool({ schoolId }) {
    const [achievements, setAchievements] = useState([]);
    const [staticAchievements, setStaticAchievements] = useState([
        {
            id: 1,
            image_url: '/school_test/achi1.jpg',
            title: 'Переможець алко-олімпіади',
            description: 'Олег Роман, переможець в алко-олімпіаді серед другокурсиків'
        },
        {
            id: 2,
            image_url: '/school_test/achi2.jpg',
            title: 'Переможець у переговорах з міністром',
            description: 'Ковалець Владислав, домовився з міністром освіти, щоб нам виділили ракету на Марс'
        },
        {
            id: 3,
            image_url: '/school_test/achi3.jpg',
            title: 'Переможець конкурсу',
            description: 'Олександр Ільницький, переможець національного конкурсу качків'
        },
        {
            id: 4,
            image_url: '/school_test/achi4.jpg',
            title: 'Молодий лідер',
            description: 'Володька Рєвко, хватить позорити Таньку'    
        },
        {
            id: 5,
            image_url: '/school_test/achi5.jpg',
            title: 'Молодий лідер',
            description: 'Андріан Табак, призрачний гонщик'
            
        }
    ]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchAchievements() {
            try {
                const response = await fetch(`/api/schools/${schoolId}/events/important`);
                if (!response.ok) {
                    throw new Error('Не вдалося завантажити досягнення.');
                }
                const data = await response.json();
                setAchievements(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        if (schoolId) {
            fetchAchievements();
        }
    }, [schoolId]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, achievements.length + staticAchievements.length - 3));
    };

    // if (loading) {
    //     return <p>Завантаження даних...</p>;
    // }

    if (error) {
        return <p>{error}</p>;
    }

    const allAchievements = [...achievements, ...staticAchievements];

    if (allAchievements.length === 0) {
        return (
            <section id="achievements" className={styles.achievementsComponent}>
                <h2>Наші досягнення</h2>
                <p>Досягнень поки немає.</p>
            </section>
        );
    }

    return (
        <section id="achievements" className={styles.achievementsComponent}>
            <h2>Наші досягнення</h2>
            <div className={styles.galleryContainer}>
                <button
                    className={styles.navButton}
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                >
                    ←
                </button>
                <div className={styles.gallery}>
                    {allAchievements
                        .slice(currentIndex, currentIndex + 3)
                        .map((achievement) => (
                            <div key={achievement.id} className={styles.achievementCard}>
                                <img
                                    src={achievement.image_url}
                                    alt={achievement.title}
                                    className={styles.achievementImage}
                                />
                                <p className={styles.achievementDescription}>
                                    {achievement.description}
                                </p>
                            </div>
                        ))}
                </div>
                <button
                    className={styles.navButton}
                    onClick={handleNext}
                    disabled={currentIndex + 3 >= allAchievements.length}
                >
                    →
                </button>
            </div>
        </section>
    );
}

export default AchievementsSchool;
