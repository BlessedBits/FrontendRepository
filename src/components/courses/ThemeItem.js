import React from "react";
import style from "./ThemeItem.module.css";
import EditThemeForm from "./EditThemeForm";
import buttonStyles from "./Buttons.module.css";

function ThemeItem({
  theme,
  courseId,
  isTeacher,
  selectedThemeId,
  editThemeId,
  themeEditData,
  setSelectedThemeId,
  setEditThemeId,
  setThemeEditData,
  setCourseList,
}) {
  const toggleTheme = (themeId) => {
    setSelectedThemeId((prev) => (prev === themeId ? null : themeId));
  };

  const startEditingTheme = () => {
    setEditThemeId(theme.id);
    setThemeEditData({
      name: theme.name,
      description: theme.description,
      homework: theme.homework,
      links: theme.links.join(", "),
    });
  };

  return (
    <li
      className={`${style.themeItem} ${
        selectedThemeId === theme.id ? style.selected : ""
      }`}
    >
      <div onClick={() => toggleTheme(theme.id)}>{theme.name}</div>
      {selectedThemeId === theme.id && (
        <div className={style.themeDetails}>
          <p>
            <strong>Опис:</strong> {theme.description}
          </p>
          <p>
            <strong>Домашнє завдання:</strong> {theme.homework}
          </p>
          <p>
            <strong>Посилання:</strong>
            <ul>
              {theme.links.map((link, i) => (
                <li key={i}>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </p>
          {editThemeId === theme.id ? (
            <EditThemeForm
              courseId={courseId}
              theme={theme}
              themeEditData={themeEditData}
              setEditThemeId={setEditThemeId}
              setThemeEditData={setThemeEditData}
              setCourseList={setCourseList}
            />
          ) : (
            isTeacher && (
              <button className={buttonStyles.editButton} onClick={startEditingTheme}>
                Редагувати
              </button>
            )
          )}
        </div>
      )}
    </li>
  );
}

export default ThemeItem;
