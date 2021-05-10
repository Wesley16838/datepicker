import React from "react";
import "./style.scss";

const CalendarList = () => {
  const currDate = new Date();
  const [currentDate, setCurrentDate] = React.useState({
    year: currDate.getFullYear(),
    month: currDate.getMonth(),
    day: currDate.getDate(),
  });
  const [tmpDate, setTmpDate] = React.useState({
    year: currDate.getFullYear(),
    month: currDate.getMonth(),
    day: currDate.getDate(),
  });
  const [showUnit, setShowUnit] = React.useState({
    Date: true,
    Month: false,
    Year: false,
  });
  const [selectedDate, setSelectedDate] = React.useState();
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

  const isLeapYear = (year) => {
    return (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    );
  };
  const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
  };

  const renderCalendar = (month, year) => {
    const datelist = [];
    const days_of_month = [
      31,
      getFebDays(year),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    weekdays.forEach((item) =>
      datelist.push(<div className="weekdays">{item}</div>)
    );
    const currDate = new Date();
    const first_day = new Date(year, month, 1);

    for (let i = 0; i < 42; i++) {
      let classname = "";
      if (
        i - first_day.getDay() + 1 === currDate.getDate() &&
        year === currDate.getFullYear() &&
        month === currDate.getMonth()
      ) {
        classname = classname + "current ";
      }
      if (
        i - first_day.getDay() + 1 > days_of_month[month] ||
        i - first_day.getDay() + 1 <= 0
      ) {
        classname = classname + "not_calendar_day";
        datelist.push(
          <div className={classname}>
            {i - first_day.getDay() + 1 > days_of_month[month]
              ? i - first_day.getDay() + 1 - days_of_month[month]
              : days_of_month[month - 1 < 0 ? month + 11 : month - 1] +
                i -
                first_day.getDay() +
                1}
          </div>
        ); // if 12 then 1 //////
      } else {
        if (i >= first_day.getDay()) {
          classname = classname + "calendar_day";
          datelist.push(
            <div className={classname}>{i - first_day.getDay() + 1}</div>
          );
        }
      }
    }
    return datelist;
  };

  const slide = (arg) => {
    switch (arg) {
      case "prev":
        setTmpDate({
          ...tmpDate,
          month: tmpDate.month - 1 < 0 ? tmpDate.month + 11 : tmpDate.month - 1,
          year: tmpDate.month - 1 < 0 ? tmpDate.year - 1 : tmpDate.year,
        });
        break;
      case "next":
        setTmpDate({
          ...tmpDate,
          month:
            tmpDate.month + 1 > 11 ? tmpDate.month - 11 : tmpDate.month + 1,
          year: tmpDate.month + 1 > 11 ? tmpDate.year + 1 : tmpDate.year,
        });
        break;
    }
  };

  const calendar = renderCalendar(tmpDate.month, tmpDate.year);

  let content = () => {
    if (showUnit.Date) {
      return month_names[tmpDate.month] + " " + tmpDate.year;
    } else if (showUnit.Month) {
      return tmpDate.year;
    } else if (showUnit.Year) {
      const rangeStart = tmpDate.year - (tmpDate.year % 10);
      return rangeStart + "-" + (rangeStart + 9);
    }
  };

  const switchUnit = (arg) => {
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

  const renderMonthList = () => {
    let arr = [];
    month_names.forEach((month) =>
      arr.push(<div className="calendar_month">{month}</div>)
    );
    return arr;
  };

  const renderYearList = () => {
    let arr = [];
    const rangeStart = tmpDate.year - (tmpDate.year % 10);
    const rangeEnd = rangeStart + 9;
    for (let i = 0; i < 12; i++) {
      if (rangeStart - 1 + i < rangeStart || rangeStart - 1 + i > rangeEnd) {
        arr.push(
          <div className="calendar_year notinclude">{rangeStart - 1 + i}</div>
        );
      } else {
        arr.push(<div className="calendar_year">{rangeStart - 1 + i}</div>);
      }
    }
    return arr;
  };
  return (
    <div className="calendar_container">
      <div className="calendar_header">
        <button onClick={() => slide("prev")}>&#706;</button>
        <button onClick={() => switchUnit()}>{content()}</button>
        <button onClick={() => slide("next")}>&#707;</button>
      </div>
      <div className="calendar_date_body">
        {showUnit.Date ? calendar : null}
      </div>
      <div className="calendar_month_body">
        {showUnit.Month ? renderMonthList() : null}
      </div>
      <div className="calendar_year_body">
        {showUnit.Year ? renderYearList() : null}
      </div>
    </div>
  );
};

export default CalendarList;
