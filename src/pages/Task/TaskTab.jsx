import React, { useState, useRef, useEffect } from "react";
import "./TaskTab.css";
import TaskCard from "../../Components/TaskCard/TaskCard";
import AddTask from "../../Components/AddTask/AddTask";
import { useDispatch, useSelector } from "react-redux";
import { setTag } from "../../application-state/tagSlice";
import { setPopUp } from "../../application-state/popUpSlice";

function TaskTab({ addStatus, setAddStatus, isTabletScreen }) {
  const dispatcher = useDispatch();
  const tasks = useSelector((state) => state.tasks.list);
  const boardList = useSelector((state) => state.board.boardList);
  //filter option
  const [filterOption, setFilterOption] = useState(["All Status", "All Priority"]);
  const [taskToRender, setTaskToRender] = useState([]);
  const [radioValue, setRadioValue] = useState("board");

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
            <div className="viewControl">
              <label htmlFor="board" className={`${radioValue === "board" && "activeRadio"}`}>
                <input type="radio" id="board" value="board" checked={radioValue === "board"} onChange={() => setRadioValue("board")} />
                <svg fill="currentColor" width="24px" height="24px" viewBox="0 0 0.72 0.72" xmlns="http://www.w3.org/2000/svg">
                  <g id="View_Board" data-name="View Board">
                    <g>
                      <path strokeWidth="0.01" stroke="currentColor" d="M0.553 0.628H0.167a0.075 0.075 0 0 1 -0.075 -0.075V0.167a0.075 0.075 0 0 1 0.075 -0.075h0.386a0.075 0.075 0 0 1 0.075 0.075v0.386a0.075 0.075 0 0 1 -0.075 0.075M0.167 0.122a0.045 0.045 0 0 0 -0.045 0.045v0.386a0.045 0.045 0 0 0 0.045 0.045h0.386a0.045 0.045 0 0 0 0.045 -0.045V0.167a0.045 0.045 0 0 0 -0.045 -0.045Z" />
                      <path strokeWidth="0.01" stroke="currentColor" d="M0.375 0.436a0.015 0.015 0 0 1 -0.03 0v-0.24a0.015 0.015 0 0 1 0.03 0Z" />
                      <path strokeWidth="0.01" stroke="currentColor" d="M0.502 0.374a0.015 0.015 0 0 1 -0.03 0V0.196a0.015 0.015 0 0 1 0.03 0Z" />
                      <path strokeWidth="0.01" stroke="currentColor" d="M0.248 0.196a0.015 0.015 0 0 0 -0.03 0v0.12a0.015 0.015 0 0 0 0.03 0Z" />
                    </g>
                  </g>
                </svg>
              </label>
              <label htmlFor="list" className={`${radioValue === "list" && "activeRadio"}`}>
                <input type="radio" id="list" value="list" checked={radioValue === "list"} onChange={() => setRadioValue("list")} />
                <svg width="24px" height="24px" viewBox="0 0 0.72 0.72" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.12 0.21a0.03 0.03 0 0 1 0.03 -0.03h0.03a0.03 0.03 0 0 1 0 0.06H0.15a0.03 0.03 0 0 1 -0.03 -0.03m0.15 0a0.03 0.03 0 0 1 0.03 -0.03h0.27a0.03 0.03 0 1 1 0 0.06h-0.27a0.03 0.03 0 0 1 -0.03 -0.03m-0.15 0.15a0.03 0.03 0 0 1 0.03 -0.03h0.03a0.03 0.03 0 1 1 0 0.06H0.15a0.03 0.03 0 0 1 -0.03 -0.03m0.15 0a0.03 0.03 0 0 1 0.03 -0.03h0.27a0.03 0.03 0 1 1 0 0.06h-0.27a0.03 0.03 0 0 1 -0.03 -0.03m-0.15 0.15a0.03 0.03 0 0 1 0.03 -0.03h0.03a0.03 0.03 0 1 1 0 0.06H0.15a0.03 0.03 0 0 1 -0.03 -0.03m0.15 0a0.03 0.03 0 0 1 0.03 -0.03h0.27a0.03 0.03 0 1 1 0 0.06h-0.27a0.03 0.03 0 0 1 -0.03 -0.03" fill="currentColor" />
                </svg>
              </label>
            </div>
          </div>
        </div>
        {radioValue === "list" ? (
          <div className="taskFilter">
            <select className="selectClass" value={filterOption[0]} onChange={(e) => setFilterOption((prev) => [e.target.value, prev[1]])}>
              <option value="All Status">All Status</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
              <option value="Over due">Over due</option>
            </select>

            <select className="selectClass" value={filterOption[1]} onChange={(e) => setFilterOption((prev) => [prev[0], e.target.value])}>
              <option value="All Priority">All Priority</option>
              <option value="High Priority">High Priority</option>
              <option value="Medium Priority">Medium Priority</option>
              <option value="Low Priority">Low Priority</option>
            </select>
          </div>
        ) : (
          <div className="newBoardDiv">
            <button
              onClick={() => {
                dispatcher(setPopUp(true));
              }}
            >
              <p> Crate new board</p>
              <svg width="24px" height="24px" viewBox="0 0 0.72 0.72" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.57 0.33h-0.18V0.15a0.03 0.03 0 0 0 -0.06 0v0.18H0.15a0.03 0.03 0 0 0 0 0.06h0.18v0.18a0.03 0.03 0 0 0 0.06 0v-0.18h0.18a0.03 0.03 0 0 0 0 -0.06" fill="currentColor" />
              </svg>
            </button>
          </div>
        )}

        <div>
          {addStatus && (
            <>
              <AddTask setAddStatus={setAddStatus} /> <br />
            </>
          )}
          {radioValue === "list" && (
            <div className="renderTaskDiv">
              {taskToRender.length > 0 ? (
                taskToRender.map((e, index) => (
                  <div key={e._id}>
                    <TaskCard task={e} setAddStatus={setAddStatus} isTabletScreen={isTabletScreen} />
                    <br />
                  </div>
                ))
              ) : (
                <p className="noTasks">You haven't created any tasks. Click "Add New Task" to create one.</p>
              )}
            </div>
          )}
          {radioValue === "board" && (
            <div className="renderTaskDiv">
              {boardList.map((board) => (
                <div className="board">
                  <div className="boardHeader">
                    <p>
                      {board.name}
                      <span>{tasks.filter((e) => e.boardName === board.name).length}</span>
                    </p>
                    <svg width="20px" height="20px" viewBox="0 0 0.72 0.72" xmlns="http://www.w3.org/2000/svg" id="plus">
                      <path d="M0.57 0.33h-0.18V0.15a0.03 0.03 0 0 0 -0.06 0v0.18H0.15a0.03 0.03 0 0 0 0 0.06h0.18v0.18a0.03 0.03 0 0 0 0.06 0v-0.18h0.18a0.03 0.03 0 0 0 0 -0.06" fill="currentColor" />
                    </svg>
                  </div>

                  <br />
                  {tasks
                    .filter((e) => e.boardName === board.name)
                    .map((e, index) => (
                      <div key={e._id}>
                        <TaskCard task={e} setAddStatus={setAddStatus} isTabletScreen={isTabletScreen} />
                        <br />
                      </div>
                    ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default TaskTab;
