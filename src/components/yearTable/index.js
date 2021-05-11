import React from "react";

const YearTable = (props) => {
  const { data, tmpData, onClick } = props;
  const handleOnClick = (arg) => {
    if (onClick) onClick(arg);
  };

  // Render Year Calendar
  const renderYearList = () => {
    let arr = [];

    // Range of Years
    const rangeStart = tmpData.year - (tmpData.year % 10);
    const rangeEnd = rangeStart + 9;

    for (let i = 0; i < 12; i++) {
      // The years outside the current range of years
      if (rangeStart - 1 + i < rangeStart || rangeStart - 1 + i > rangeEnd) {
        arr.push(
          <div
            className="calendar_year notinclude"
            onClick={() => handleOnClick(rangeStart - 1 + i)}
          >
            {rangeStart - 1 + i}
          </div>
        );
      } else {
        // Condition of selected year
        if (rangeStart - 1 + i === data.year) {
          arr.push(
            <div
              className="calendar_year current"
              onClick={() => handleOnClick(rangeStart - 1 + i)}
            >
              {rangeStart - 1 + i}
            </div>
          );
        } else {
          arr.push(
            <div
              className="calendar_year"
              onClick={() => handleOnClick(rangeStart - 1 + i)}
            >
              {rangeStart - 1 + i}
            </div>
          );
        }
      }
    }
    return arr;
  };
  return <div className="calendar_year_body">{renderYearList()}</div>;
};

export default YearTable;
