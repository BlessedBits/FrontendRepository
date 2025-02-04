import React, { useState, useEffect } from 'react';
import styles from './InfoSchool.module.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { getSchoolInfo, updateSchoolInfo } from '../../api/school';
import { Loading } from '../basic/LoadingAnimation';
import Notification from '../basic/Notification';

function InfoSchool({ userRole }) {
    const [schoolInfo, setSchoolInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingField, setEditingField] = useState(null);
    const [tempValue, setTempValue] = useState('');
    const [notification, setNotification] = useState({ message: "", type: "" });

    
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

        setNotification({ message: "Оновлюється інформація..." , type: "loading" });
        try {
            await updateSchoolInfo(
                { [fieldName]: fieldName === 'year' ? Number(tempValue) : tempValue },
                axiosPrivate
            );
            setSchoolInfo(prev => ({ ...prev, [fieldName]: tempValue }));
            setNotification({ message: "Інформація оновлена!", type: "success" });
            setEditingField(null);
        } catch (err) {
            console.error('Помилка оновлення:', err);
            setNotification({ message: "Помилка при обробці!", type: "error" });
        }
        setTimeout(() => setNotification({ message: "", type: "" }), 3000);
    };
    
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const infoResponse = await getSchoolInfo(axiosPrivate);
                setSchoolInfo(infoResponse);
            } catch (err) {
                setError(err.response?.data?.message || 'Помилка завантаження даних');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [ axiosPrivate]);

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
                <p>
                    {editingField === 'phrase' ? (
                        <div className={styles.editContainer}>
                            <input
                                type="text"
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                            />
                            <button onClick={() => saveField('phrase')}>💾</button>
                            <button onClick={cancelEditing}>❌</button>
                        </div>
                    ) : (
                        <div className={styles.valueContainer}>
                            {schoolInfo.phrase}
                            {userRole === "SCHOOL_ADMIN" && (
                                <button 
                                    className={styles.editIcon}
                                    onClick={() => startEditing('phrase', schoolInfo.phrase)}
                                >
                                    ✏️
                                </button>
                            )}
                        </div>
                    )}
                </p>                

            <table className={styles.infoTable}>
                <tbody>
                        <tr>
                            <th>Рік заснування:</th>
                            <td>
                                {editingField === 'year' ? (
                                    <div className={styles.editContainer}>
                                        <input
                                            type="number"
                                            value={tempValue}
                                            onChange={(e) => setTempValue(e.target.value)}
                                        />
                                        <button onClick={() => saveField('year')}>💾</button>
                                        <button onClick={cancelEditing}>❌</button>
                                    </div>
                                ) : (
                                    <div className={styles.valueContainer}>
                                        {schoolInfo.year ? (
                                            <>{schoolInfo.year} рік</>) :(<>Рік ще не встановлений</>)}
                                        {userRole === "SCHOOL_ADMIN" && (
                                            <button 
                                                className={styles.editIcon}
                                                onClick={() => startEditing('year', schoolInfo.year)}
                                            >
                                                ✏️
                                            </button>
                                        )}
                                    </div>
                                )}
                            </td>
                        </tr>
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
            <Notification message={notification.message} type={notification.type} />
        </section>
    );
}

export default InfoSchool;
