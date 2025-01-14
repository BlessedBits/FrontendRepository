import React, { useState, useEffect } from 'react';
import styles from './InfoSchool.module.css';

function InfoSchool({ schoolId }) {
    const [schoolInfo, setSchoolInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchSchoolInfo() {
            try {
                const response = await fetch(`/api/schools/${schoolId}/school_details`);
                if (!response.ok) {
                    throw new Error('Не вдалося отримати дані про школу');
                }
                const data = await response.json();
                setSchoolInfo(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchSchoolInfo();
    }, [schoolId]);

    if (loading) {
        return <p>Завантаження даних...</p>;
    }

    if (error ) {
        return (
            <section id="school-info" className={styles.schoolInfo}>
                <h1>Наша районна гімназія</h1>
                <p>Горить і не згасає</p>

                <table className={styles.infoTable}>
                    <tbody>
                        <tr>
                            <th>Рік заснування:</th>
                            <td>2023</td>
                        </tr>
                        <tr>
                            <th>Розташування:</th>
                            <td>м. Львів, вул. Романа Олега 42</td>
                        </tr>
                        <tr>
                            <th>Кількість учнів:</th>
                            <td>5</td>
                        </tr>
                        <tr>
                            <th>Кількість вчителів:</th>
                            <td>1</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        );
    }

    if (!schoolInfo) {
        return <p>Дані про школу не знайдені.</p>;
    }

    return (
        <section id="school-info" className={styles.schoolInfo}>
            <h1>{schoolInfo.name}</h1>
            <p>{schoolInfo.slogan}</p>

            <table className={styles.infoTable}>
                <tbody>
                    <tr>
                        <th>Рік заснування:</th>
                        <td>{schoolInfo.years}</td>
                    </tr>
                    <tr>
                        <th>Розташування:</th>
                        <td>{schoolInfo.address}</td>
                    </tr>
                    <tr>
                        <th>Кількість учнів:</th>
                        <td>{schoolInfo.student_count}</td>
                    </tr>
                    <tr>
                        <th>Кількість вчителів:</th>
                        <td>{schoolInfo.teacher_count}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}

export default InfoSchool;
