import React, { useState } from "react";
import ThemeItem from "./ThemeItem";
import styles from "./ModuleItem.module.css";

function ModuleItem({ module, userRole }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={styles.moduleItem}>
            <div onClick={() => setExpanded(!expanded)} className={styles.header}>
                {module.name}
                <button className={styles.toggleButton}>
                    {expanded ? "🔽" : "▶️"}
                </button>
            </div>
            {expanded && (
                <div className={styles.themes}>
                    {module.themes.map((theme) => (
                        <ThemeItem key={theme.id} theme={theme} userRole={userRole} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ModuleItem;
