import React from "react";
import Button from "./../components/buttons";
import DateTable from "./../components/dateTable";
import MonthTable from "./../components/monthTable";
import YearTable from "./../components/yearTable";
import "./style.scss";

const CalendarList = () => {
  const currDate = new Date();

  // Date object for storing selected date and Initialize with current date
  const [selectedDate, setSelectedDate] = React.useState({
    year: currDate.getFullYear(),
    month: currDate.getMonth(),
    date: currDate.getDate(),
  });

  // Temp date object for storing temp date before selecting Date
  const [tmpSelectedDate, setTmpSelectedDate] = React.useState({
    year: currDate.getFullYear(),
    month: currDate.getMonth(),
    date: currDate.getDate(),
  });

  // Choose Calendar Display Type, init is Date
  const [showUnit, setShowUnit] = React.useState({
    Date: true,
    Month: false,
    Year: false,
  });

  const month_names = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Button for next and prev slider
  const slide = (arg) => {
    switch (arg) {
      case "prev":
        if (showUnit.Date) {
          setTmpSelectedDate({
            ...tmpSelectedDate,
            month:
              tmpSelectedDate.month - 1 < 0
                ? tmpSelectedDate.month + 11
                : tmpSelectedDate.month - 1,
            year:
              tmpSelectedDate.month - 1 < 0
                ? tmpSelectedDate.year - 1
                : tmpSelectedDate.year,
          });
        } else if (showUnit.Month) {
          setTmpSelectedDate({
            ...tmpSelectedDate,
            year: tmpSelectedDate.year - 1,
          });
        } else if (showUnit.Year) {
          setTmpSelectedDate({
            ...tmpSelectedDate,
            year: tmpSelectedDate.year - 10,
          });
        }

        break;
      case "next":
        if (showUnit.Date) {
          setTmpSelectedDate({
            ...tmpSelectedDate,
            month:
              tmpSelectedDate.month + 1 > 11
                ? tmpSelectedDate.month - 11
                : tmpSelectedDate.month + 1,
            year:
              tmpSelectedDate.month + 1 > 11
                ? tmpSelectedDate.year + 1
                : tmpSelectedDate.year,
          });
        } else if (showUnit.Month) {
          setTmpSelectedDate({
            ...tmpSelectedDate,
            year: tmpSelectedDate.year + 1,
          });
        } else if (showUnit.Year) {
          setTmpSelectedDate({
            ...tmpSelectedDate,
            year: tmpSelectedDate.year + 10,
          });
        }

        break;
    }
  };

  // Button Value base on Calendar Type
  const content = () => {
    if (showUnit.Date) {
      return month_names[tmpSelectedDate.month] + " " + tmpSelectedDate.year;
    } else if (showUnit.Month) {
      return tmpSelectedDate.year;
    } else if (showUnit.Year) {
      const rangeStart = tmpSelectedDate.year - (tmpSelectedDate.year % 10);
      return rangeStart + "-" + (rangeStart + 9);
    }
  };

  // Change Calendar Type
  const switchUnit = () => {
    if (showUnit.Date) {
      setShowUnit({
        ...showUnit,
        Date: false,
        Month: true,
      });
    } else if (showUnit.Month) {
      setShowUnit({
        ...showUnit,
        Month: false,
        Year: true,
      });
    }
  };

  // Select Date function
  const onSelectDate = (arg) => {
    setTmpSelectedDate({
      ...tmpSelectedDate,
      date: arg,
    });
    setSelectedDate({
      year: tmpSelectedDate.year,
      month: tmpSelectedDate.month,
      date: arg,
    });
  };

  // Clicking Month showing Date
  const onClickMonth = (arg) => {
    setShowUnit({
      ...showUnit,
      Date: true,
      Month: false,
    });
    setTmpSelectedDate({
      ...tmpSelectedDate,
      month: arg,
    });
  };

  // Clicking Year showing month
  const onClickYear = (arg) => {
    setShowUnit({
      ...showUnit,
      Year: false,
      Month: true,
    });
    setTmpSelectedDate({
      ...tmpSelectedDate,
      year: arg,
    });
  };

  return (
    <div className="calendar_container">
      <div className="calendar_header">
        <Button onClick={() => slide("prev")} content="&#706;" />
        <Button onClick={() => switchUnit()} content={content()} />
        <Button onClick={() => slide("next")} content="&#707;" />
      </div>
      {showUnit.Date ? (
        <DateTable
          onClick={(arg) => onSelectDate(arg)}
          data={selectedDate}
          tmpData={tmpSelectedDate}
        />
      ) : null}
      {showUnit.Month ? (
        <MonthTable
          onClick={(arg) => onClickMonth(arg)}
          data={selectedDate}
          tmpData={tmpSelectedDate}
          monthData={month_names}
        />
      ) : null}
      {showUnit.Year ? (
        <YearTable
          onClick={(arg) => onClickYear(arg)}
          data={selectedDate}
          tmpData={tmpSelectedDate}
        />
      ) : null}
    </div>
  );
};

export default CalendarList;
