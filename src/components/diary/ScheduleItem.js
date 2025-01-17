import React from "react";

const ScheduleItem = ({ item }) => {
  return (
    <div className="schedule-item">
        <section className="time">{item.time}</section>
        <section className="colunum2">
            <div className="subject">{item.subject}</div>
            <div className="location">{item.location}</div>
        </section>
        <section className="colunum3">
            <div className="details">{item.details}</div>
            <div className="homework">{item.homework}</div>
        </section>
    </div>
  );
};

export default ScheduleItem;
