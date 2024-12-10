import React from 'react';

function AchievementsSchool() {
    return (
        <section id="achievements" className="achievements-component">
            <h2>Наші досягнення</h2>
            <ul className="achievement-list">
                <li>
                    <img src="frame-341.png" alt="Achievement 1" />
                    <p>Олег Роман, переможець в алко-олімпіаді серед другокурсиків</p>
                </li>
                <li>
                    <img src="frame-342.png" alt="Achievement 2" />
                    <p>Ковалець Владислав, найкращий в своєму роді, домовився з міністром освіти, щоб нам виділили ракету на Марс</p>
                </li>
            </ul>
            <button className="more-button">Більше досягнень</button>
        </section>
    );
}

export default AchievementsSchool