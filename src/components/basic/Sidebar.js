import { useState, React } from "react";
import "./Sidebar.css";

const Sidebar = ({ role }) => {
    const [isOpen, setIsOpen] = useState(false);
    const currentPath = window.location.pathname;

    // Функція вибору меню за роллю
    const getSidebarData = (role) => {
        const roleMenus = {
            STUDENT: [
                { label: "Профіль", icon: "👤", link: `/profile/` },
                { label: "Школа", icon: "🏫", link: `/school/` },
                { label: "Новини", icon: "📰", link: `/school-news/` },
                { label: "Щоденник", icon: "📒", link: `/diary/` },
                { label: "Розклад", icon: "📅", link: `/schedule/` },
                { label: "Оцінки", icon: "💯", link: `/marks/` },
                { label: "Звіти", icon: "📋", link: `/reports/` },
                { label: "Повідомлення", icon: "✉️", link: `/messages/` },
                { label: "Курси", icon: "📚", link: `/courses/` },
                { label: "Вихід", icon: "🚪", link: "/logout" },
            ],
            TEACHER: [
                { label: "Профіль", icon: "👤", link: `/profile/` },
                { label: "Школа", icon: "🏫", link: `/school/` },
                { label: "Новини", icon: "📰", link: `/school-news/` },
                { label: "Журнал", icon: "📒", link: `/journal/` },
                { label: "Розклад", icon: "📅", link: `/schedule/` },
                { label: "Звіти", icon: "📋", link: `/reports/` },
                { label: "Повідомлення", icon: "✉️", link: `/messages/` },
                { label: "Курси", icon: "📚", link: `/courses/` },
                { label: "Вихід", icon: "🚪", link: "/logout" },
            ],
            SCHOOL_ADMIN: [
                { label: "Профіль", icon: "👤", link: `/profile/` },
                { label: "Школа", icon: "🏫", link: `/school/` },
                { label: "Новини", icon: "📰", link: `/school-news/` },
                { label: "Розклад", icon: "📅", link: `/schedule/` },
                { label: "Журнали школи", icon: "📒", link: `/journal/` },
                {
                    label: "Адмін панель школи",
                    icon: "⚙️",
                    link: `/sch-admin-panel/`,
                },
                { label: "Звіти", icon: "📋", link: `/reports/` },
                { label: "Повідомлення", icon: "✉️", link: `/messages/` },
                { label: "Курси", icon: "📚", link: `/courses/` },
                { label: "Вихід", icon: "🚪", link: "/logout" },
            ],
            PLATFORM_ADMIN: [
                { label: "Профіль", icon: "👤", link: `/profile/` },
                { label: "Адмін панель", icon: "⚙️", link: "/admin-panel/" },
                { label: "Вихід", icon: "🚪", link: "/logout" },
            ],
        };
        return roleMenus[role] || [];
    };

    const menu = getSidebarData(role);

    return (
        <>
            <button
                className={`menu-button ${isOpen ? "open" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                ☰
            </button>

            {/* Сайдбар */}
            <nav className={`sidebar ${isOpen ? "open" : ""}`}>
                <div className="sidebar-logo">
                    <h2>
                        <img
                            src={`/weblogo.png`}
                            alt="weblogo"
                            className="icon"
                        />
                        <span className="schoolText">School</span>
                        <span className="hubText">Hub</span>
                    </h2>
                </div>
                <ul>
                    {menu.map((item, index) => (
                        <li key={index}>
                            <a
                                href={item.link || "#"}
                                aria-label={item.label}
                                className={
                                    currentPath === item.link ? "active" : ""
                                }
                            >
                                <span aria-hidden="true">
                                    {item.icon || ""}
                                </span>
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default Sidebar;
