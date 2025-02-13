import React, { useState, useEffect } from "react";
import styles from "./ThemeItem.module.css";
import { getMaterials } from "../../api/course";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Notification from "../basic/Notification";
import { Loading } from "../basic/LoadingAnimation";

function ThemeItem({ moduleId, userRole }) {
    const [materials, setMaterials] = useState(null);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchMaterials = async () => {
            setLoading(true);
            try {
                const data = await getMaterials(moduleId, axiosPrivate);
                setMaterials(data);
            } catch (err) {
                console.error("Помилка завантаження матеріалів:", err.message);
                setNotification({
                    type: "error",
                    message: "Помилка при завантаженні матеріалу, спробуйте пізніше",
                });
            } finally {
                setLoading(false);
            }

            setTimeout(() => setNotification(null), 3000);
        };

        fetchMaterials();
    }, [moduleId, axiosPrivate]);
    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Notification message={notification?.message} type={notification?.type} />
            {!materials === null && <p>Матеріали відсутні.</p>}
            {materials && materials.length === 0 && <p>Матеріали для цього модуля поки що не додані.</p>}
            {!loading && materials && materials.length > 0 && (
                <>
                    {materials.map((material) => (
                        <li key={material.id} className={styles.themeItem}>
                            <h4 className={styles.title}>{material.title}</h4>
                            <p>Опис: {material.description}</p>
                            <p>
                                Корисні лінки:{" "}
                                <a href={material.url} target="_blank" rel="noopener noreferrer">
                                    {material.url}
                                </a>
                            </p>
                        </li>
                    ))}
                </>
            )}
        </>
    );
}

export default ThemeItem;
