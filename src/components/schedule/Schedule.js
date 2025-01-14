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

function Schedule({ defaultClassId }) {
  const [selectedClass, setSelectedClass] = useState("");
  const [classData, setClassData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTimetable() {
      try {
        const response = await fetch("https://api.example.com/timetable");
        if (!response.ok) {
          throw new Error("Failed to fetch timetable");
        }
        const data = await response.json();
        setClassData(data);
        const initialClass =
          defaultClassId && data[defaultClassId] ? defaultClassId : Object.keys(data)[0];
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
  }, [defaultClassId]);

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
                <td>
                  <TimetableCell data={row.monday} />
                </td>
                <td>
                  <TimetableCell data={row.tuesday} />
                </td>
                <td>
                  <TimetableCell data={row.wednesday} />
                </td>
                <td>
                  <TimetableCell data={row.thursday} />
                </td>
                <td>
                  <TimetableCell data={row.friday} />
                </td>
                {includeSaturday && (
                  <td>
                    <TimetableCell data={row.saturday} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Schedule;
