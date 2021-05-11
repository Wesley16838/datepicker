import React from "react";
import "./style.scss";

const CalendarList = () => {
  const currDate = new Date();
  const [selectedDate, setSelectedDate] = React.useState({
    year: currDate.getFullYear(),
    month: currDate.getMonth(),
    date: currDate.getDate(),
  });
  const [tmpSelectedDate, setTmpSelectedDate] = React.useState({
    year: currDate.getFullYear(),
    month: currDate.getMonth(),
    date: currDate.getDate(),
  });
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
        selectedDate.date === i - first_day.getDay() + 1 &&
        selectedDate.month === month &&
        selectedDate.year === year
      ) {
        classname = classname + "selected ";
      }
      if (
        i - first_day.getDay() + 1 > days_of_month[month] ||
        i - first_day.getDay() + 1 <= 0
      ) {
        classname = classname + "not_calendar_day";
        const current =
          i - first_day.getDay() + 1 > days_of_month[month]
            ? i - first_day.getDay() + 1 - days_of_month[month]
            : days_of_month[month - 1 < 0 ? month + 11 : month - 1] +
              i -
              first_day.getDay() +
              1;
        datelist.push(
          <div className={classname} onClick={() => onSelectDate(current)}>
            {current}
          </div>
        ); // if 12 then 1 //////
      } else {
        if (i >= first_day.getDay()) {
          classname = classname + "calendar_day";
          datelist.push(
            <div
              className={classname}
              onClick={() => onSelectDate(i - first_day.getDay() + 1)}
            >
              {i - first_day.getDay() + 1}
            </div>
          );
        }
      }
    }
    return datelist;
  };

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

  const calendar = renderCalendar(tmpSelectedDate.month, tmpSelectedDate.year);

  let content = () => {
    if (showUnit.Date) {
      return month_names[tmpSelectedDate.month] + " " + tmpSelectedDate.year;
    } else if (showUnit.Month) {
      return tmpSelectedDate.year;
    } else if (showUnit.Year) {
      const rangeStart = tmpSelectedDate.year - (tmpSelectedDate.year % 10);
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

  const renderMonthList = () => {
    let arr = [];
    month_names.forEach((month, index) => {
      if (
        tmpSelectedDate.year === selectedDate.year &&
        index === selectedDate.month
      ) {
        arr.push(
          <div
            className="calendar_month current"
            onClick={() => onClickMonth(index)}
          >
            {month}
          </div>
        );
      } else {
        arr.push(
          <div className="calendar_month" onClick={() => onClickMonth(index)}>
            {month}
          </div>
        );
      }
    });
    return arr;
  };

  const renderYearList = () => {
    let arr = [];
    const rangeStart = tmpSelectedDate.year - (tmpSelectedDate.year % 10);
    const rangeEnd = rangeStart + 9;
    for (let i = 0; i < 12; i++) {
      if (rangeStart - 1 + i < rangeStart || rangeStart - 1 + i > rangeEnd) {
        arr.push(
          <div
            className="calendar_year notinclude"
            onClick={() => onClickYear(rangeStart - 1 + i)}
          >
            {rangeStart - 1 + i}
          </div>
        );
      } else {
        if (rangeStart - 1 + i === selectedDate.year) {
          arr.push(
            <div
              className="calendar_year current"
              onClick={() => onClickYear(rangeStart - 1 + i)}
            >
              {rangeStart - 1 + i}
            </div>
          );
        } else {
          arr.push(
            <div
              className="calendar_year"
              onClick={() => onClickYear(rangeStart - 1 + i)}
            >
              {rangeStart - 1 + i}
            </div>
          );
        }
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
