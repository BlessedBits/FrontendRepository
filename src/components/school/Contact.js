import React, { useState, useEffect } from 'react';

function ContactSchool({ schoolId }) {
    const [schoolData, setSchoolData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchSchoolData() {
            try {
                const response = await fetch(`/api/schools/${schoolId}`);
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
        
        //return <p>{error}</p>
        return(
           <section id="contacts" className="contact-component">
            <h2>Контакти</h2>
            <form className="contact-form">
                <label htmlFor="phone">Телефон:</label>
                <input type="text" id="phone" value="+380xxxxxxxxx" readOnly />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value="test@gmail.com" readOnly />
            </form>

            <div className="social-media">
                <h3>Ми в соц мережах:</h3>
                <ul className="social-icons">
                    <li><img src="facebook0.png" alt="Facebook" className="icon" /> Facebook</li>
                    <li><img src="youtube.png" alt="YouTube" className="icon" /> YouTube</li>
                    <li><img src="instagram-circle0.png" alt="Instagram" className="icon" /> Instagram</li>
                </ul>
            </div>
        </section>
        );
    }

    if (!schoolData) {
        return <p>Дані не знайдені.</p>;
    }

    return (
        <section id="contacts" className="contact-component">
            <h2>Контакти школи</h2>
            <form className="contact-form">
                <label htmlFor="phone">Телефон:</label>
                <input type="text" id="phone" value={schoolData.phone_number} readOnly />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={schoolData.email} readOnly />
            </form>

            <div className="social-media">
                <h3>Ми в соцмережах:</h3>
                <ul className="social-icons">
                    {schoolData.youtube_link && (
                        <li>
                            <img src="youtube.png" alt="YouTube" className="icon" />
                            <a href={schoolData.youtube_link} target="_blank" rel="noopener noreferrer">YouTube</a>
                        </li>
                    )}
                    {schoolData.facebook_link && (
                        <li>
                            <img src="facebook.png" alt="Facebook" className="icon" />
                            <a href={schoolData.facebook_link} target="_blank" rel="noopener noreferrer">Facebook</a>
                        </li>
                    )}
                    {schoolData.intagram_link && (
                        <li>
                            <img src="instagram.png" alt="Instagram" className="icon" />
                            <a href={schoolData.intagram_link} target="_blank" rel="noopener noreferrer">Instagram</a>
                        </li>
                    )}
                    {schoolData.tiktok_link && (
                        <li>
                            <img src="tiktok.png" alt="TikTok" className="icon" />
                            <a href={schoolData.tiktok_link} target="_blank" rel="noopener noreferrer">TikTok</a>
                        </li>
                    )}
                </ul>
            </div>
        </section>
    );
}

export default ContactSchool;
