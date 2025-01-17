import React from "react";

const WeekSelector = ({ options, selectedWeek, onChange }) => {
  return (
    <select
      className="week-selector"
      value={selectedWeek}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default WeekSelector;
