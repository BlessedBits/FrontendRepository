import React, { useState } from "react";
import style from "./NewCourseModal.module.css";
import { createCourse } from "../misc/CourseApi"; 

function NewCourseModal({ onClose, onAddCourse }) {
  const [courseData, setCourseData] = useState({
    name: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCourse = {
      name: courseData.name,
    };

    try {
      const response = await createCourse(newCourse.name); 
      onAddCourse(response); 
      onClose(); 
    } catch (err) {
      console.error(err.message); 
    }
  };

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <h3>Додати новий курс</h3>
        <form onSubmit={handleSubmit} className={style.form}>
          <input className={style.input}
            type="text"
            placeholder="Назва курсу"
            value={courseData.name}
            onChange={(e) =>
              setCourseData((prev) => ({ ...prev, name: e.target.value }))
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
