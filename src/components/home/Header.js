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
            <div className={styles.logo}>SchoolHub
                <img src="/weblogo.png" alt="logo" className={styles.logoImage} />
            </div>
            <nav>
                <a className={styles.headerLink} onClick={() => handleScroll("about")}>Про сайт</a>
                <a className={styles.headerLink} onClick={() => handleScroll("features")}>Можливості</a>
                <a className={styles.headerLink} onClick={() => handleScroll("faq")}>FAQ</a>
            </nav>
            <button className={styles.loginbtn} onClick={onLoginClick}>
                Увійти
            </button>
        </header>
    );
};

export default Header;
