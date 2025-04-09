import React from "react";
import styles from "./FiltersComponent.module.css";
import { useClassRegister } from "../../context/ClassRegisterContext";

const FiltersComponent = () => {
  const {
    selectedSemester,
    setSelectedSemester,
    selectedMonth,
    setSelectedMonth,
    selectedClass,
    setSelectedClass,
    months,
  } = useClassRegister();

  const semesters = ["Семестр 1", "Семестр 2"];
  const classes = ["Клас 1", "Клас 2", "Клас 3"];

  return (
    <section id="filterComponent" className={styles.filtersComponent}>
      <div className={styles.filterGroup}>
        <label htmlFor="semester">Семестр</label>
        <select
          id="semester"
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          className={styles.customSelect}
        >
          <option value="">Всі семестри</option>
          {semesters.map((semester, index) => (
            <option key={index} value={semester}>
              {semester}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="month">Місяць</label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className={styles.customSelect}
        >
          <option value="">Всі місяці</option>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="class">Клас</label>
        <select
          id="class"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className={styles.customSelect}
        >
          <option value="">Всі класи</option>
          {classes.map((cls, index) => (
            <option key={index} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default FiltersComponent;
