import React from "react";
import styles from "./Header.module.css";

const Header = ({ onLoginClick }) => {
    const handleScroll = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" }); 
        }
    };

    return (
        <header>
            <div className={styles.logo}>
                <span className={styles.schoolText}>School</span>
                <span className={styles.hubText}>Hub</span>
                <img src="/weblogo.png" alt="logo" className={styles.logoImage} />
            </div>
            <nav className={styles.navHome}>
                <a className={styles.headerLink} onClick={() => handleScroll("about")}>Про сайт</a>
                <a className={styles.headerLink} onClick={() => handleScroll("features")}>Можливості</a>
                <a className={styles.headerLink} onClick={() => handleScroll("faq")}>FAQ</a>
            </nav>
            <button className={`${styles["bn632-hover"]} ${styles.bn25}`} onClick={onLoginClick}>
                Увійти
            </button>
        </header>
    );
};

export default Header;
