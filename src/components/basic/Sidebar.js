import React from 'react';
import './Sidebar.css';


const Sidebar = ({ logo, title, menu }) => {
    return (
        <nav className="sidebar">
            {/* Логотип */}
            <div className="sidebar-logo">
                <a href={logo.link || '#'}>
                    <img src={logo.src || 'default-logo.jpg'} alt={logo.alt || 'Logo'} />
                    <span>{logo.text || 'Logo'}</span>
                </a>
            </div>

            {/* Меню */}
            <ul>
                {menu.map((item, index) => (
                    <li key={index}>
                        <a href={item.link || '#'} aria-label={item.label}>
                            <i aria-hidden="true">{item.icon || ''}</i>
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Sidebar;
