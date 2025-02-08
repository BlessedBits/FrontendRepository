import React, { useState, useEffect } from "react";
import style from "./NewCourseModal.module.css";
import { createCourse } from "../../api/course";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Notification from "../basic/Notification"; 
import { getUserId } from "../../api/user";

function NewCourseModal({ onClose }) {
  const [courseData, setCourseData] = useState({
    name: "",
  });
  const [userId, setUserId] = useState(null); 
  const [notification, setNotification] = useState(null); 
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    async function fetchUserId() {
      try {
        const id = await getUserId(axiosPrivate);
        setUserId(id);
      } catch (err) {
        console.error("Не вдалося отримати ID користувача:", err.message);
        setNotification({ type: "error", text: "Не вдалося отримати ID користувача." });
      }
    }
    fetchUserId();
  }, [axiosPrivate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setNotification({ type: "error", text: "Не вдалося отримати ID користувача." });
      return;
    }

    setLoading(true);

    const newCourse = {
      teacherId: userId, // Використовуємо ID поточного користувача
      name: courseData.name,
    };

    try {
      await createCourse(newCourse.name, newCourse.teacherId, axiosPrivate);

      setNotification({ type: "success", text: "Курс успішно створено!" });

      // Очищуємо форму
      setCourseData({ name: "" });

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      if (err.message === "Network Error") {
        setNotification({ type: "error", text: "У вас немає доступу до цієї функції" });
      } else {
        setNotification({ type: "error", text: "Щось пішло не так, спробуйте пізніше" });
      }
    } finally {
      setLoading(false);
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
            <button type="submit" className={style.saveButton} disabled={loading}>
              {loading ? "Завантаження..." : "Зберегти"}
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
