import React from "react";
import style from "./CourseItem.module.css";
import buttonStyles from "./Buttons.module.css";
import ThemeItem from "./ThemeItem";

function CourseItem({
  course,
  isTeacher,
  selectedCourseId,
  selectedThemeId,
  editThemeId,
  themeEditData,
  setSelectedCourseId,
  setSelectedThemeId,
  setEditThemeId,
  setThemeEditData,
  setCourseList,
}) {
  const toggleCourse = (id) => {
    setSelectedCourseId((prev) => (prev === id ? null : id));
    setSelectedThemeId(null);
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Ви впевнені, що хочете видалити цей курс?")) return;

    try {
      const response = await fetch(`/api/courses/${courseId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Не вдалося видалити курс");

      setCourseList((prev) => prev.filter((course) => course.id !== courseId));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={style.courseItem}>
      <div className={style.item} onClick={() => toggleCourse(course.id)}>
        <svg
            className={`${style.icon} ${
            selectedCourseId === course.id ? style.iconDown : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M12 0l8 12h-16z" />
        </svg>
        {course.name}
      </div>
      {selectedCourseId === course.id && (
        <div className={style.themes}>
          <h3 className={style.themesTitle}>Теми:</h3>
          <ul className={style.themesList}>
            {course.themes.map((theme) => (
              <ThemeItem
                key={theme.id}
                theme={theme}
                courseId={course.id}
                isTeacher={isTeacher}
                selectedThemeId={selectedThemeId}
                editThemeId={editThemeId}
                themeEditData={themeEditData}
                setSelectedThemeId={setSelectedThemeId}
                setEditThemeId={setEditThemeId}
                setThemeEditData={setThemeEditData}
                setCourseList={setCourseList}
              />
            ))}
          </ul>
          {isTeacher && (
            <button
              className={buttonStyles.deleteButton}
              onClick={() => handleDeleteCourse(course.id)}
            >
              Видалити курс
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default CourseItem;
