import React, { useState, useEffect } from 'react';
import styles from './ContactSchool.module.css';

function ContactSchool({ schoolId }) {
    const [schoolData, setSchoolData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchSchoolData() {
            try {
                const response = await fetch(`/api/schools/${schoolId}/contact`);
                if (!response.ok) {
                    throw new Error('Не вдалося завантажити дані школи');
                }
                const data = await response.json();
                setSchoolData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchSchoolData();
    }, [schoolId]);

    if (loading) {
        return <p>Завантаження даних...</p>;
    }

    if (error) {
        return (
            <section id="contacts" className={styles.contacts}>
                <h2>Контакти</h2>
                <form className={styles.contactForm}>
                    <label htmlFor="phone">Телефон:</label>
                    <input type="text" id="phone" value="+380xxxxxxxxx" readOnly />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value="test@gmail.com" readOnly />
                </form>

                <div className={styles.socialMedia}>
                    <h3>Ми в соц мережах:</h3>
                    <ul className={styles.socialIcons}>
                        <li>
                            <img src="/icons/facebook.png" alt="Facebook" />
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                Facebook
                            </a>
                        </li>
                        <li>
                            <img src="/icons/youtube.png" alt="YouTube" />
                            <a href="https://www.youtube.com/watch?v=S6YDWy6wH7w" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                YouTube
                            </a>
                        </li>
                        <li>
                            <img src="/icons/instagram.png" alt="Instagram" />
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                Instagram
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        );
    }

    if (!schoolData) {
        return <p>Дані не знайдені.</p>;
    }

    return (
        <section id="contacts" className={styles.contacts}>
            <h2>Контакти школи</h2>
            <form className={styles.contactForm}>
                <label htmlFor="phone">Телефон:</label>
                <input type="text" id="phone" value={schoolData.phone_number} readOnly />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={schoolData.email} readOnly />
            </form>

            <div className={styles.socialMedia}>
                <h3>Ми в соцмережах:</h3>
                <ul className={styles.socialIcons}>
                    {schoolData.youtube_link && (
                        <li>
                            <img src="/icons/youtube.png" alt="YouTube" />
                            <a href={schoolData.youtube_link} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                YouTube
                            </a>
                        </li>
                    )}
                    {schoolData.facebook_link && (
                        <li>
                            <img src="/icons/facebook.png" alt="Facebook" />
                            <a href={schoolData.facebook_link} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                Facebook
                            </a>
                        </li>
                    )}
                    {schoolData.instagram_link && (
                        <li>
                            <img src="/icons/instagram.png" alt="Instagram" />
                            <a href={schoolData.instagram_link} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                Instagram
                            </a>
                        </li>
                    )}
                    {schoolData.tiktok_link && (
                        <li>
                            <img src="/icons/tiktok.png" alt="TikTok" />
                            <a href={schoolData.tiktok_link} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                TikTok
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </section>
    );
}

export default ContactSchool;
