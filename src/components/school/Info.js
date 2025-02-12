import React, { useState, useEffect, useCallback } from "react";
import styles from "./InfoSchool.module.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getSchoolInfo, updateSchoolInfo } from "../../api/school";
import { Loading } from "../basic/LoadingAnimation";
import Notification from "../basic/Notification";
import { getUserSchool } from "../../api/user";

function EditableField({ fieldName, value, isAdmin, onSave }) {
    const [editing, setEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    const startEditing = () => {
        setEditing(true);
        setTempValue(value);
    };

    const cancelEditing = () => {
        setEditing(false);
    };

    const save = () => {
        onSave(fieldName, tempValue);
        setEditing(false);
    };

    return (
        <div className={styles.valueContainer}>
            {editing ? (
                <div className={styles.editContainer}>
                    <input
                        type={fieldName === "year" ? "number" : "text"}
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                    />
                    <button onClick={save}>💾</button>
                    <button onClick={cancelEditing}>❌</button>
                </div>
            ) : (
                <>
                    {value || "Немає даних"}
                    {isAdmin && (
                        <button
                            className={styles.editIcon}
                            onClick={startEditing}
                        >
                            ✏️
                        </button>
                    )}
                </>
            )}
        </div>
    );
}

function InfoSchool({ userRole }) {
    const [schoolInfo, setSchoolInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState({ message: "", type: "" });

    const axiosPrivate = useAxiosPrivate();
    const isAdmin = userRole === "SCHOOL_ADMIN";

    const saveField = useCallback(
        async (fieldName, newValue) => {
            setNotification({
                message: "Оновлюється інформація...",
                type: "loading",
            });
            try {
                const schoolId = await getUserSchool(axiosPrivate);
                await updateSchoolInfo(
                    schoolId,
                    { [fieldName]: newValue },
                    axiosPrivate
                );
                setSchoolInfo((prev) => ({ ...prev, [fieldName]: newValue }));
                setNotification({
                    message: "Інформація оновлена!",
                    type: "success",
                });
            } catch (err) {
                console.error("Помилка оновлення:", err);
                setNotification({
                    message: "Помилка при обробці!",
                    type: "error",
                });
            }
            setTimeout(() => setNotification({ message: "", type: "" }), 3000);
        },
        [axiosPrivate]
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const infoResponse = await getSchoolInfo(axiosPrivate);
                setSchoolInfo(infoResponse);
            } catch (err) {
                setError(
                    err.response?.data?.message || "Помилка завантаження даних"
                );
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [axiosPrivate]);

    if (loading)
        return (
            <section className={styles.schoolInfo}>
                <Loading />
            </section>
        );
    if (error)
        return (
            <section className={styles.schoolInfo}>
                <p>Сталась помилка, спробуйте пізніше</p>
            </section>
        );
    if (!schoolInfo) return <p>Дані про школу не знайдені.</p>;

    return (
        <section id="school-info" className={styles.schoolInfo}>
            <h1 className={styles.h1}>
                <EditableField
                    fieldName="name"
                    value={schoolInfo.name}
                    isAdmin={isAdmin}
                    onSave={saveField}
                />
            </h1>
            <p>
                <EditableField
                    fieldName="phrase"
                    value={schoolInfo.phrase}
                    isAdmin={isAdmin}
                    onSave={saveField}
                />
            </p>

            <table className={styles.infoTable}>
                <tbody>
                    <tr>
                        <th>Рік заснування:</th>
                        <td>
                            <EditableField
                                fieldName="year"
                                value={
                                    schoolInfo.year
                                        ? `${schoolInfo.year} рік`
                                        : ""
                                }
                                isAdmin={isAdmin}
                                onSave={saveField}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Розташування:</th>
                        <td>
                            <EditableField
                                fieldName="address"
                                value={schoolInfo.address}
                                isAdmin={isAdmin}
                                onSave={saveField}
                            />
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
            <Notification
                message={notification.message}
                type={notification.type}
            />
        </section>
    );
}

export default InfoSchool;
