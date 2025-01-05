import "./Calendar.css";
import DateCard from "../CalendarDateCard/DateCard";
import { useState } from "react";

function Calendar({ taskList, completeTask, hover, setHover }) {
  let now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  let firstDay;
  let lastDay;
  firstDay = new Date(year, month, 1);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  if (month === 11) {
    lastDay = new Date(year + 1, 0, 0);
  } else if (month > 11) {
    setYear(year + 1);
    setMonth(0);

    lastDay = new Date(year, month + 1, 0);
  } else if (month < 0) {
    lastDay = new Date(year, month + 1, 0);
    setMonth(11);
    setYear(year - 1);
  } else {
    lastDay = new Date(year, month + 1, 0);
  }

  let testDayOFmonthList = [];

  for (let date = 0; date < 42; date++) {
    // console.log(date, firstDay.getDay());
    if (firstDay.getDay() <= date) {
      testDayOFmonthList[date] = new Date(year, month, date + 1 - firstDay.getDay()).getDate();
    } else {
      testDayOFmonthList[date] = null;
    }
  }

  const lastDayIndex = testDayOFmonthList.indexOf(lastDay.getDate());
  testDayOFmonthList.forEach((e, idx) => {
    idx > lastDayIndex ? (testDayOFmonthList[idx] = null) : null;
  });
  const numberOFNull = testDayOFmonthList.slice(lastDayIndex, testDayOFmonthList.length).filter((e) => {
    return e === null;
  });
  numberOFNull.length >= 7 ? (testDayOFmonthList = testDayOFmonthList.slice(0, 35)) : null;
  const cards = testDayOFmonthList.map((e, idx) => {
    const isPreviousDay = now > new Date(year, month, e);
    const tasksForDay = taskList.filter((task) => {
      return task[3] === `${year}-${String(month + 1).padStart(2, 0)}-${String(e).padStart(2, 0)}`;
    });
    return <DateCard hover={hover} setHover={setHover} key={idx} completeTask={completeTask} taskList={taskList} day={idx % 7} date={e} tasksForDay={tasksForDay} isToday={e == now.getDate() && year == now.getFullYear() && month == now.getMonth() ? true : false} isPreviousDay={isPreviousDay} />;
  });
  const groupedCards = [];
  for (let i = 0; i < cards.length; i += 7) {
    groupedCards.push(
      <div key={i} className="dateCardContainer">
        {cards.slice(i, i + 7)}
      </div>
    );
  }

  return (
    <div className="calendar">
      <h2>Calender</h2>
      <div className="controlCalendar">
        <div>
          <p
            onClick={() => {
              setMonth(month - 1);
            }}
          >
            &#10094;
          </p>
          <p>
            {months[month]} {year}
          </p>
          <p
            onClick={() => {
              setMonth(month + 1);
            }}
          >
            &#10095;
          </p>
        </div>
      </div>
      <div className="calendarDayContainer">
        <div className="calendarDate">{groupedCards}</div>
      </div>
    </div>
  );
}
export default Calendar;
