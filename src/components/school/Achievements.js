import React, { useState, useEffect, useRef } from 'react';
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
    const [visibleCards, setVisibleCards] = useState(3);
    const galleryRef = useRef(null);

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

    useEffect(() => {
        let resizeTimer;
        const updateVisibleCards = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const screenWidth = window.innerWidth;
                let cards = 1;
                if (screenWidth >= 1800) {
                    cards = 4;
                } else if (screenWidth >= 1240) {
                    cards = 3;
                } else if (screenWidth >= 1040) {
                    cards = 2;
                } else {
                    cards = 1;
                }
                setVisibleCards(cards);
            }, 100);
        };

        updateVisibleCards();

        window.addEventListener('resize', updateVisibleCards);
        return () => {
            window.removeEventListener('resize', updateVisibleCards);
            clearTimeout(resizeTimer);
        };
    }, []);

    const handlePrev = () => {
        setCurrentIndex(prev => Math.max(prev - visibleCards, 0));
    };

    const handleNext = () => {
        setCurrentIndex(prev => Math.min(prev + visibleCards, allAchievements.length - visibleCards));
    };

    const allAchievements = [...achievements, ...staticAchievements];

    if (loading) {
        return <p>Завантаження даних...</p>;
    }

    // if (error) {
    //     return (
    //         <section id="achievements" className={styles.achievementsComponent}>
    //             <h2>Наші досягнення</h2>
    //             <p>{error}</p>
    //         </section>
    //     );
    // }

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
            <div className={styles.galleryContainer} ref={galleryRef}>
                <button
                    className={styles.navButton}
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                >
                    ←
                </button>
                <div className={styles.gallery}>
                    {allAchievements
                        .slice(currentIndex, currentIndex + visibleCards)
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
                    disabled={currentIndex + visibleCards >= allAchievements.length}
                >
                    →
                </button>
            </div>
        </section>
    );
}

export default AchievementsSchool;
