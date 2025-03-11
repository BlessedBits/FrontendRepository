import React, { useState } from "react";
import styles from "./Features.module.css";

const featuresData = {
    teachers: [
        { key: "journal", label: "Журнал", description: "Управління класними журналами та оцінками." },
        {
            key: "distanceLearning",
            label: "Дистанційне навчання",
            description: "Інструменти для проведення дистанційних уроків.",
        },
        { key: "onlineLessons", label: "Онлайн уроки", description: "Можливість проводити онлайн-уроки." },
        { key: "loremIpsum", label: "Lorem ipsum", description: "Додатковий функціонал для вчителів." },
    ],
    students: [
        { key: "diary", label: "Щоденник", description: "Щоденник для відстеження домашніх завдань." },
        { key: "friends", label: "Друзі", description: "Спілкування з однокласниками та друзями." },
        { key: "schedule", label: "Розклад уроків", description: "Зручний розклад уроків." },
        { key: "textbooks", label: "Онлайн підручники", description: "Доступ до онлайн-підручників." },
    ],
};

const Features = () => {
    const [activeFeature, setActiveFeature] = useState(null);
    const [section, setSection] = useState(null);

    const handleClick = async (key, sectionName) => {
        setActiveFeature(key);
        setSection(sectionName);
    };

    return (
        <section id="features" className={styles.features}>
            <h2>Можливості платформи</h2>

            <div className={styles.featureContainer}>
                {/* Для вчителів */}
                <div className={styles.featureBox}>
                    <h3>Для вчителів:</h3>
                    <div className={styles.linksContainer}>
                        {featuresData.teachers.map(({ key, label }) => (
                            <button
                                key={key}
                                className={`${styles.headerLink} ${activeFeature === key ? styles.active : ""}`}
                                onClick={() => handleClick(key, "teachers")}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                    {section === "teachers" && activeFeature && (
                        <p className={`${styles.description} ${styles.visible}`}>
                            {featuresData.teachers.find((item) => item.key === activeFeature)?.description}
                        </p>
                    )}
                </div>

                {/* Для учнів */}
                <div className={styles.featureBox}>
                    <h3>Для учнів:</h3>
                    <div className={styles.linksContainer}>
                        {featuresData.students.map(({ key, label }) => (
                            <button
                                key={key}
                                className={`${styles.headerLink} ${activeFeature === key ? styles.active : ""}`}
                                onClick={() => handleClick(key, "students")}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                    {section === "students" && activeFeature && (
                        <p className={`${styles.description} ${styles.visible}`}>
                            {featuresData.students.find((item) => item.key === activeFeature)?.description}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Features;
