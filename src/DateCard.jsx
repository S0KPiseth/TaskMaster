import "./Date.css";
import { useState } from "react";
function DateCard({ day, date, tasksForDay }) {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [hover, setHover] = useState(false);
  function showTasks() {
    setHover(true);
  }
  function hideTasks() {
    setHover(false);
  }
  return (
    <div className={hover ? "dateCard aspect-ratio3-2" : "dateCard"} onMouseEnter={showTasks} onMouseLeave={hideTasks}>
      {date ? (
        <>
          {" "}
          <div className={hover ? "dayNdate dayNdateHover" : "dayNdate"}>
            <p>{daysOfWeek[day]}</p>
            <p>{String(date).padStart(2, 0)}</p>
            <p className={hover ? "visible-none clearTask" : tasksForDay.length == 0 ? "clearTask" : "remainTask"}>{tasksForDay.length === 0 ? "All Clear" : tasksForDay.length + " tasks due this day"}</p>
          </div>
          <div className={hover ? "calendarTasks visible-none visible-true " : "calendarTasks visible-none"}>
            <div>
              <input type="checkbox" name="" id="" />
              <p>Meeting with Client </p>
            </div>
            <div>
              <input type="checkbox" name="" id="" />
              <p>Meeting with Client </p>
            </div>
            <div>
              <input type="checkbox" name="" id="" />
              <p>Meeting with Client </p>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
export default DateCard;
