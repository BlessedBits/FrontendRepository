import React, { useState } from "react";
import styles from "../class_register/FiltersComponent.module.css";

const FiltersComponent = () => {
    const [selectedSemester, setSelectedSemester] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedClass, setSelectedClass] = useState("");

    const semesters = ["Семестр 1", "Семестр 2"];
    const months = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
    const classes = ["Клас 1", "Клас 2", "Клас 3"];

    return (
        <section id="filterComponent" className={styles.filtersComponent}>
            <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className={styles.customSelect}
            >
                <option value="">{selectedSemester ? `Семестр: ${selectedSemester}` : "Семестр:"}</option>
                {semesters.map((semester, index) => (
                    <option key={index} value={semester}>
                        {semester}
                    </option>
                ))}
            </select>

            <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className={styles.customSelect}
            >
                <option value="">{selectedMonth ? `Місяць: ${selectedMonth}` : "Місяць:"}</option>
                {months.map((month, index) => (
                    <option key={index} value={month}>
                        {month}
                    </option>
                ))}
            </select>

            <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className={styles.customSelect}
            >
                <option value="">{selectedClass ? `Клас: ${selectedClass}` : "Клас:"}</option>
                {classes.map((cls, index) => (
                    <option key={index} value={cls}>
                        {cls}
                    </option>
                ))}
            </select>

        </section>
    );
};

export default FiltersComponent;