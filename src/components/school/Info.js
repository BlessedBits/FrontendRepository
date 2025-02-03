import React, { useState, useEffect } from 'react';
import styles from './InfoSchool.module.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { getSchoolInfo } from '../../api/school';
import { Loading } from '../basic/LoadingAnimation';

function InfoSchool({ schoolId, userRole }) {
    const [schoolInfo, setSchoolInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingField, setEditingField] = useState(null);
    const [tempValue, setTempValue] = useState('');
    
    const axiosPrivate = useAxiosPrivate();

    const startEditing = (fieldName, currentValue) => {
        setEditingField(fieldName);
        setTempValue(currentValue);
    };

    const cancelEditing = () => {
        setEditingField(null);
        setTempValue('');
    };

    const saveField = async (fieldName) => {
        try {
            await axiosPrivate.patch(`/schools/${schoolId}`, {
                [fieldName]: fieldName === 'years' ? Number(tempValue) : tempValue
            });
            setSchoolInfo(prev => ({ ...prev, [fieldName]: tempValue }));
            setEditingField(null);
        } catch (err) {
            console.error('Помилка оновлення:', err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const infoResponse = await getSchoolInfo(schoolId, axiosPrivate);
                setSchoolInfo(infoResponse);
            } catch (err) {
                setError(err.response?.data?.message || 'Помилка завантаження даних');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [schoolId, axiosPrivate]);

    if (loading) {
        return (
            <section id="school-info" className={styles.schoolInfo}>
               <Loading />
            </section>
        );
    }

    if (error) {
        return (
            <section id="school-info" className={styles.schoolInfo}>
                <p>Сталась помилка, спробуйте пізніше</p>
            </section>
        );
    }

    if (!schoolInfo) {
        return <p>Дані про школу не знайдені.</p>;
    }

    return (
        <section id="school-info" className={styles.schoolInfo}>
            <h1>
                {editingField === 'name' ? (
                    <div className={styles.editContainer}>
                        <input
                            type="text"
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                        />
                        <button onClick={() => saveField('name')}>💾</button>
                        <button onClick={cancelEditing}>❌</button>
                    </div>
                ) : (
                    <div className={styles.valueContainer}>
                        {schoolInfo.name}
                        {userRole === "SCHOOL_ADMIN" && (
                            <button 
                                className={styles.editIcon}
                                onClick={() => startEditing('name', schoolInfo.name)}
                            >
                                ✏️
                            </button>
                        )}
                    </div>
                )}
            </h1>

            {schoolInfo.slogan && (
                <p>
                    {editingField === 'slogan' ? (
                        <div className={styles.editContainer}>
                            <input
                                type="text"
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                            />
                            <button onClick={() => saveField('slogan')}>💾</button>
                            <button onClick={cancelEditing}>❌</button>
                        </div>
                    ) : (
                        <div className={styles.valueContainer}>
                            {schoolInfo.slogan}
                            {userRole === "SCHOOL_ADMIN" && (
                                <button 
                                    className={styles.editIcon}
                                    onClick={() => startEditing('slogan', schoolInfo.slogan)}
                                >
                                    ✏️
                                </button>
                            )}
                        </div>
                    )}
                </p>                
            )}

            <table className={styles.infoTable}>
                <tbody>
                    {schoolInfo.years && (
                        <tr>
                            <th>Рік заснування:</th>
                            <td>
                                {editingField === 'years' ? (
                                    <div className={styles.editContainer}>
                                        <input
                                            type="number"
                                            value={tempValue}
                                            onChange={(e) => setTempValue(e.target.value)}
                                        />
                                        <button onClick={() => saveField('years')}>💾</button>
                                        <button onClick={cancelEditing}>❌</button>
                                    </div>
                                ) : (
                                    <div className={styles.valueContainer}>
                                        {schoolInfo.years}
                                        {userRole === "SCHOOL_ADMIN" && (
                                            <button 
                                                className={styles.editIcon}
                                                onClick={() => startEditing('years', schoolInfo.years)}
                                            >
                                                ✏️
                                            </button>
                                        )}
                                    </div>
                                )}
                            </td>
                        </tr>
                    )}

                    <tr>
                        <th>Розташування:</th>
                        <td>
                            {editingField === 'address' ? (
                                <div className={styles.editContainer}>
                                    <input
                                        type="text"
                                        value={tempValue}
                                        onChange={(e) => setTempValue(e.target.value)}
                                    />
                                    <button onClick={() => saveField('address')}>💾</button>
                                    <button onClick={cancelEditing}>❌</button>
                                </div>
                            ) : (
                                <div className={styles.valueContainer}>
                                    {schoolInfo.address}
                                    {userRole === "SCHOOL_ADMIN" && (
                                        <button 
                                            className={styles.editIcon}
                                            onClick={() => startEditing('address', schoolInfo.address)}
                                        >
                                            ✏️
                                        </button>
                                    )}
                                </div>
                            )}
                        </td>
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
