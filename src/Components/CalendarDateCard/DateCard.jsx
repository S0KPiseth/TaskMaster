import "./Date.css";
import "../TaskCard/TaskCard.css";
import { useDispatch } from "react-redux";
import { completeTk } from "../../application-state/taskListSlice";

import { useState } from "react";
function DateCard({ day, date, tasksForDay, isToday, isPreviousDay }) {
  const dispatch = useDispatch();
  const [individualHover, setIndividualHover] = useState(false);
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const remainTask = tasksForDay.filter((task) => {
    return task.status === "In progress";
  });
  const overDueTasks = tasksForDay.filter((task) => {
    return task.status === "Over due";
  });
  const calendarTaskPreview = tasksForDay.map((e, idx) => {
    const prio = e.priorityChoice.split(" ");
    const priorityClass = `priority-${prio[0].toLowerCase()}`;

    return (
      <div className={priorityClass} key={idx} id="taskCardDive">
        {!(e.status === "Over due") ? (
          <input type="checkbox" name="" id="" onChange={() => dispatch(completeTk(e._id))} checked={e.status === "Complete"} disabled={e.status === "Complete"} />
        ) : (
          <div className="warning">
            <p className="sign">!</p>
          </div>
        )}
        <p className={e.status === "Complete" ? "line-trough" : e.status === "Over due" ? "overDue" : ""}>{e.title}</p>
      </div>
    );
  });
  function showTasks() {
    setIndividualHover(true);
  }
  function hideTasks() {
    setIndividualHover(false);
  }
  //onMouseEnter={date ? showTasks : null} onMouseLeave={date ? hideTasks : null}
  return (
    <div className={date ? (individualHover ? "dateCard aspect-ratio3-2" : "dateCard") : "disableDate"} onMouseEnter={date ? showTasks : null} onMouseLeave={date ? hideTasks : null}>
      {date ? (
        <>
          <div className={individualHover ? "dayNdate dayNdateHover" : "dayNdate"}>
            <p>{daysOfWeek[day]}</p>
            <p className={isToday ? "todayCard" : !isPreviousDay ? "previousDay" : ""}>{String(date).padStart(2, 0)}</p>
            <p className={individualHover ? "visible-none clearTask" : remainTask.length == 0 ? (overDueTasks.length === 0 ? "clearTask" : "overDueTask") : "remainTask"}>{remainTask.length === 0 ? (overDueTasks.length === 0 ? "All Clear" : overDueTasks.length + " task over due") : remainTask.length + " tasks due this day"}</p>
          </div>
          <div className={individualHover ? "calendarTasks visible-none visible-true " : "calendarTasks visible-none"}>{calendarTaskPreview}</div>
        </>
      ) : (
        <>
          <div className={individualHover ? "dayNdate dayNdateHover" : "dayNdate"}>
            <p>null</p>
            <p className={isToday ? "todayCard" : !isPreviousDay ? "previousDay" : ""}>00</p>
            <p className={individualHover ? "visible-none clearTask" : remainTask.length == 0 ? (overDueTasks.length === 0 ? "clearTask" : "overDueTask") : "remainTask"}>All Clear</p>
          </div>
          <div className={individualHover ? "calendarTasks visible-none visible-true " : "calendarTasks visible-none"}>{calendarTaskPreview}</div>
        </>
      )}
    </div>
  );
}
export default DateCard;
