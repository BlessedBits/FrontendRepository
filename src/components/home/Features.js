import React, { useState } from "react";

const Features = () => {
    const [activeFeature, setActiveFeature] = useState(null); 
    const [hoveredFeature, setHoveredFeature] = useState(null); 
    const [section, setSection] = useState(null);

    const descriptions = {
        journal: "Управління класними журналами та оцінками. ",
        distanceLearning: "Інструменти для проведення дистанційних уроків.",
        onlineLessons: "Можливість проводити онлайн-уроки.",
        loremIpsum: "Додатковий функціонал для вчителів.",
        diary: "Щоденник для відстеження домашніх завдань.",
        friends: "Спілкування з однокласниками та друзями.",
        schedule: "Зручний розклад уроків.",
        textbooks: "Доступ до онлайн-підручників.",
    };

    const handleMouseEnter = (key, sectionName) => {
            setHoveredFeature(key);
            setSection(sectionName);
    };

    const handleMouseLeave = () => {
        if (!activeFeature) {
            setHoveredFeature(null);
            setSection(null);
        }
    };

    const handleClick = (key, sectionName) => {
        setActiveFeature(key);
        setSection(sectionName);
        setHoveredFeature(null); 
    };

    return (
        <section id="features" className="features">
            <h2>Можливості платформи</h2>
            <div className="for-teachers">
                <h3>Для вчителів:</h3>
                <a
                    href="javascript:void(0);"
                    onMouseEnter={() => handleMouseEnter("journal", "teachers")}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick("journal", "teachers")}
                >
                    Журнал
                </a>
                <a
                    href="javascript:void(0);"
                    onMouseEnter={() =>
                        handleMouseEnter("distanceLearning", "teachers")
                    }
                    onMouseLeave={handleMouseLeave}
                    onClick={() =>
                        handleClick("distanceLearning", "teachers")
                    }
                >
                    Дистанційне навчання
                </a>
                <a
                    href="javascript:void(0);"
                    onMouseEnter={() => handleMouseEnter("onlineLessons", "teachers")}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick("onlineLessons", "teachers")}
                >
                    Онлайн уроки
                </a>
                <a
                    href="javascript:void(0);"
                    onMouseEnter={() => handleMouseEnter("loremIpsum", "teachers")}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick("loremIpsum", "teachers")}
                >
                    Lorem ipsum
                </a>
            </div>
            <div className="description teachers-description">
                {section === "teachers" && (
                    <p className={`description-text ${hoveredFeature || activeFeature ? "visible" : ""}`}>
                        {descriptions[hoveredFeature || activeFeature]}
                    </p>
                )}
            </div>
            <div className="for-students">
                <h3>Для учнів:</h3>
                <a
                    href="javascript:void(0);"
                    onMouseEnter={() => handleMouseEnter("diary", "students")}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick("diary", "students")}
                >
                    Щоденник
                </a>
                <a
                    href="javascript:void(0);"
                    onMouseEnter={() => handleMouseEnter("friends", "students")}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick("friends", "students")}
                >
                    Друзі
                </a>
                <a
                    href="javascript:void(0);"
                    onMouseEnter={() => handleMouseEnter("schedule", "students")}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick("schedule", "students")}
                >
                    Розклад уроків
                </a>
                <a
                    href="javascript:void(0);"
                    onMouseEnter={() => handleMouseEnter("textbooks", "students")}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick("textbooks", "students")}
                >
                    Онлайн підручники
                </a>
            </div>
            <div className="description students-description">
                {section === "students" && (
                    <p className={`description-text ${hoveredFeature || activeFeature ? "visible" : ""}`}>
                        {descriptions[hoveredFeature || activeFeature]}
                    </p>
                )}
            </div>
        </section>
    );
};

export default Features;
