import React, { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { createSchedule } from "../../api/schedule";
import Notification from "../basic/Notification";

function CreateSchedule() {
  const axiosPrivate = useAxiosPrivate();
  const [notification, setNotification] = useState(null);

  const classIds = [152, 153, 154]; // ID класів
  const scheduleTemplate = [
    {
      courseId: 110,
      dayOfWeek: "Monday",
      startTime: "08:30",
      endTime: "09:15",
      roomNumber: "101",
    },
    {
      courseId: 110,
      dayOfWeek: "Tuesday",
      startTime: "09:25",
      endTime: "10:10",
      roomNumber: "102",
    },
    {
      courseId: 109,
      dayOfWeek: "Wednesday",
      startTime: "10:20",
      endTime: "11:05",
      roomNumber: "103",
    },
  ];

  const handleCreateSchedules = async () => {
    try {
      setNotification({ type: "loading", message: "Створення розкладу..." });

      // Створюємо розклад для кожного класу
      for (const classId of classIds) {
        for (const schedule of scheduleTemplate) {
          await createSchedule(
            { classId, ...schedule },
            axiosPrivate
          );
        }
      }

      setNotification({ type: "success", message: "Розклад створено успішно!" });
    } catch (err) {
      console.error("Помилка створення розкладу:", err);
      setNotification({ type: "error", message: "Не вдалося створити розклад." });
    } finally {
      // Автоматичне очищення повідомлення через 3 секунди
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div>
      <Notification message={notification?.message} type={notification?.type} />
      <button onClick={handleCreateSchedules}>Створити розклад для класів 152, 153, 154</button>
    </div>
  );
}

export default CreateSchedule;
