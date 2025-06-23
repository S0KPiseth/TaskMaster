import axios from "axios";
import "../../pages/Task/TaskTab.css";
import TagContent from "../TagContent/TagContent";
import { useSelector, useDispatch } from "react-redux";
import { addTag, clearTags } from "../../application-state/tagSlice";
import { addNewTask, editExistTask, resetEditTask } from "../../application-state/taskListSlice";
import { useEffect, useRef, useState } from "react";
import { setPopUpLocation } from "../../application-state/popUpSlice";
const BASE_URL = import.meta.env.VITE_BACKEND_URI;
function AddTask() {
  const isAuthenticated = useSelector((state) => state.isAuth.isAuthenticated);
  const [boardChoice, setBoardChoice] = useState("default");
  const tags = useSelector((state) => state.tagList.list);
  const user = useSelector((state) => state.isAuth.user);
  const taskForEdit = useSelector((state) => state.tasks.editTask);
  const dateRef = useRef(null);
  const searchRef = useRef(null);
  const dispatcher = useDispatch();
  const boards = useSelector((state) => state.board.boardList);
  useEffect(() => {
    setBoardChoice(taskForEdit.boardName);
  }, [taskForEdit]);

  const todayDate = new Date();
  function addNewTag(e) {
    if (e.key == "Enter" && e.target.value != "") {
      dispatcher(addTag({ tagname: e.target.value, color: "black", textColor: "white" }));
    } else if (e.key == "Enter" && e.target.value == "") {
      e.target.className = "shakingInput";
      setTimeout(() => {
        e.target.className = "";
      }, 200);
    }
  }

  function addTask() {
    if (isAuthenticated && (!boardChoice || boardChoice === "default")) return alert("You haven't choose any board");

    const createdDate = new Date();
    const formattedDate = createdDate.toISOString().slice(0, 10);
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date");
    const priorityChoice = document.getElementById("priorityChoice").value;
    const board = boards.find((e) => e.name === boardChoice);

    const rqBody = {
      title,
      description,
      tags,
      dueDate: boardChoice === "Doing" || !isAuthenticated ? date.value : undefined,
      completedDate: boardChoice === "Done" ? date.value : undefined,
      taskToAddNext: searchRef.current ? searchRef.current : undefined,
      priorityChoice,
      status: boardChoice === "Done" ? "Complete" : "In progress",
      createdDate: formattedDate,
      userId: user?._id,
      idx: taskForEdit?._id,
      boardId: board?._id,
      boardName: user ? boardChoice : "Doing",
    };

    if (title) {
      if (taskForEdit._id) {
        if (user) {
          axios
            .put(`${BASE_URL}/api/task`, rqBody, { withCredentials: true })
            .then((res) => {
              dispatcher(editExistTask({ idx: taskForEdit._id, newTask: res.data.task }));
            })
            .catch((err) => {
              alert(`error:${err.response.status}:${err.response.data.msg}`);
            });
        } else {
          const { idx, ...propertyBefore } = rqBody;
          dispatcher(editExistTask({ idx: taskForEdit._id, newTask: { _id: idx, ...propertyBefore } }));
        }
      } else {
        axios
          .post(`${BASE_URL}/api/task`, rqBody, { withCredentials: true })
          .then((res) => {
            dispatcher(addNewTask(res.data.task));
            //clear the data that assign to the add task input fields
            dispatcher(resetEditTask());
          })
          .catch((err) => {
            alert(`error:${err.response.status}:${err.response.data.msg}`);
          });
      }

      dispatcher(setPopUpLocation(null));
      dispatcher(clearTags());
      return;
    }
    alert("Task title cannot be empty!");
  }

  return (
    <div className="addTask" id="taskForm">
      <h3 id="header">Add New Task</h3>
      <input className="addTaskInput" type="text" name="title" id="title" placeholder="Task title" defaultValue={taskForEdit.title} />
      <input className="addTaskInput" type="text" name="description" id="description" placeholder="Task description" defaultValue={taskForEdit.description} />
      <label htmlFor="">
        {tags.map((e, idx) => {
          return <TagContent key={idx} tagElement={e} tags={tags} index={idx} />;
        })}

        <input
          className="addTaskInput"
          type="text"
          name=""
          placeholder="add tags"
          onKeyDown={(e) => {
            addNewTag(e);
          }}
        />
      </label>

      <div className="lastInput">
        <select name="board" id="board" className="selectClass" onChange={(e) => setBoardChoice(e.target.value)} disabled={taskForEdit.boardName || (!isAuthenticated && true)} value={boardChoice || "default"}>
          <option value="default" disabled>
            Select board
          </option>
          {boards.map((e) => {
            return (
              <option key={e._id} value={e.name}>
                {e.name}
              </option>
            );
          })}
        </select>
        {(["Doing", "Done"].includes(boardChoice) || !isAuthenticated) && <input className="addTaskInput" type="text" name="date" id="date" defaultValue={(taskForEdit.dueDate && taskForEdit.dueDate.slice(0, 10)) || (taskForEdit.completedDate && taskForEdit.completedDate.slice(0, 10))} min={boardChoice === "Doing" || !isAuthenticated ? todayDate.toISOString().slice(0, 10) : undefined} max={boardChoice === "Done" ? todayDate.toISOString().slice(0, 10) : undefined} placeholder={boardChoice === "Doing" || !isAuthenticated ? "Chose due date" : "Chose completed date"} ref={dateRef} onFocus={() => (dateRef.current.type = "date")} onBlur={() => (dateRef.current.type = "text")} />}
        <select name="priorityChoice" id="priorityChoice" className="selectClass" defaultValue={taskForEdit.priorityChoice}>
          <option value="High Priority">High Priority</option>
          <option value="Medium Priority">Medium Priority</option>
          <option value="Low Priority">Low Priority</option>
        </select>
      </div>
      <div className="addBtnContainer">
        <input type="submit" value="Add Task" className="confirmAdd backgroundBtn" onClick={addTask} />
        <button
          onClick={() => {
            dispatcher(clearTags());
            dispatcher(resetEditTask());
            dispatcher(setPopUpLocation(null));
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
export default AddTask;
