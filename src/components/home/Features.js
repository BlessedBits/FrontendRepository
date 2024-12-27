import React, { useState } from "react";

const Features = () => {
    const [activeFeature, setActiveFeature] = useState(null); // Відстеження вибраної функції
    const [section, setSection] = useState(null); // Відстеження вибраного розділу

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
    };

    return (
        <section id="features" className="features">
            <h2>Можливості платформи</h2>

            {/* Для вчителів */}
            <div className="for-teachers">
                <h3>Для вчителів:</h3>
                <a
                    href="javascript:void(0);"
                    className={activeFeature === "journal" ? "active" : ""}
                    onClick={() => handleClick("journal", "teachers")}
                >
                    Журнал
                </a>
                <a
                    href="javascript:void(0);"
                    className={activeFeature === "distanceLearning" ? "active" : ""}
                    onClick={() => handleClick("distanceLearning", "teachers")}
                >
                    Дистанційне навчання
                </a>
                <a
                    href="javascript:void(0);"
                    className={activeFeature === "onlineLessons" ? "active" : ""}
                    onClick={() => handleClick("onlineLessons", "teachers")}
                >
                    Онлайн уроки
                </a>
                <a
                    href="javascript:void(0);"
                    className={activeFeature === "loremIpsum" ? "active" : ""}
                    onClick={() => handleClick("loremIpsum", "teachers")}
                >
                    Lorem ipsum
                </a>
            </div>

            {/* Опис для вчителів */}
            <div className="description teachers-description">
                {section === "teachers" && activeFeature && (
                    <p className="description-text visible">
                        {descriptions[activeFeature]}
                    </p>
                )}
            </div>

            {/* Для учнів */}
            <div className="for-students">
                <h3>Для учнів:</h3>
                <a
                    href="javascript:void(0);"
                    className={activeFeature === "diary" ? "active" : ""}
                    onClick={() => handleClick("diary", "students")}
                >
                    Щоденник
                </a>
                <a
                    href="javascript:void(0);"
                    className={activeFeature === "friends" ? "active" : ""}
                    onClick={() => handleClick("friends", "students")}
                >
                    Друзі
                </a>
                <a
                    href="javascript:void(0);"
                    className={activeFeature === "schedule" ? "active" : ""}
                    onClick={() => handleClick("schedule", "students")}
                >
                    Розклад уроків
                </a>
                <a
                    href="javascript:void(0);"
                    className={activeFeature === "textbooks" ? "active" : ""}
                    onClick={() => handleClick("textbooks", "students")}
                >
                    Онлайн підручники
                </a>
            </div>

            {/* Опис для учнів */}
            <div className="description students-description">
                {section === "students" && activeFeature && (
                    <p className="description-text visible">
                        {descriptions[activeFeature]}
                    </p>
                )}
            </div>
        </section>
    );
};

export default Features;
