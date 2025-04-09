import React, { useState } from "react";
import styles from "./GradesTableComponent.module.css";
import { useClassRegister } from "../../context/ClassRegisterContext";
import GradeModal from "./GradeModal";

const GradesTableComponent = () => {
  const { students, grades, addGrade, updateGrade, deleteGrade } =
    useClassRegister();
  const [modalInfo, setModalInfo] = useState(null);

  // Get unique dates from grades
  const dates = [...new Set(grades.map((g) => g.date))].sort();

  // Create a matrix of grades for easy rendering
  const gradeMatrix = students.map((student) => {
    const studentGrades = {};
    dates.forEach((date) => {
      const grade = grades.find(
        (g) => g.studentId === student.id && g.date === date
      );
      studentGrades[date] = grade ? grade.grade : null;
    });
    return { student, grades: studentGrades };
  });

  const handleCellClick = (studentId, date, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setModalInfo({
      studentId,
      date,
      position: {
        x: rect.left + rect.width / 2,
        y: rect.top,
      },
    });
  };

  const handleGradeSelect = (grade) => {
    if (modalInfo) {
      if (grade === "H") {
        addGrade(modalInfo.studentId, modalInfo.date, "H");
      } else {
        const numericGrade = parseInt(grade);
        if (!isNaN(numericGrade)) {
          addGrade(modalInfo.studentId, modalInfo.date, numericGrade);
        }
      }
      setModalInfo(null);
    }
  };

  const handleDeleteGrade = (studentId, date, event) => {
    event.stopPropagation();
    if (window.confirm("Ви впевнені, що хочете видалити оцінку?")) {
      deleteGrade(studentId, date);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const getGradeColor = (grade) => {
    if (grade === "H") return "#7986CB";
    const numGrade = parseInt(grade);
    if (numGrade <= 2) return "#FF5252";
    if (numGrade <= 4) return "#FF8A65";
    if (numGrade <= 6) return "#FFB74D";
    if (numGrade <= 8) return "#FFF176";
    if (numGrade <= 10) return "#AED581";
    return "#81C784";
  };

  return (
    <section className={styles.tableComponent}>
      <div className={styles.tableHeader}>
        <h1 className={styles.headH1}>Журнал</h1>
        <button
          className={styles.addDateButton}
          onClick={() => {
            if (!dates.includes(today)) {
              // The date will be added when the first grade is added
            }
          }}
        >
          Додати сьогоднішню дату
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.gradesTable}>
          <thead>
            <tr>
              <th>Учень</th>
              {dates.map((date, index) => (
                <th key={index}>
                  {new Date(date).toLocaleDateString("uk-UA")}
                </th>
              ))}
              {!dates.includes(today) && (
                <th>{new Date(today).toLocaleDateString("uk-UA")}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {gradeMatrix.map(({ student, grades: studentGrades }) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                {dates.map((date, index) => (
                  <td
                    key={index}
                    className={styles.gradeCell}
                    onClick={(e) => handleCellClick(student.id, date, e)}
                  >
                    <div className={styles.gradeCellContent}>
                      {studentGrades[date] && (
                        <>
                          <span
                            style={{
                              color: getGradeColor(studentGrades[date]),
                            }}
                          >
                            {studentGrades[date]}
                          </span>
                          <button
                            className={styles.deleteGrade}
                            onClick={(e) =>
                              handleDeleteGrade(student.id, date, e)
                            }
                          >
                            ×
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                ))}
                {!dates.includes(today) && (
                  <td
                    className={styles.gradeCell}
                    onClick={(e) => handleCellClick(student.id, today, e)}
                  ></td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalInfo && (
        <GradeModal
          position={modalInfo.position}
          onSelect={handleGradeSelect}
          onClose={() => setModalInfo(null)}
        />
      )}
    </section>
  );
};

export default GradesTableComponent;
