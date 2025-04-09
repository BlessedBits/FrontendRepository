import React, { createContext, useContext, useState, useCallback } from "react";

const ClassRegisterContext = createContext();

const months = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

export const ClassRegisterProvider = ({ children }) => {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([
    { id: 1, name: "Учень 1" },
    { id: 2, name: "Учень 2" },
    { id: 3, name: "Учень 3" },
  ]);
  const [grades, setGrades] = useState([]);

  const addGrade = useCallback((studentId, date, grade) => {
    setGrades((prev) => [...prev, { studentId, date, grade }]);
  }, []);

  const updateGrade = useCallback((studentId, date, newGrade) => {
    setGrades((prev) =>
      prev.map((grade) =>
        grade.studentId === studentId && grade.date === date
          ? { ...grade, grade: newGrade }
          : grade
      )
    );
  }, []);

  const deleteGrade = useCallback((studentId, date) => {
    setGrades((prev) =>
      prev.filter(
        (grade) => !(grade.studentId === studentId && grade.date === date)
      )
    );
  }, []);

  const addStudent = useCallback((name) => {
    setStudents((prev) => [...prev, { id: Date.now(), name }]);
  }, []);

  const getFilteredGrades = useCallback(() => {
    return grades.filter((grade) => {
      const gradeDate = new Date(grade.date);
      const monthMatch =
        !selectedMonth || months[gradeDate.getMonth()] === selectedMonth;
      const semesterMatch =
        !selectedSemester ||
        (selectedSemester === "Семестр 1"
          ? gradeDate.getMonth() < 6
          : gradeDate.getMonth() >= 6);
      return monthMatch && semesterMatch;
    });
  }, [selectedMonth, selectedSemester, grades]);

  return (
    <ClassRegisterContext.Provider
      value={{
        selectedSemester,
        setSelectedSemester,
        selectedMonth,
        setSelectedMonth,
        selectedClass,
        setSelectedClass,
        students,
        grades: getFilteredGrades(),
        addGrade,
        updateGrade,
        deleteGrade,
        addStudent,
        months,
      }}
    >
      {children}
    </ClassRegisterContext.Provider>
  );
};

export const useClassRegister = () => {
  const context = useContext(ClassRegisterContext);
  if (!context) {
    throw new Error(
      "useClassRegister must be used within a ClassRegisterProvider"
    );
  }
  return context;
};
