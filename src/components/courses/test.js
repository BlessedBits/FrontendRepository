import React, { useState, useEffect } from 'react';
import style from './myCourse.module.css';

function CourseList({ user_id }) {
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    useEffect(() => {
        async function fetchCourseList() {
        try {
            const response = await fetch(`/api/users/${user_id}/courses`);
            if (!response.ok) {
            throw new Error('Не вдалося отримати дані про курси');
            }
            const data = await response.json();
            setCourseList(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        }

        fetchCourseList();
    }, [user_id]);

    const toggleCourse = (id) => {
        setSelectedCourseId((prev) => (prev === id ? null : id));
    };

    if (loading) {
        return <p>Завантаження даних...</p>;
    }

    if (error) {
        const courses = [
            { id: 1, name: 'Біологія 4 клас', themes: ['Тема 1: Клітини', 'Тема 2: Органи', 'Тема 3: Екосистеми'] },
            { id: 2, name: 'Біологія 4-А клас', themes: ['Тема 1: Мікроорганізми', 'Тема 2: Тварини', 'Тема 3: Рослини'] },
            { id: 3, name: 'Біологія 4-B клас', themes: ['Тема 1: Анатомія людини', 'Тема 2: Біосфера', 'Тема 3: Генетика'] },
            { id: 4, name: 'Біологія 4-C клас', themes: ['Тема 1: Клімат', 'Тема 2: Водні ресурси', 'Тема 3: Енергія'] },
          ];
            return (
              <div className={style.courses}>
                <h1 className={style.title}>Мої курси:</h1>
                <div className={style.list}>
                  {courses.map((course) => (
                    <div key={course.id} className={style.courseItem}>
                      <div className={style.item} onClick={() => toggleCourse(course.id)}>
                        <svg
                          className={`${style.icon} ${selectedCourseId === course.id ? style.iconDown : ''}`}
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
                            {course.themes.map((theme, index) => (
                              <li key={index} className={style.themeItem}>
                                {theme}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className={style.actions}>
                  <button className={style.button}>Створити новий курс</button>
                  <button className={style.button}>Видалити вже існуючий</button>
                </div>
              </div>
            );
    }

    if (courseList.length === 0) {
        return <p>Курси не знайдено.</p>;
    }

    return (
        <div className={style.courses}>
        <h1 className={style.title}>Мої курси:</h1>
        <div className={style.list}>
            {courseList.map((course) => (
            <div key={course.id} className={style.courseItem}>
                <div className={style.item} onClick={() => toggleCourse(course.id)}>
                <svg
                    className={`${style.icon} ${selectedCourseId === course.id ? style.iconDown : ''}`}
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
                    {course.themes.map((theme, index) => (
                        <li key={index} className={style.themeItem}>
                        {theme}
                        </li>
                    ))}
                    </ul>
                </div>
                )}
            </div>
            ))}
        </div>
        <div className={style.actions}>
            <button className={style.button}>Створити новий курс</button>
            <button className={style.button}>Видалити вже існуючий</button>
        </div>
        </div>
    );
    }

export default CourseList;
