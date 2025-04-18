import React from "react";
import styles from "./About.module.css";
const About = ({ onRegisterClick }) => {
    return (
        <section className={styles.about} id="about">
            <h1>Подаруймо дітям знання та майбутнє</h1>
            <p>
                <strong>SchoolHub</strong> пропонує простий і доступний формат
                онлайн-навчання, який відповідає потребам сучасної, української
                школи. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec ullamcorper felis sed elit condimentum, quis suscipit
                mauris convallis. Cras scelerisque urna vel tortor porta
                malesuada. Proin urna urna, aliquam nec purus quis, condimentum
                facilisis dolor. Mauris eget dignissim eros. Aenean risus
                tortor, elementum sit amet faucibus nec, rutrum et dui. Quisque
                vulputate eros id nunc consequat sagittis. Suspendisse id
                egestas libero. Nam ac augue quam. Aenean vitae libero at urna
                tincidunt interdum. Nullam venenatis venenatis ex, eu consequat
                leo mattis ac.
            </p>
            <button
                className={`${styles["Registerbtn"]} ${styles.Registerbtn25}`}
                onClick={onRegisterClick}
            >
                Зареєструвати школу
            </button>
        </section>
    );
};

export default About;
