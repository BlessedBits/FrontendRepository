import React from 'react';
import './Sidebar.css';

const Sidebar = ({ menu }) => {
    // Отримання поточного шляху
    const currentPath = window.location.pathname;

    return (
        <nav className="sidebar">
            {/* Логотип */}
            <div className="sidebar-logo">
                <h2>
                    <img src={`/weblogo.png`} alt="weblogo" className="icon" />
                    <span>SchoolHub</span>
                </h2>
            </div>
            <ul>
                {menu.map((item, index) => (
                    <li key={index}>
                        <a
                            href={item.link || '#'}
                            aria-label={item.label}
                            className={currentPath === item.link ? 'active' : ''}
                        >
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
            { label: 'Профіль', icon: '👤', link: `/my-profile/` },
            { label: 'Школа', icon: '🏫', link: `/school/` },
            { label: 'Новини', icon: '📰', link: `/school-news/` },
            { label: 'Щоденник', icon: '📒', link: `/my-diary/` },
            { label: 'Розклад', icon: '📅', link: `/my-schedule/` },
            { label: 'Оцінки {Прикол}', icon: '💯', link: `/marks/` },
            { label: 'Звіти', icon: '📋', link: `/reports/` },
            { label: 'Повідомлення', icon: '✉️', link: `/messages/` },
            { label: 'Курси', icon: '📚', link: `/mycourses/` },
            { label: 'Вихід', icon: '🚪', link: '/logout' },
        ],
    };
};
export default Sidebar;
