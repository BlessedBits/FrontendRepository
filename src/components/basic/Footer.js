import React from "react";
import style from "./Footer.module.css";

function Footer() {
    return (
        <footer className={style.footer}>
            <p>&copy; {new Date().getFullYear()} SchoolHub. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
