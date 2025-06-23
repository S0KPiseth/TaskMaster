import { useState, useRef, useEffect } from "react";
import "./TaskTab.css";
import "../../Query.css";
import TaskCard from "../../Components/TaskCard/TaskCard";
import AddTask from "../../Components/AddTask/AddTask";
import { useDispatch, useSelector } from "react-redux";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { moveTask, setBoard, setLayout } from "../../application-state/taskListSlice";
import { setPopUpLocation } from "../../application-state/popUpSlice";
import axios from "axios";
import AddBoard from "./AddBoard";
import { useParams } from "react-router-dom";

function TaskTab({ isTabletScreen }) {
  let { "*": catchall } = useParams();
  //pop location
  const popUpLocation = useSelector((state) => state.popUp.where);
  const dispatcher = useDispatch();
  const tasks = useSelector((state) => state.tasks.list);
  const boardList = useSelector((state) => state.board.boardList);
  const taskLayout = useSelector((state) => state.tasks.layout);
  const isAuthenticated = useSelector((state) => state.isAuth.isAuthenticated);

  //drag and drop state
  const startDrag = useRef(null);
  const endDrag = useRef(null);

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
  useGSAP(() => {
    if (taskLayout === "list") return;
    const dropAreas = gsap.utils.toArray(".dropArea");

    const handleDragEnter = (e) => {
      e.preventDefault();

      const el = e.currentTarget;
      const board = el.dataset.board;
      const index = Number(el.dataset.index);
      if (!board) return;

      endDrag.current = { board, index };

      const cardEl = document.querySelector(".tkCard");
      const height = cardEl?.offsetHeight || 80;

      gsap.to(el, { height, borderTop: "1px solid var(--color-primary-800)" });
    };

    const handleDragLeave = (e) => {
      const el = e.currentTarget;
      gsap.to(el, { height: "10px", border: 0 });
      endDrag.current = null;
    };

    const handleDrop = () => {
      if (!startDrag.current || !endDrag.current) return;

      const { id } = startDrag.current;
      const { board, index } = endDrag.current;
      const boardObject = boardList.find((b) => b.name === endDrag.current.board);

      if (!id || board === null || index === null) return;

      const draggedTask = tasks.find((task) => task._id === id);
      if (!draggedTask) return;

      const filteredTasks = tasks.filter((task) => task._id !== id);

      const targetBoard = filteredTasks.filter((task) => task.boardName === board);
      targetBoard.splice(index, 0, draggedTask);
      const otherTasks = filteredTasks.filter((task) => task.boardName !== board);
      const finalTasksArray = [...otherTasks, ...targetBoard];
      const indexOfChanging = finalTasksArray.findIndex((task) => task._id === draggedTask._id);
      //update backend

      let updatedTask;
      const today = new Date();
      if (endDrag.current.board === "Doing") {
        const dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3);
        //default deadline 3 days
        updatedTask = { ...draggedTask, dueDate: dueDate, boardName: endDrag.current.board, boardId: boardObject._id };
      } else if (endDrag.current.board === "Done") {
        updatedTask = { ...draggedTask, completedDate: today, boardName: endDrag.current.board, dueDate: null, boardId: boardObject._id };
      } else {
        updatedTask = { ...draggedTask, completedDate: null, boardName: endDrag.current.board, dueDate: null, boardId: boardObject._id };
      }

      axios
        .put("http://localhost:5050/api/task", { ...updatedTask, idx: draggedTask._id }, { withCredentials: true })
        .then((res) => {
          dispatcher(moveTask({ task: res.data.task, newIndex: indexOfChanging }));
          gsap.to(".dropArea", { height: "10px", border: 0 });

          // CLEANUP
          startDrag.current = null;
          endDrag.current = null;
        })
        .catch((err) => {
          alert(`error:${err}`);
        });
    };

    dropAreas.forEach((el) => {
      el.addEventListener("dragenter", handleDragEnter);
      el.addEventListener("dragleave", handleDragLeave);
      el.addEventListener("drop", handleDrop);
    });

    return () => {
      dropAreas.forEach((el) => {
        el.removeEventListener("dragenter", handleDragEnter);
        el.removeEventListener("dragleave", handleDragLeave);
        el.removeEventListener("drop", handleDrop);
      });
    };
  }, [tasks, taskLayout, boardList]);
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
        {taskLayout === "list" && (
          <div className="renderTaskDiv" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {taskToRender.length > 0 ? (
              taskToRender.map((e, index) => (
                <div key={e._id}>
                  {index === 0 && <br />}
                  <TaskCard chooseTask={catchall} task={e} isTabletScreen={isTabletScreen} radioValue={taskLayout} />
                  <br />
                </div>
              ))
            ) : (
              <p className="noTasks">You haven't created any tasks. Click "Add New Task" to create one.</p>
            )}
          </div>
        )}
        {taskLayout === "board" && (
          <div className="renderTaskDiv">
            {/* dynamic task rendering */}
            {boardList.map((board) => (
              <div className="board" key={board.name}>
                <div className="boardHeader">
                  <p>
                    {board.name}
                    <span>{tasks.filter((e) => e.boardName === board.name).length}</span>
                  </p>
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 0.72 0.72"
                    xmlns="http://www.w3.org/2000/svg"
                    id="plus"
                    onClick={() => {
                      dispatcher(setPopUpLocation("addTask"));
                      dispatcher(setBoard(board.name));
                    }}
                  >
                    <path d="M0.57 0.33h-0.18V0.15a0.03 0.03 0 0 0 -0.06 0v0.18H0.15a0.03 0.03 0 0 0 0 0.06h0.18v0.18a0.03 0.03 0 0 0 0.06 0v-0.18h0.18a0.03 0.03 0 0 0 0 -0.06" fill="currentColor" />
                  </svg>
                </div>

                {tasks.filter((e) => e.boardName === board.name).length > 0 ? (
                  tasks
                    .filter((e) => e.boardName === board.name)
                    .map((e, index) => (
                      <div key={e._id}>
                        {index === 0 && (
                          <div className="dropArea" onDragOver={(e) => e.preventDefault()} data-board={e.boardName} data-index={index}>
                            &nbsp;
                          </div>
                        )}

                        <TaskCard chooseTask={catchall} task={e} id={e._id} boardName={e.boardName} startDrag={startDrag} endDrag={endDrag} radioValue={taskLayout} />
                        <div className="dropArea" onDragOver={(e) => e.preventDefault()} data-board={e.boardName} data-index={index + 1}>
                          &nbsp;
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="dropArea" onDragOver={(e) => e.preventDefault()} data-board={board.name} data-index={0}>
                    &nbsp;
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default TaskTab;
