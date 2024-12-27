import React from 'react';
import './Sidebar.css';

const Sidebar = ({ menu }) => {
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
export const StudentSidebarData = ({ userId, schoolId }) => {
    return {
        menu: [
            { label: 'Профіль', icon: '👤', link: `/my-profile/${userId}` },
            { label: 'Школа', icon: '🏫', link: `/school/${schoolId}` },
            { label: 'Новини', icon: '📰', link: `/school-news/${schoolId}` },
            { label: 'Щоденник', icon: '📒', link: `/my-diary/${userId}` },
            { label: 'Розклад', icon: '📅', link: `/my-schedule/${userId}` },
            { label: 'Повідомлення', icon: '✉️', link: `/messages/${userId}` },
            { label: 'Курси', icon: '📚', link: `/courses/${userId}` },
            { label: 'Вихід', icon: '🚪', link: '/logout' },
        ],
    };
};
export default Sidebar;
