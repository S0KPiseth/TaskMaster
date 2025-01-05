import "./Date.css";
import "../TaskCard/TaskCard.css";

import { useState } from "react";
function DateCard({ taskList, day, date, tasksForDay, isToday, isPreviousDay, completeTask, hover, setHover }) {
  const [individualHover, setIndividualHover] = useState(false);
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const remainTask = tasksForDay.filter((task) => {
    return task[5] === "In Progress";
  });
  const overDueTasks = tasksForDay.filter((task) => {
    return task[5] === "Over due";
  });
  const calendarTaskPreview = tasksForDay.map((e, idx) => {
    const prio = e[4].split(" ");
    const priorityClass = `priority-${prio[0].toLowerCase()}`;

    return (
      <div className={priorityClass} key={idx} id="taskCardDive">
        {!(e[5] === "Over due") ? (
          <input type="checkbox" name="" id="" onChange={() => completeTask(taskList.indexOf(e))} checked={e[5] === "Complete"} disabled={e[5] === "Complete"} />
        ) : (
          <div className="warning">
            <p className="sign">!</p>
          </div>
        )}
        <p className={e[5] === "Complete" ? "line-trough" : e[5] === "Over due" ? "overDue" : ""}>{e[0]}</p>
      </div>
    );
  });
  function showTasks() {
    if (!hover) {
      setIndividualHover(true);
    }
  }
  function hideTasks() {
    if (!hover) {
      setIndividualHover(false);
    }
  }
  //onMouseEnter={date ? showTasks : null} onMouseLeave={date ? hideTasks : null}
  return (
    <div className={date ? (hover || individualHover ? "dateCard aspect-ratio3-2" : "dateCard") : "disableDate"} onMouseEnter={date ? showTasks : null} onMouseLeave={date ? hideTasks : null}>
      {date ? (
        <>
          <div className={hover || individualHover ? "dayNdate dayNdateHover" : "dayNdate"}>
            <p>{daysOfWeek[day]}</p>
            <p className={isToday ? "todayCard" : !isPreviousDay ? "previousDay" : ""}>{String(date).padStart(2, 0)}</p>
            <p className={hover || individualHover ? "visible-none clearTask" : remainTask.length == 0 ? "clearTask" : "remainTask"}>{remainTask.length === 0 ? (overDueTasks.length === 0 ? "All Clear" : overDueTasks.length + " task over due") : remainTask.length + " tasks due this day"}</p>
          </div>
          <div className={hover || individualHover ? "calendarTasks visible-none visible-true " : "calendarTasks visible-none"}>{calendarTaskPreview}</div>
        </>
      ) : null}
    </div>
  );
}
export default DateCard;
