import React, { useState, useEffect } from "react";
import "./Schedule.css"; 

const fallbackData = {
  "10-A": [
    {
      time: { start: "8:30", end: "9:15" },
      monday: { subject: "Біологія", teacher: "Шевченко М. В.", room: "144 каб." },
      tuesday: { subject: "Математика", teacher: "Іваненко О. П.", room: "210 каб." },
      wednesday: { subject: "Історія", teacher: "Коваленко Л. С.", room: "303 каб." },
      thursday: { subject: "Географія", teacher: "Захарченко В. Г.", room: "115 каб." },
      friday: { subject: "Хімія", teacher: "Петренко Д. К.", room: "401 каб." },
      saturday: null,
    },
    {
      time: { start: "9:25", end: "10:10" },
      monday: { subject: "Англійська", teacher: "Мартиненко С. В.", room: "215 каб." },
      tuesday: { subject: "Фізика", teacher: "Гончаренко П. І.", room: "312 каб." },
      wednesday: { subject: "Музика", teacher: "Левченко М. Ю.", room: "104 каб." },
      thursday: { subject: "Література", teacher: "Савченко Г. Л.", room: "208 каб." },
      friday: { subject: "Фізкультура", teacher: "Бондар О. А.", room: "Спортзал" },
      saturday: null,
    },
  ],
  "10-B": [
    {
      time: { start: "8:30", end: "9:15" },
      monday: { subject: "Фізика", teacher: "Гончаренко П. І.", room: "312 каб." },
      tuesday: { subject: "Література", teacher: "Савченко Г. Л.", room: "208 каб." },
      wednesday: { subject: "Математика", teacher: "Іваненко О. П.", room: "210 каб." },
      thursday: { subject: "Географія", teacher: "Захарченко В. Г.", room: "115 каб." },
      friday: { subject: "Біологія", teacher: "Шевченко М. В.", room: "144 каб." },
      saturday: { subject: "Алгебра", teacher: "Шевченко М. В.", room: "146 каб." },
    },
    {
      time: { start: "9:25", end: "10:10" },
      monday: { subject: "Англійська", teacher: "Мартиненко С. В.", room: "215 каб." },
      tuesday: { subject: "Географія", teacher: "Захарченко В. Г.", room: "115 каб." },
      wednesday: { subject: "Історія", teacher: "Коваленко Л. С.", room: "303 каб." },
      thursday: { subject: "Хімія", teacher: "Петренко Д. К.", room: "401 каб." },
      friday: { subject: "Музика", teacher: "Левченко М. Ю.", room: "104 каб." },
      saturday: { subject: "Фізика", teacher: "Гончаренко П. І.", room: "312 каб." },
    },
    {
      time: { start: "10:20", end: "11:05" },
      monday: { subject: "Хімія", teacher: "Петренко Д. К.", room: "401 каб." },
      tuesday: { subject: "Англійська", teacher: "Мартиненко С. В.", room: "215 каб." },
      wednesday: { subject: "Інформатика", teacher: "Ткаченко Н. І.", room: "105 каб." },
      thursday: { subject: "Математика", teacher: "Іваненко О. П.", room: "210 каб." },
      friday: { subject: "Біологія", teacher: "Шевченко М. В.", room: "144 каб." },
      saturday: null,
    },
    {
      time: { start: "11:15", end: "12:00" },
      monday: { subject: "Фізкультура", teacher: "Бондар О. А.", room: "Спортзал" },
      tuesday: { subject: "Музика", teacher: "Левченко М. Ю.", room: "104 каб." },
      wednesday: { subject: "Література", teacher: "Савченко Г. Л.", room: "208 каб." },
      thursday: { subject: "Географія", teacher: "Захарченко В. Г.", room: "115 каб." },
      friday: { subject: "Алгебра", teacher: "Шевченко М. В.", room: "146 каб." },
      saturday: null,
    },
  ],
};


function TimetableCell({ data }) {
  if (!data) return null;
  return (
    <div>
      <div>{data.subject}</div>
      {data.teacher && <div>{data.teacher}</div>}
      {data.room && <div>{data.room}</div>}
    </div>
  );
}

function Schedule({ defaultClassId, apiUrl, userToken }) {
  const [selectedClass, setSelectedClass] = useState("");
  const [classData, setClassData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTimetable() {
      setLoading(true);
      try {
        const response = await fetch(`/schedules/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch schedules: ${response.status}`);
        }

        const data = await response.json();

        const formattedData = transformApiData(data);

        setClassData(formattedData);
        const initialClass =
          defaultClassId && formattedData[defaultClassId]
            ? defaultClassId
            : Object.keys(formattedData)[0];
        setSelectedClass(initialClass);
      } catch (error) {
        console.error("API fetch failed. Using fallback data.", error);
        const initialClass =
          defaultClassId && fallbackData[defaultClassId]
            ? defaultClassId
            : Object.keys(fallbackData)[0];
        setSelectedClass(initialClass);
      } finally {
        setLoading(false);
      }
    }

    fetchTimetable();
  }, [defaultClassId, apiUrl, userToken]);

  const transformApiData = (apiData) => {
    const groupedData = {};
    apiData.forEach((item) => {
      const { classId, dayOfWeek, startTime, endTime, roomNumber, courseId } =
        item;
      if (!groupedData[classId]) groupedData[classId] = [];

      const schedule = groupedData[classId].find(
        (sched) => sched.time.start === startTime && sched.time.end === endTime
      );

      if (!schedule) {
        groupedData[classId].push({
          time: { start: startTime, end: endTime },
          [dayOfWeek.toLowerCase()]: {
            subject: `Course ${courseId}`,
            teacher: "Unknown", 
            room: roomNumber,
          },
        });
      } else {
        schedule[dayOfWeek.toLowerCase()] = {
          subject: `Course ${courseId}`,
          teacher: "Unknown",
          room: roomNumber,
        };
      }
    });
    return groupedData;
  };

  const timetableData = classData[selectedClass] || [];
  const includeSaturday = timetableData.some((row) => row.saturday);

  if (loading) {
    return <div>Loading...</div>;
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
          {Object.keys(classData).map((className) => (
            <option key={className} value={className}>
              {className}
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
