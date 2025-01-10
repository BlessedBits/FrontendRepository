import React from "react";
import "./Schedule.css"; // Import your CSS for custom styles

const timetableData = [
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
  {
    time: { start: "10:20", end: "11:05" },
    monday: { subject: "Інформатика", teacher: "Ткаченко Н. І.", room: "105 каб." },
    tuesday: { subject: "Хімія", teacher: "Петренко Д. К.", room: "401 каб." },
    wednesday: { subject: "Геометрія", teacher: "Іваненко О. П.", room: "210 каб." },
    thursday: { subject: "Історія", teacher: "Коваленко Л. С.", room: "303 каб." },
    friday: { subject: "Біологія", teacher: "Шевченко М. В.", room: "144 каб." },
    saturday: { subject: "Фізика", teacher: "Гончаренко П. І.", room: "312 каб." },
  },
];

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

function Schedule(user_id) {
  const includeSaturday = timetableData.some((row) => row.saturday);

  return (
    <div className="app">
      <div className="timetable-container">
        <table className="timetable">
          <thead>
            <tr>
              <th>Урок</th>
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
