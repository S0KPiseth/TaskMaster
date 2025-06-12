import React, { useState, useRef, useEffect } from "react";
import "./TaskTab.css";
import TaskCard from "../../Components/TaskCard/TaskCard";
import AddTask from "../../Components/AddTask/AddTask";
import { useDispatch, useSelector } from "react-redux";
import { setTag } from "../../application-state/tagSlice";

function TaskTab({ addStatus, setAddStatus, isTabletScreen }) {
  const dispatcher = useDispatch();
  const tasks = useSelector((state) => state.tasks.list);
  //filter option
  const [filterOption, setFilterOption] = useState(["All Status", "All Priority"]);
  const [taskToRender, setTaskToRender] = useState([]);

  //Filter task
  useEffect(() => {
    const tempList = tasks.filter((e) => {
      const statusMatch = filterOption[0] === "All Status" || e.status === filterOption[0];
      const priorityMatch = filterOption[1] === "All Priority" || e.priorityChoice === filterOption[1];

      return statusMatch && priorityMatch;
    });
    setTaskToRender([...tempList]);
  }, [filterOption, tasks]);

  return (
    <>
      <div className="tasksTabContent">
        <div>
          <div className="headerTask" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button
              className="addTaskBtn backgroundBtn"
              onClick={() => {
                setAddStatus(true);
              }}
              id="ttAddBtn"
            >
              &#x2B; Add Task
            </button>
          </div>
        </div>
        <div className="taskFilter">
          <select
            className="selectClass"
            id="status"
            onChange={() => {
              setFilterOption((pre) => [document.getElementById("status").value, pre[1]]);
            }}
          >
            <option value="All Status" defaultValue>
              All Status
            </option>
            <option value="In Progress">In Progress</option>
            <option value="Complete">Complete</option>
            <option value="Over due">Over due</option>
          </select>
          <select
            className="selectClass"
            id="priority"
            onChange={() => {
              setFilterOption((pre) => [pre[0], document.getElementById("priority").value]);
            }}
          >
            <option value="All Priority" defaultValue>
              All Priority
            </option>
            <option value="High Priority">High Priority</option>
            <option value="Medium Priority">Medium Priority</option>
            <option value="Low Priority<">Low Priority</option>
          </select>
        </div>
        {addStatus && (
          <>
            <AddTask setAddStatus={setAddStatus} /> <br />
          </>
        )}

        {taskToRender.length > 0 ? (
          taskToRender.map((e, index) => {
            return (
              <React.Fragment key={e._id}>
                <TaskCard task={e} setAddStatus={setAddStatus} isTabletScreen={isTabletScreen} />
                <br />
              </React.Fragment>
            );
          })
        ) : (
          <p className="noTasks">You haven't create any tasks click add new task to create task</p>
        )}
      </div>
    </>
  );
}
export default TaskTab;
