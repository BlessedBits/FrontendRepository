import React, { useState, useEffect } from 'react';
import styles from './InfoSchool.module.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { getSchoolInfo } from '../../api/school';
import { Loading } from '../basic/LoadingAnimation';

function InfoSchool({ schoolId }) {
    const [schoolInfo, setSchoolInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const axiosPrivate = useAxiosPrivate();     

    useEffect(() => {
        async function fetchSchoolInfo() {
            try {
                const response = await getSchoolInfo(schoolId, axiosPrivate);
                setSchoolInfo(response); 
            } catch (err) {
                setError(err.response?.data?.message || 'Не вдалося отримати дані про школу');
            } finally {
                setLoading(false);
            }
        }

        fetchSchoolInfo();
    }, [schoolId]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        console.log(error);
        return (
            <section id="school-info" className={styles.schoolInfo}>
                <p>Горить і не згасає</p>
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
                        <td>{schoolInfo.studentCount}</td>
                    </tr>
                    <tr>
                        <th>Кількість вчителів:</th>
                        <td>{schoolInfo.teacherCount}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}

export default InfoSchool;
