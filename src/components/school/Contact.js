import React, { useState, useEffect } from 'react';
import styles from './ContactSchool.module.css';
import { getSchoolContacts } from '../../api/school';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Loading } from '../basic/LoadingAnimation';

function ContactSchool({ schoolId }) {
    const [schoolData, setSchoolData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        async function fetchSchoolData() {
            try {
                const data = await getSchoolContacts(schoolId, axiosPrivate);
                setSchoolData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchSchoolData();
    }, [schoolId, axiosPrivate]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <section id="contacts" className={styles.contacts}>
                <p><strong>На жаль, не вдалось знайти контакти даної школи.</strong></p>
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
                <input type="text" id="phone" value={schoolData.phoneNumber} readOnly />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={schoolData.email} readOnly />
            </form>

            <div className={styles.socialMedia}>
                <h3>Ми в соцмережах:</h3>
                <ul className={styles.socialIcons}>
                    {schoolData.youtubeLink && (
                        <li>
                            <img src="/icons/youtube.png" alt="YouTube" />
                            <a href={schoolData.youtubeLink} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                YouTube
                            </a>
                        </li>
                    )}
                    {schoolData.facebookLink && (
                        <li>
                            <img src="/icons/facebook.png" alt="Facebook" />
                            <a href={schoolData.facebookLink} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                Facebook
                            </a>
                        </li>
                    )}
                    {schoolData.instagramLink && (
                        <li>
                            <img src="/icons/instagram.png" alt="Instagram" />
                            <a href={schoolData.instagramLink} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                Instagram
                            </a>
                        </li>
                    )}
                    {schoolData.tiktokLink && (
                        <li>
                            <img src="/icons/tiktok.png" alt="TikTok" />
                            <a href={schoolData.tiktokLink} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
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
