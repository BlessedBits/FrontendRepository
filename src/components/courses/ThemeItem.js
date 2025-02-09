import React, { useState } from "react";
import styles from "./ThemeItem.module.css";

function ThemeItem({ theme }) {
    const [expanded, setExpanded] = useState(false);

    function test(){
    console.log("Hello");
    }
    return (
        <div className={styles.themeItem}>
            <div onClick={() => setExpanded(!expanded)} className={styles.header}>
                {theme.name}
                <button className={styles.toggleButton}>
                    {expanded ? "🔽" : "▶️"}
                </button>
            </div>
            {expanded && (
                <div className={styles.tasks}>
                    <h4>Завдання:</h4>
                    <ul>
                        {theme.tasks.map((task) => (
                            <li key={task.id}>
                                <strong>{task.name}:</strong> {task.description}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ThemeItem;
