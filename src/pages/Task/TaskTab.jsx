import { useState, useEffect } from "react";
import "./TaskTab.css";
import "../../Query.css";
import AddTask from "../../Components/AddTask/AddTask";
import { useDispatch, useSelector } from "react-redux";

import { setLayout } from "../../application-state/taskListSlice";
import { setPopUpLocation } from "../../application-state/popUpSlice";

import AddBoard from "./AddBoard";
import { useParams } from "react-router-dom";
import Board from "../../Components/Board/Board";
import List from "../../Components/List/List";

function TaskTab() {
  let { "*": catchall } = useParams();
  //pop location
  const popUpLocation = useSelector((state) => state.popUp.where);
  const dispatcher = useDispatch();
  const tasks = useSelector((state) => state.tasks.list);
  const boardList = useSelector((state) => state.board.boardList);
  const taskLayout = useSelector((state) => state.tasks.layout);
  const isAuthenticated = useSelector((state) => state.isAuth.isAuthenticated);

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
    <div className="tasksTabContent">
      <div>
        <div className="headerTask" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button
            className="addTaskBtn backgroundBtn"
            onClick={() => {
              dispatcher(setPopUpLocation("addTask"));
            }}
            id="ttAddBtn"
          >
            &#x2B; Add Task
          </button>
          <div className="viewControl">
            <label htmlFor="board" className={`${taskLayout === "board" && "activeRadio"}`} id="boardLabel">
              <p id="boardToolTip">{isAuthenticated ? "Board layout" : "Login to use board layout"}</p>
              <input type="radio" id="board" value="board" checked={taskLayout === "board"} onChange={() => dispatcher(setLayout("board"))} disabled={!isAuthenticated} />
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
            <label htmlFor="list" className={`${taskLayout === "list" && "activeRadio"}`} id="listLabel">
              <p id="listToolTip">List layout</p>
              <input type="radio" id="list" value="list" checked={taskLayout === "list"} onChange={() => dispatcher(setLayout("list"))} alt="List layout" />
              <svg width="24px" height="24px" viewBox="0 0 0.72 0.72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.12 0.21a0.03 0.03 0 0 1 0.03 -0.03h0.03a0.03 0.03 0 0 1 0 0.06H0.15a0.03 0.03 0 0 1 -0.03 -0.03m0.15 0a0.03 0.03 0 0 1 0.03 -0.03h0.27a0.03 0.03 0 1 1 0 0.06h-0.27a0.03 0.03 0 0 1 -0.03 -0.03m-0.15 0.15a0.03 0.03 0 0 1 0.03 -0.03h0.03a0.03 0.03 0 1 1 0 0.06H0.15a0.03 0.03 0 0 1 -0.03 -0.03m0.15 0a0.03 0.03 0 0 1 0.03 -0.03h0.27a0.03 0.03 0 1 1 0 0.06h-0.27a0.03 0.03 0 0 1 -0.03 -0.03m-0.15 0.15a0.03 0.03 0 0 1 0.03 -0.03h0.03a0.03 0.03 0 1 1 0 0.06H0.15a0.03 0.03 0 0 1 -0.03 -0.03m0.15 0a0.03 0.03 0 0 1 0.03 -0.03h0.27a0.03 0.03 0 1 1 0 0.06h-0.27a0.03 0.03 0 0 1 -0.03 -0.03" fill="currentColor" />
              </svg>
            </label>
          </div>
        </div>
      </div>
      {taskLayout === "list" ? (
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
              dispatcher(setPopUpLocation("addBoard"));
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
        {popUpLocation === "addBoard" ? (
          <>
            <AddBoard /> <br />
          </>
        ) : (
          popUpLocation === "addTask" && (
            <>
              <AddTask /> <br />
            </>
          )
        )}

        <div className={`renderTaskDiv ${taskLayout === "list" && "listRender"}`}>
          {/* dynamic task rendering */}
          {taskLayout === "board" ? boardList.map((board) => <Board board={board} catchall={catchall} key={board.name} />) : <List taskToRender={taskToRender} />}
        </div>
      </div>
    </div>
  );
}
export default TaskTab;
