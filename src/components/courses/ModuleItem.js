import React, { useState, useEffect } from "react";
import ThemeItem from "./ThemeItem";
import styles from "./ModuleItem.module.css";
import { getMaterials } from "../../api/course";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Notification from "../basic/Notification";

function ModuleItem({ module, userRole }) {
    const [expanded, setExpanded] = useState(false);
    const [materials, setMaterials] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchMaterials = async () => {
            setLoading(true);
            try {
                const data = await getMaterials(module.id, axiosPrivate);
                setMaterials(data);
            } catch (err) {
                console.error("Помилка завантаження матеріалів:", err.message);
                setError(
                    "Не вдалося завантажити матеріали. Спробуйте пізніше."
                );
            } finally {
                setLoading(false);
            }
        };

        if (expanded) {
            fetchMaterials();
        }
    }, [expanded, module.id, axiosPrivate]);

    return (
        <li className={styles.moduleItem}>
            <div
                onClick={() => setExpanded(!expanded)}
                className={styles.header}
                role="button"
                tabIndex={0}
            >
                <button className={styles.toggleButton} aria-label="Перемкнути">
                    {expanded ? "🔽" : "▶️"}
                </button>
                {module.name}
            </div>

            {expanded && (
                <ul className={styles.themes}>
                    {loading && <p>Завантаження матеріалів...</p>}
                    {error && <Notification message={error} type="error" />}
                    {materials.length > 0 ? (
                        module.themes.map((theme) => (
                            <ThemeItem
                                key={theme.id}
                                theme={theme}
                                userRole={userRole}
                            />
                        ))
                    ) : (
                        <li>Матеріали відсутні.</li>
                    )}
                </ul>
            )}
        </li>
    );
}

export default ModuleItem;
