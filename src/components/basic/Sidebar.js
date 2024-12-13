import React from 'react';
import './Sidebar.css';


const Sidebar = ({ logo, title, menu }) => {
    return (
            <nav className="sidebar">
                {/* Логотип */}
                <div className="sidebar-logo">
                    <h2>
                        <img src={`/weblogo.png`} alt="YouTube" className="icon" />
                        <span>SchoolHub</span>
                    </h2>
                </div>
            {/* Меню */}
            <ul>
                {menu.map((item, index) => (
                    <li key={index}>
                        <a href={item.link || '#'} aria-label={item.label}>
                            <span aria-hidden="true">{item.icon || ''}</span>
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Sidebar;
