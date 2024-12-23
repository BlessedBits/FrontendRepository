import React from "react";

const Features = () => {
    return (
        <section id = "features"className="features">
            <h2>Можливості платформи</h2>
            <div className="for-teachers">
                <h3>Для вчителів:</h3>
                <a href="#">Журнал</a>
                <a href="#">Дистанційне навчання</a>
                <a href="#">Онлайн уроки</a>
                <a href="#">Lorem ipsum</a>
            </div>
            <div className="for-students">
                <h3>Для учнів:</h3>
                <a href="#">Щоденник</a>
                <a href="#">Друзі</a>
                <a href="#">Розклад уроків</a>
                <a href="#">Онлайн підручники</a>
            </div>
        </section>
    );
};

export default Features;
