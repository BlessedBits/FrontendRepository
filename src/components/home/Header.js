import React from "react";

const Header = ({ onLoginClick }) => {
    return (
        <header>
            <div className="logo">SchoolHub</div>
            <nav>
                <a href="#">Про сайт</a>
                <a href="#">Можливості</a>
                <a href="#">FAQ</a>
            </nav>
            <button className="login-btn" onClick={onLoginClick}>
                Увійти
            </button>
        </header>
    );
};

export default Header;
