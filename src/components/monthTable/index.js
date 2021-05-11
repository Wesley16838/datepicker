import React from "react";

const MonthTable = (props) => {
  const { data, tmpData, onClick, monthData } = props;
  const handleOnClick = (arg) => {
    if (onClick) onClick(arg);
  };

  // Render Month Calendar
  const renderMonthList = () => {
    let arr = [];

    // Iterate month_names which is passed from calendar
    monthData.forEach((month, index) => {
      if (tmpData.year === data.year && index === data.month) {
        arr.push(
          <div
            className="calendar_month current"
            onClick={() => handleOnClick(index)}
          >
            {month}
          </div>
        );
      } else {
        arr.push(
          <div className="calendar_month" onClick={() => handleOnClick(index)}>
            {month}
          </div>
        );
      }
    });
    return arr;
  };
  return <div className="calendar_month_body">{renderMonthList()}</div>;
};

export default MonthTable;
