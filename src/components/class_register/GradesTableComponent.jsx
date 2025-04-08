import React from "react";
import styles from "../class_register/GradesTableComponent.module.css"

const GradesTableComponent = () => {
    const students = ["Учень 1", "Учень 2", "Учень 3"];
    const dates = ["01.01.2023", "02.01.2023", "03.01.2023"];
    const grades = [
        [5, 4, 3],
        [4, 3, 5],
        [3, 5, 4],
    ];

    return (
        <section id="table" className={styles.tableComponent}>
            <span className={styles.headH1}>Журнал</span>
            <table className={styles.gradesTable}>
                <thead>
                <tr>
                    <th>Учень</th>
                    {dates.map((date, index) => (
                        <th key={index}>{date}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {students.map((student, rowIndex) => (
                    <tr key={rowIndex}>
                        <td>{student}</td>
                        {grades[rowIndex].map((grade, colIndex) => (
                            <td key={colIndex}>{grade}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
};

export default GradesTableComponent;