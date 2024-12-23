import React from "react";

const Header = ({ onLoginClick }) => {
    const handleScroll = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" }); 
        }
    };

    return (
        <header>
            <div className="logo">SchoolHub</div>
            <nav>
                <a className="header-link" onClick={() => handleScroll("about")}>Про сайт</a>
                <a className="header-link" onClick={() => handleScroll("features")}>Можливості</a>
                <a className="header-link" onClick={() => handleScroll("faq")}>FAQ</a>
            </nav>
            <button className="login-btn" onClick={onLoginClick}>
                Увійти
            </button>
        </header>
    );
};

export default Header;
