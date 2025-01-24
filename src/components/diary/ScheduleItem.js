import React, { useState } from "react";
import HomeWorkModal from "./HomeWorkModal";

const ScheduleItem = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

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
      <section className="colunum4">
        <button className="add-info-button" onClick={openModal}>
          ДЗ
        </button>
      </section>

      {isModalOpen && (
        <HomeWorkModal closeModal={closeModal} />
      )}
    </div>
  );
};

export default ScheduleItem;
