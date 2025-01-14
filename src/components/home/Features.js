import React, { useState } from "react";
import styles from "./Features.module.css";
import {getAllSchools} from "../misc/SchoolApi";

const Features = () => {
    const [activeFeature, setActiveFeature] = useState(null);
    const [section, setSection] = useState(null);

    const descriptions = {
        journal: "Управління класними журналами та оцінками.",
        distanceLearning: "Інструменти для проведення дистанційних уроків.",
        onlineLessons: "Можливість проводити онлайн-уроки.",
        loremIpsum: "Додатковий функціонал для вчителів.",
        diary: "Щоденник для відстеження домашніх завдань.",
        friends: "Спілкування з однокласниками та друзями.",
        schedule: "Зручний розклад уроків.",
        textbooks: "Доступ до онлайн-підручників.",
    };

    const handleClick = (key, sectionName) => {
        setActiveFeature(key);
        setSection(sectionName);
        let schools = getAllSchools();
        console.log(schools);
    };

    return (
        <section id="features" className={styles.features}>
            <h2>Можливості платформи</h2>

            {/* Для вчителів */}
            <div className={styles.forTeachers}>
                <h3>Для вчителів:</h3>
                <a
                    href="javascript:void(0);"
                    className={`${styles.headerLink} ${activeFeature === "journal" ? styles.active : ""}`}
                    onClick={() => handleClick("journal", "teachers")}
                >
                    Журнал
                </a>
                <a
                    href="javascript:void(0);"
                    className={`${styles.headerLink} ${activeFeature === "distanceLearning" ? styles.active : ""}`}
                    onClick={() => handleClick("distanceLearning", "teachers")}
                >
                    Дистанційне навчання
                </a>
                <a
                    href="javascript:void(0);"
                    className={`${styles.headerLink} ${activeFeature === "onlineLessons" ? styles.active : ""}`}
                    onClick={() => handleClick("onlineLessons", "teachers")}
                >
                    Онлайн уроки
                </a>
                <a
                    href="javascript:void(0);"
                    className={`${styles.headerLink} ${activeFeature === "loremIpsum" ? styles.active : ""}`}
                    onClick={() => handleClick("loremIpsum", "teachers")}
                >
                    Lorem ipsum
                </a>
            </div>

            {/* Опис для вчителів */}
            <div className={styles.teachersDescription}>
                {section === "teachers" && activeFeature && (
                    <p className={`${styles.description} ${styles.visible}`}>
                        {descriptions[activeFeature]}
                    </p>
                )}
            </div>

            {/* Для учнів */}
            <div className={styles.forStudents}>
                <h3>Для учнів:</h3>
                <a
                    href="javascript:void(0);"
                    className={`${styles.headerLink} ${activeFeature === "diary" ? styles.active : ""}`}
                    onClick={() => handleClick("diary", "students")}
                >
                    Щоденник
                </a>
                <a
                    href="javascript:void(0);"
                    className={`${styles.headerLink} ${activeFeature === "friends" ? styles.active : ""}`}
                    onClick={() => handleClick("friends", "students")}
                >
                    Друзі
                </a>
                <a
                    href="javascript:void(0);"
                    className={`${styles.headerLink} ${activeFeature === "schedule" ? styles.active : ""}`}
                    onClick={() => handleClick("schedule", "students")}
                >
                    Розклад уроків
                </a>
                <a
                    href="javascript:void(0);"
                    className={`${styles.headerLink} ${activeFeature === "textbooks" ? styles.active : ""}`}
                    onClick={() => handleClick("textbooks", "students")}
                >
                    Онлайн підручники
                </a>
            </div>

            {/* Опис для учнів */}
            <div className={styles.studentsDescription}>
                {section === "students" && activeFeature && (
                    <p className={`${styles.description} ${styles.visible}`}>
                        {descriptions[activeFeature]}
                    </p>
                )}
            </div>
        </section>
    );
};

export default Features;
