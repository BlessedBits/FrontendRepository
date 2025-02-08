import React from "react";

const TimetableCell = ({ data }) => {
  if (!data) return null;
  return (
    <div>
      <div>{data.subject}</div>
      {data.teacher && <div>{data.teacher}</div>}
      {data.room && <div>{data.room}</div>}
    </div>
  );
};

export default TimetableCell;
