import React, { useState } from "react";
import WeekSelector from "./WeekSelector";
import SubgroupSelector from "./SubgroupSelector";
import DaySchedule from "./DaySchedule";
import "./DiaryPage.css";

const TestDiaryPage = () => { 
  const [selectedWeek, setSelectedWeek] = useState("30 грудня - 5 січня");
  const [selectedSubgroup, setSelectedSubgroup] = useState("підгрупа 1");

  const weekOptions = ["30 грудня - 5 січня", "6 січня - 12 січня"];
  const subgroupOptions = ["підгрупа 1", "підгрупа 2"];

  const scheduleData = [
    {
      day: "понеділок, 30 грудня",
      items: [
        {
          time: "8:30 - 9:15",
          subject: "Біологія",
          location: "155 кабінет",
          details: "Поточна: Тема 10 Курс білків",
          homework: "Домашка: Тема 10 Курс собак",
        },
        {
            time: "10:30 - 11:15",
            subject: "Математика",
            location: "655 кабінет",
            details: "Поточна: Тема 10 Курс білків",
            homework: "Домашка: Тема 10 Курс собак",
          },
      ],
    },
    {
        day: "вівторок, 31 грудня",
        items: [
          {
            time: "8:30 - 9:15",
            subject: "Біологія",
            location: "155 кабінет",
            details: "Поточна: Тема 10 Курс білків",
            homework: "Домашка: Тема 10 Курс собак",
          },
          {
              time: "10:30 - 11:15",
              subject: "Математика",
              location: "655 кабінет",
              details: "Поточна: Тема 10 Курс білків",
              homework: "Домашка: Тема 10 Курс собак",
            },
        ],
    },
  ];

  return (
    <div className="diary-page">
      <div className="selectors">
        <WeekSelector
          options={weekOptions}
          selectedWeek={selectedWeek}
          onChange={setSelectedWeek}
        />
        <SubgroupSelector
          options={subgroupOptions}
          selectedSubgroup={selectedSubgroup}
          onChange={setSelectedSubgroup}
        />
      </div>
      <div className="schedule">
        {scheduleData.map((dayData, index) => (
          <DaySchedule key={index} dayData={dayData} />
        ))}
      </div>
    </div>
  );
};

export default TestDiaryPage; 
