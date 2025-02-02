import React, { useState } from "react";
import style from "./NewCourseModal.module.css";
import { createCourse } from "../../api/course";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Notification from "../basic/Notification"; 

function NewCourseModal({ onClose, onAddCourse }) {
  const [courseData, setCourseData] = useState({
    name: "",
  });
  const [notification, setNotification] = useState(null); 
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCourse = {
      name: courseData.name,
    };

    try {
      await createCourse(newCourse.name, axiosPrivate);
      
      setNotification({ type: "success", text: "Курс успішно створено!" });
      
      setTimeout(() => {
        onClose();
      }, 1500);

    } catch (err) {
      if (err.message === "Network Error") {
        setNotification({ type: "error", text: "У вас немає доступу до цієї функції" });
      } 
      else {
        setNotification({ type: "error", text: "Щось пішло не так, спробуйте пізніше" });
      }
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <Notification message={notification?.text} type={notification?.type} />

        <h3>Додати новий курс</h3>
        <form onSubmit={handleSubmit} className={style.form}>
          <input
            className={style.input}
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