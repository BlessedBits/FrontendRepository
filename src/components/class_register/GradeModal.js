import React from "react";
import styles from "./GradeModal.module.css";

const GradeModal = ({ onSelect, onClose, position }) => {
  const grades = [
    { value: "H", label: "H", color: "#7986CB" }, // Синій для відсутніх
    { value: "1", label: "1", color: "#FF5252" },
    { value: "2", label: "2", color: "#FF5252" },
    { value: "3", label: "3", color: "#FF8A65" },
    { value: "4", label: "4", color: "#FF8A65" },
    { value: "5", label: "5", color: "#FFB74D" },
    { value: "6", label: "6", color: "#FFB74D" },
    { value: "7", label: "7", color: "#FFF176" },
    { value: "8", label: "8", color: "#FFF176" },
    { value: "9", label: "9", color: "#AED581" },
    { value: "10", label: "10", color: "#AED581" },
    { value: "11", label: "11", color: "#81C784" },
    { value: "12", label: "12", color: "#81C784" },
  ];

  return (
    <>
      <div className={styles.modalOverlay} onClick={onClose} />
      <div
        className={styles.modal}
        style={{
          top: position.y,
          left: position.x,
        }}
      >
        <div className={styles.gradeGrid}>
          {grades.map((grade) => (
            <button
              key={grade.value}
              className={styles.gradeButton}
              style={{ backgroundColor: grade.color }}
              onClick={() => onSelect(grade.value)}
            >
              {grade.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default GradeModal;
