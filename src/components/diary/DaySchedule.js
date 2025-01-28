import React from "react";
import ScheduleItem from "./ScheduleItem";

const DaySchedule = ({ dayData }) => {
  return (
    <div className="day-schedule">
      <h3>{dayData.day}</h3>
      <div className="schedule-items">
        {dayData.items.map((item, index) => (
          <ScheduleItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default DaySchedule;
