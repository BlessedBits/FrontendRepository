import React, { useState } from "react";
import ModuleItem from "./ModuleItem";
import styles from "./CourseItem.module.css";

function CourseItem({ course, userRole }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <div onClick={() => setExpanded(!expanded)} className={styles.courseItem}>
              <button className={styles.toggleButton}>
                      {expanded ? "🔽" : "▶️"}
              </button>
              {course.name}
            </div>
            {expanded && (
                <div className={styles.modules}>
                    {course.modules.map((module) => (
                        <ModuleItem key={module.id} module={module} userRole={userRole} />
                    ))}
                </div>
            )}
        </>
    );
}

export default CourseItem;
