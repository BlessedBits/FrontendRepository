import React, { useState, useEffect } from 'react';

function AchievementsSchool({ schoolId }) {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchAchievements() {
            try {
                const response = await fetch(`/api/events/important/${schoolId}`);
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

    if (loading) {
        return <p>Завантаження досягнень...</p>;
    }

    if (error) {
        //return <p>{error}</p>
        return (
            <section id="achievements" className="achievements-component">
                <h2>Наші досягнення</h2>
                <ul className="achievement-list">
                    <li>
                        <img src="frame-341.png" alt="Achievement 1" />
                        <p>Олег Роман, переможець в алко-олімпіаді серед другокурсиків</p>
                    </li>
                    <li>
                        <img src="frame-342.png" alt="Achievement 2" />
                        <p>Ковалець Владислав, найкращий в своєму роді, домовився з міністром освіти, щоб нам виділили ракету на Марс</p>
                    </li>
                </ul>
                <button className="more-button">Більше досягнень</button>
            </section>
        );
    }

    if (achievements.length === 0) {
        return <p>Досягнень поки немає.</p>;
    }

    return (
        <section id="achievements" className="achievements-component">
            <h2>Наші досягнення</h2>
            <ul className="achievement-list">
                {achievements.map((achievement) => (
                    <li key={achievement.id}>
                        <img src={achievement.image_url} alt={achievement.title} />
                        <p>{achievement.description}</p>
                    </li>
                ))}
            </ul>
            <button className="more-button">Більше досягнень</button>
        </section>
    );
}

export default AchievementsSchool;
