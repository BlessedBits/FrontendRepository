import React, { useState, useEffect } from "react";
import style from "./myCourse.module.css";

function CourseList({ user_id, isTeacher }) {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedThemeId, setSelectedThemeId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newCourseName, setNewCourseName] = useState("");
  const [editThemeId, setEditThemeId] = useState(null);
  const [themeEditData, setThemeEditData] = useState({
    name: "",
    description: "",
    homework: "",
    links: "",
  });

  isTeacher = true; // Тимчасово для тестування
  const testCourses = [
    {
      id: 1,
      name: "Біологія 4 клас",
      themes: [
        {
          id: 101,
          name: "Тема 1: Клітини",
          description: "Опис теми про клітини.",
          homework: "Прочитати параграф 3, зробити завдання №2.",
          links: ["https://example.com/cells"],
        },
        {
          id: 102,
          name: "Тема 2: Органи",
          description: "Опис теми про органи.",
          homework: "Скласти таблицю органів людини.",
          links: ["https://example.com/organs"],
        },
      ],
    },
    {
      id: 2,
      name: "Біологія 5 клас",
      themes: [
        {
          id: 201,
          name: "Тема 1: Клітини",
          description: "Опис теми про клітини.",
          homework: "Прочитати параграф 3, зробити завдання №2.",
          links: ["https://example.com/cells"],
        },
        {
          id: 202,
          name: "Тема 2: Органи",
          description: "Опис теми про органи.",
          homework: "Скласти таблицю органів людини.",
          links: ["https://example.com/organs"],
        },
      ],
    },
  ];

  useEffect(() => {
    async function fetchCourseList() {
      try {
        const response = await fetch(`/api/users/${user_id}/courses`);
        if (!response.ok) {
          throw new Error("Не вдалося отримати дані про курси");
        }
        const data = await response.json();
        setCourseList(data);
      } catch (err) {
        setError(err.message);
        setCourseList(testCourses); 
      } finally {
        setLoading(false);
      }
    }

    fetchCourseList();
  }, [user_id]);

  const toggleCourse = (id) => {
    setSelectedCourseId((prev) => (prev === id ? null : id));
    setSelectedThemeId(null);
  };

  const toggleTheme = (themeId) => {
    setSelectedThemeId((prev) => (prev === themeId ? null : themeId));
  };

  const handleCreateCourse = () => {
    const newCourse = {
      id: Math.max(...courseList.map((course) => course.id)) + 1,
      name: newCourseName,
      themes: [],
    };
    setCourseList((prev) => [...prev, newCourse]);
    setShowModal(false);
    setNewCourseName("");
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Ви впевнені, що хочете видалити цей курс?")) return;

    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Не вдалося видалити курс");
      }

      setCourseList((prev) => prev.filter((course) => course.id !== courseId));
    } catch (err) {
      setError(err.message);
    }
  };

  const startEditingTheme = (theme) => {
    setEditThemeId(theme.id);
    setThemeEditData({
      name: theme.name,
      description: theme.description,
      homework: theme.homework,
      links: theme.links.join(", "),
    });
  };

  const saveEditedTheme = async (courseId) => {
    const updatedTheme = {
      ...themeEditData,
      links: themeEditData.links.split(",").map((link) => link.trim()),
    };

    try {
      const response = await fetch(`/api/courses/${courseId}/themes/${editThemeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTheme),
      });

      if (!response.ok) {
        throw new Error("Не вдалося оновити тему");
      }

      setCourseList((prev) =>
        prev.map((course) =>
          course.id === courseId
            ? {
                ...course,
                themes: course.themes.map((theme) =>
                  theme.id === editThemeId ? { ...theme, ...updatedTheme } : theme
                ),
              }
            : course
        )
      );

      setEditThemeId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Завантаження даних...</p>;

  return (
    <div className={style.courses}>
      <h1 className={style.title}>Мої курси:</h1>
      <div className={style.list}>
        {courseList.map((course) => (
          <div key={course.id} className={style.courseItem}>
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
                    <li
                    key={theme.id}
                    className={`${style.themeItem} ${selectedThemeId === theme.id ? style.selected : ""}`}
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
                          <div className={style.editForm}>
                            <input
                              type="text"
                              value={themeEditData.name}
                              onChange={(e) =>
                                setThemeEditData((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                              placeholder="Назва теми"
                            />
                            <textarea
                              value={themeEditData.description}
                              onChange={(e) =>
                                setThemeEditData((prev) => ({
                                  ...prev,
                                  description: e.target.value,
                                }))
                              }
                              placeholder="Опис"
                            />
                            <textarea
                              value={themeEditData.homework}
                              onChange={(e) =>
                                setThemeEditData((prev) => ({
                                  ...prev,
                                  homework: e.target.value,
                                }))
                              }
                              placeholder="Домашнє завдання"
                            />
                            <input
                              type="text"
                              value={themeEditData.links}
                              onChange={(e) =>
                                setThemeEditData((prev) => ({
                                  ...prev,
                                  links: e.target.value,
                                }))
                              }
                              placeholder="Посилання (через кому)"
                            />
                            <button
                              className={style.saveButton}
                              onClick={() => saveEditedTheme(course.id)}
                            >
                              Зберегти
                            </button>
                            <button
                              className={style.cancelButton}
                              onClick={() => setEditThemeId(null)}
                            >
                              Скасувати
                            </button>
                          </div>
                        ) : (
                          isTeacher && (
                            <button
                              className={style.editButton}
                              onClick={() => startEditingTheme(theme)}
                            >
                              Редагувати
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </li>
                  
                  ))}
                </ul>
                {isTeacher && (
                  <button
                    className={style.deleteButton}
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    Видалити курс
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {isTeacher && (
        <div className={style.actions}>
          <button
            className={style.button}
            onClick={() => setShowModal(true)}
          >
            Створити новий курс
          </button>
        </div>
      )}

      {showModal && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <h2>Новий курс</h2>
            <input
              type="text"
              value={newCourseName}
              onChange={(e) => setNewCourseName(e.target.value)}
              placeholder="Назва курсу"
              className={style.input}
            />
            <div className={style.modalActions}>
              <button
                className={style.button}
                onClick={handleCreateCourse}
              >
                Створити
              </button>
              <button
                className={style.button}
                onClick={() => setShowModal(false)}
              >
                Скасувати
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseList;
