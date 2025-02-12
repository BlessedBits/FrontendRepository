import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getAllSchedules, getScheduleById } from "../../api/schedule";
import "./Schedule.css";
import TimetableCell from "./TimetableCell";
import { Loading } from "../basic/LoadingAnimation";
import Notification from "../basic/Notification";

function Schedule({ userRole }) {
  const [selectedClass, setSelectedClass] = useState(""); 
  const [classes, setClasses] = useState([]); 
  const [timetableData, setTimetableData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    async function fetchAllSchedules() {
      setLoading(true);
      try {
        const response = await getAllSchedules(axiosPrivate); 
        setClasses(response); 
        if (response.length > 0) {
          setSelectedClass(response[0].id); 
        }
      } catch (err) {
        console.error("Помилка завантаження списку класів:", err);
        setError("Не вдалося завантажити список класів.");
      } finally {
        setLoading(false);
      }
    }
    fetchAllSchedules();
  }, [axiosPrivate]);

  useEffect(() => {
    if (!selectedClass) return;

    async function fetchScheduleById() {
      setLoading(true);
      try {
        const response = await getScheduleById(selectedClass, axiosPrivate);
        setTimetableData(response);
      } catch (err) {
        console.error(`Помилка завантаження розкладу для класу ${selectedClass}:`, err);
        setError("Не вдалося завантажити розклад.");
      } finally {
        setLoading(false);
      }
    }
    fetchScheduleById();
  }, [selectedClass, axiosPrivate]);

  const includeSaturday = timetableData.some((row) => row.saturday);

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!timetableData.length) {
    return <div className="no-data">Розклад для обраного класу відсутній.</div>;
  }

  return (
    <div className="app">
      <div className="class-selector">
        <label htmlFor="class-select">Виберіть клас: </label>
        <select
          id="class-select"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          {classes.map((classItem) => (
            <option key={classItem.id} value={classItem.id}>
              {classItem.name}
            </option>
          ))}
        </select>
      </div>

      <div className="timetable-container">
        <table className="timetable">
          <thead>
            <tr>
              <th></th>
              <th>Понеділок</th>
              <th>Вівторок</th>
              <th>Середа</th>
              <th>Четвер</th>
              <th>П’ятниця</th>
              {includeSaturday && <th>Субота</th>}
            </tr>
          </thead>
          <tbody>
            {timetableData.map((row, index) => (
              <tr key={index}>
                <td>
                  <div>
                    <strong>{index + 1}</strong>
                  </div>
                  <div>
                    {row.time.start} - {row.time.end}
                  </div>
                </td>
                <td><TimetableCell data={row.monday} /></td>
                <td><TimetableCell data={row.tuesday} /></td>
                <td><TimetableCell data={row.wednesday} /></td>
                <td><TimetableCell data={row.thursday} /></td>
                <td><TimetableCell data={row.friday} /></td>
                {includeSaturday && <td><TimetableCell data={row.saturday} /></td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Schedule;
