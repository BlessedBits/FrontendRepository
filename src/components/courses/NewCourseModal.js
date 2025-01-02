import React, { useState } from "react";
import style from "./NewCourseModal.module.css";

function NewCourseModal({ onClose, onAddCourse }) {
  const [courseData, setCourseData] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCourse = {
      name: courseData.name,
      description: courseData.description,
      themes: [],
    };

    try {
      const response = await fetch(`/api/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });

      if (!response.ok) throw new Error("Не вдалося створити курс");

      const savedCourse = await response.json();
      onAddCourse(savedCourse); // Додаємо новий курс до списку
      onClose(); // Закриваємо модальне вікно
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <h2>Додати новий курс</h2>
        <form onSubmit={handleSubmit} className={style.form}>
          <input
            type="text"
            placeholder="Назва курсу"
            value={courseData.name}
            onChange={(e) =>
              setCourseData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
          <textarea
            placeholder="Опис курсу"
            value={courseData.description}
            onChange={(e) =>
              setCourseData((prev) => ({ ...prev, description: e.target.value }))
            }
            required
          />
          <div className={style.modalActions}>
            <button type="submit" className={style.saveButton}>
              Зберегти
            </button>
            <button
              type="button"
              className={style.cancelButton}
              onClick={onClose}
            >
              Скасувати
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewCourseModal;
