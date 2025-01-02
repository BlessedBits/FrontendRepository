import React, { useState, useEffect } from "react";
import style from "./CourseList.module.css";
import CourseItem from "./CourseItem";
import NewCourseModal from "./NewCourseModal";
import buttonStyles from "./Buttons.module.css";

function CourseList({ user_id, isTeacher }) {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedThemeId, setSelectedThemeId] = useState(null);
  const [editThemeId, setEditThemeId] = useState(null);
  const [themeEditData, setThemeEditData] = useState({
    name: "",
    description: "",
    homework: "",
    links: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        if (!response.ok) throw new Error("Не вдалося отримати дані про курси");
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

  if (loading) return <p>Завантаження даних...</p>;

  return (
    <div className={style.courses}>
      <h1 className={style.title}>Мої курси:</h1>
      <div className={style.list}>
        {courseList.map((course) => (
          <CourseItem
            key={course.id}
            course={course}
            isTeacher={isTeacher}
            selectedCourseId={selectedCourseId}
            selectedThemeId={selectedThemeId}
            editThemeId={editThemeId}
            themeEditData={themeEditData}
            setSelectedCourseId={setSelectedCourseId}
            setSelectedThemeId={setSelectedThemeId}
            setEditThemeId={setEditThemeId}
            setThemeEditData={setThemeEditData}
            setCourseList={setCourseList}
          />
        ))}
      </div>
      {isTeacher && (
        <button className={buttonStyles.button} onClick={() => setIsModalOpen(true)}>
          Додати курс
        </button>
      )}

      {isModalOpen && (
        <NewCourseModal
          onClose={() => setIsModalOpen(false)}
          onAddCourse={(newCourse) =>
            setCourseList((prev) => [...prev, newCourse])
          }
        />
      )}
    </div>
  );
}

export default CourseList;
