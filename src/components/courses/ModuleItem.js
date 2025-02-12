import React, { useState } from "react";
import ThemeItem from "./ThemeItem";
import styles from "./ModuleItem.module.css";

function ModuleItem({ module, userRole }) {
    const [expanded, setExpanded] = useState(false);

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
                    <ThemeItem moduleId={module.id} userRole={userRole} />
                </ul>
            )}
        </li>
    );
}

export default ModuleItem;
