import React from "react";
import style from "./EditThemeForm.module.css";

function EditThemeForm({
  courseId,
  theme,
  themeEditData,
  setEditThemeId,
  setThemeEditData,
  setCourseList,
}) {
  const saveEditedTheme = async () => {
    const updatedTheme = {
      ...themeEditData,
      links: themeEditData.links.split(",").map((link) => link.trim()),
    };

    try {
      const response = await fetch(`/api/courses/${courseId}/themes/${theme.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTheme),
      });

      if (!response.ok) throw new Error("Не вдалося оновити тему");

      setCourseList((prev) =>
        prev.map((course) =>
          course.id === courseId
            ? {
                ...course,
                themes: course.themes.map((t) =>
                  t.id === theme.id ? { ...t, ...updatedTheme } : t
                ),
              }
            : course
        )
      );
      setEditThemeId(null);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={style.editForm}>
      <input
        type="text"
        value={themeEditData.name}
        onChange={(e) =>
          setThemeEditData((prev) => ({ ...prev, name: e.target.value }))
        }
        placeholder="Назва теми"
      />
      <textarea
        value={themeEditData.description}
        onChange={(e) =>
          setThemeEditData((prev) => ({ ...prev, description: e.target.value }))
        }
        placeholder="Опис"
      />
      <textarea
        value={themeEditData.homework}
        onChange={(e) =>
          setThemeEditData((prev) => ({ ...prev, homework: e.target.value }))
        }
        placeholder="Домашнє завдання"
      />
      <input
        type="text"
        value={themeEditData.links}
        onChange={(e) =>
          setThemeEditData((prev) => ({ ...prev, links: e.target.value }))
        }
        placeholder="Посилання (через кому)"
      />
      <button className={style.saveButton} onClick={saveEditedTheme}>
        Зберегти
      </button>
      <button className={style.cancelButton} onClick={() => setEditThemeId(null)}>
        Скасувати
      </button>
    </div>
  );
}

export default EditThemeForm;
