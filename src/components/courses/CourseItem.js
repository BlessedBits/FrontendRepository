import React, { useState } from "react";
import ModuleItem from "./ModuleItem";
import styles from "./CourseItem.module.css";

function CourseItem({ course, userRole }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <li className={expanded ? styles.courseItemExpanded : styles.courseItem}>
            <button className={styles.toggleButton} onClick={() => setExpanded(!expanded)}>
                {expanded ? "🔽" : "▶️"} {course.name}
            </button>

            {expanded && (
                <ul className={styles.modules}>
                    {course.modules.map((module) => (
                        <ModuleItem key={module.id} module={module} userRole={userRole} />
                    ))}
                </ul>
            )}
        </li>
    );
}

export default CourseItem;
