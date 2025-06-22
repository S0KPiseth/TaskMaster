import axios from "axios";
import "../../pages/Task/TaskTab.css";
import TagContent from "../TagContent/TagContent";
import { useSelector, useDispatch } from "react-redux";
import { addTag, clearTags } from "../../application-state/tagSlice";
import { addNewTask, editExistTask, resetEditTask } from "../../application-state/taskListSlice";
import { useEffect, useRef, useState } from "react";

//taskList, setAddStatus, tags, setTag, setTaskList, tagUpdate, editTaskValue, editTaskIndex
function AddTask({ setAddStatus }) {
  const tags = useSelector((state) => state.tagList.list);
  const user = useSelector((state) => state.isAuth.user);
  const taskForEdit = useSelector((state) => state.tasks.editTask);
  const taskList = useSelector((state) => state.tasks.list);
  const dateRef = useRef(null);
  const searchRef = useRef(null);
  const [boardChoice, setBoardChoice] = useState(null);
  const [searchDoing, setSearchDoing] = useState(null);
  const dispatcher = useDispatch();
  const boards = useSelector((state) => state.board.boardList);

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
  const handleChoseSearch = (task) => {
    searchRef.current = task._id;
    document.getElementById("sequenceTask").value = task.title;
    setSearchDoing(null);
  };

  function addTask(event) {
    console.log("hi");
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
      dueDate: boardChoice === "Doing" ? date.value : undefined,
      completedDate: boardChoice === "Done" ? date.value : undefined,
      taskToAddNext: searchRef.current ? searchRef.current : undefined,
      priorityChoice,
      status: "In progress",
      createdDate: formattedDate,
      userId: user?._id,
      idx: taskForEdit?._id,
      boardId: board?._id,
      boardName: user ? boardChoice : "To Do",
    };

    if (title) {
      if (taskForEdit._id) {
        if (user) {
          axios
            .put("http://localhost:5050/api/task", rqBody, { withCredentials: true })
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
          .post("http://localhost:5050/api/task", rqBody, { withCredentials: true })
          .then((res) => {
            dispatcher(addNewTask(res.data.task));
            //clear the data that assign to the add task input fields
            dispatcher(resetEditTask());
          })
          .catch((err) => {
            alert(`error:${err.response.status}:${err.response.data.msg}`);
          });
      }

      setAddStatus(false);
      dispatcher(clearTags());
    } else {
      alert("Task title cannot be empty!");
    }
  }

  return (
    <div
      className="addTask"
      id="taskForm"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
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
        <select name="board" id="board" className="selectClass" onChange={(e) => setBoardChoice(e.target.value)}>
          <option value="none" defaultValue disabled>
            Select board
          </option>
          {boards.map((e) => {
            return (
              <option key={e._id} value={e.name} selected={boardChoice === e.name}>
                {e.name}
              </option>
            );
          })}
        </select>
        {boardChoice === "To Do" ? (
          <div className="toDoTaskDiv">
            <input type="text" name="sequenceTask" id="sequenceTask" placeholder="Automatically move to doing after task (optional)" className="addTaskInput" onChange={(e) => setSearchDoing(e.target.value)} />
            {searchDoing && (
              <div className="sequenceTaskSearch">
                {taskList
                  .filter((e) => e.boardName === "Doing" && e.title.slice(0, searchDoing.length) === searchDoing)
                  .map((e) => (
                    <p
                      key={e._id}
                      onClick={() => {
                        handleChoseSearch(e);
                      }}
                    >
                      {e.title}
                    </p>
                  ))}
              </div>
            )}
          </div>
        ) : (
          <input className="addTaskInput" type="text" name="date" id="date" defaultValue={taskForEdit._id && taskForEdit.dueDate.slice(0, 10)} min={todayDate.toISOString().slice(0, 10)} placeholder={boardChoice === "Doing" ? "Chose due date" : "Chose completed date"} ref={dateRef} onFocus={() => (dateRef.current.type = "date")} onBlur={() => (dateRef.current.type = "text")} />
        )}
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
            setAddStatus(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
export default AddTask;
