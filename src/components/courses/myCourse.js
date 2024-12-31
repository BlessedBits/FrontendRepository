import React, { useState, useEffect } from 'react';
import style from './myCourse.module.css'

function CourseList({ user_id }) {
    const [courselist, setCourseList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    
        if (loading) {
            return <p>Завантаження даних...</p>;
        }

        if (error) {
            //return <p>{error}</p>;
            return (
                <div className={style.courses}>
                  <h1 className={style.title}>Мої курси:</h1>
                  <div className={style.list}>
                    <div className={style.item}>
                      <svg className={style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 0l8 12h-16z" />
                      </svg>
                      Біологія 4 клас
                    </div>
                    <div className={style.item}>
                      <svg className={style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 0l8 12h-16z" />
                      </svg>
                      Біологія 4-А клас
                    </div>
                    <div className={style.item}>
                      <svg className={style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 0l8 12h-16z" />
                      </svg>
                      Біологія 4-B клас
                    </div>
                    <div className={style.item}>
                      <svg className={style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 0l8 12h-16z" />
                      </svg>
                      Біологія 4-C клас
                    </div>
                  </div>
                  <div className={style.actions}>
                    <button className={style.button}>Створити новий курс</button>
                    <button className={style.button}>Видалити вже існуючий</button>
                  </div>
                </div>
              );
            }

        if (!user_id) {
            return <p>Дані про курси не знайдено.</p>;
        }

        return (
            <div className={style.courses}>
              <h1 className={style.title}>Мої курси:</h1>
              <div className={style.list}>
                <div className={style.item}>
                  <svg className={style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 0l8 12h-16z" />
                  </svg>
                  Біологія 4 клас
                </div>
                <div className={style.item}>
                  <svg className={style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 0l8 12h-16z" />
                  </svg>
                  Біологія 4-А клас
                </div>
                <div className={style.item}>
                  <svg className={style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 0l8 12h-16z" />
                  </svg>
                  Біологія 4-B клас
                </div>
                <div className={style.item}>
                  <svg className={style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 0l8 12h-16z" />
                  </svg>
                  Біологія 4-C клас
                </div>
              </div>
              <div className={style.actions}>
                <button className={style.button}>Створити новий курс</button>
                <button className={style.button}>Видалити вже існуючий</button>
              </div>
            </div>
          );
}

export default CourseList;