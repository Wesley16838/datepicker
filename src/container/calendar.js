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
  const [showDate, setShowDate] = React.useState(true);
  const [showMonth, setShowMonth] = React.useState(false);
  const [showYear, setShowYear] = React.useState(false);
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
  return (
    <div className="calendar_container">
      <div className="calendar_header">
        <button onClick={() => slide("prev")}>&#706;</button>
        {month_names[tmpDate.month] + " " + tmpDate.year}
        <button onClick={() => slide("next")}>&#707;</button>
      </div>
      <div className="calendar_date_body">{showDate ? calendar : null}</div>
      <div className="calendar_month_body">{showMonth ? calendar : null}</div>
      <div className="calendar_year_body">{showYear ? calendar : null}</div>
    </div>
  );
};

export default CalendarList;
