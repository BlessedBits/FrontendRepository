import React from "react";

const SubgroupSelector = ({ options, selectedSubgroup, onChange }) => {
  return (
    <select
      className="subgroup-selector"
      value={selectedSubgroup}
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

export default SubgroupSelector;
