import React from 'react';
import './Sidebar.css';


const Sidebar = ({ menu }) => {
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

export const StudentSidebarData = () => {
    return {
      menu: [
        { label: 'Профіль', icon: '👤', link: '#' },
        { label: 'Школа', icon: '🏫', link: '/school' },
        { label: 'Новини', icon: '📰', link: '#' },
        { label: 'Щоденник', icon: '📒', link: '#' },
        { label: 'Розклад', icon: '📅', link: '#' },
        { label: 'Повідомлення', icon: '✉️', link: '#' },
        { label: 'Курси', icon: '📚', link: '#' },
        { label: 'Вихід', icon: '🚪', link: '#' },
      ],
    };
  };

export default Sidebar;
