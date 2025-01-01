import "./Date.css";
import "./TaskCard";
import { useState } from "react";
function DateCard({ taskList, day, date, tasksForDay, isToday, isPreviousDay, completeTask }) {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [hover, setHover] = useState(false);
  const calendarTaskPreview = tasksForDay.map((e, idx) => {
    const prio = e[4].split(" ");
    const priorityClass = `priority-${prio[0].toLowerCase()}`;

    return (
      <div className={priorityClass} key={idx}>
        {!(e[5] === "Over due") ? (
          <input type="checkbox" name="" id="" onChange={() => completeTask(taskList.indexOf(e))} checked={e[5] === "Complete"} disabled={e[5] === "Complete"} />
        ) : (
          <div class="warning">
            <p class="sign">!</p>
          </div>
        )}
        <p className={e[5] === "Complete" ? "line-trough" : null}>{e[0]}</p>
      </div>
    );
  });
  function showTasks() {
    setHover(true);
  }
  function hideTasks() {
    setHover(false);
  }
  return (
    <div className={date ? (hover ? "dateCard aspect-ratio3-2" : "dateCard") : "disableDate"} onMouseEnter={date ? showTasks : null} onMouseLeave={date ? hideTasks : null}>
      {date ? (
        <>
          <div className={hover ? "dayNdate dayNdateHover" : "dayNdate"}>
            <p>{daysOfWeek[day]}</p>
            <p className={isToday ? "todayCard" : !isPreviousDay ? "previousDay" : ""}>{String(date).padStart(2, 0)}</p>
            <p className={hover ? "visible-none clearTask" : tasksForDay.length == 0 ? "clearTask" : "remainTask"}>{tasksForDay.length === 0 ? "All Clear" : tasksForDay.length + " tasks due this day"}</p>
          </div>
          <div className={hover ? "calendarTasks visible-none visible-true " : "calendarTasks visible-none"}>{calendarTaskPreview}</div>
        </>
      ) : null}
    </div>
  );
}
export default DateCard;
