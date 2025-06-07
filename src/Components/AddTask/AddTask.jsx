import axios from "axios";
import "../../pages/Task/TaskTab.css";
import TagContent from "../TagContent/TagContent";
import { useSelector, useDispatch } from "react-redux";
import { addTag, clearTags } from "../../application-state/tagSlice";
import { addNewTask, editExistTask, resetEditTask } from "../../application-state/taskListSlice";

//taskList, setAddStatus, tags, setTag, setTaskList, tagUpdate, editTaskValue, editTaskIndex
function AddTask({ setAddStatus }) {
  const tags = useSelector((state) => state.tagList.list);
  const user = useSelector((state) => state.isAuth.user);
  const taskForEdit = useSelector((state) => state.tasks.editTask);
  const dispatcher = useDispatch();
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
  function addTask(event) {
    //waiting for backend add task fixed
    const createdDate = new Date();
    const formattedDate = createdDate.toISOString().slice(0, 10);
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;
    const priorityChoice = document.getElementById("priorityChoice").value;
    const rqBody = {
      title: title,
      description: description,
      tags: tags,
      dueDate: date,
      priorityChoice: priorityChoice,
      status: "in progress",
      createdDate: formattedDate,
      userId: user._id || null,
      idx: taskForEdit._id,
    };

    if (title && date) {
      if (taskForEdit._id) {
        axios
          .put("http://localhost:5050/api/task", rqBody, { withCredentials: true })
          .then((res) => {
            dispatcher(editExistTask({ idx: taskForEdit._id, newTask: res.data.task }));
          })
          .catch((err) => {
            alert(`error:${err.response.status}:${err.response.data.msg}`);
          });
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
      alert("Task title and Due date cannot be empty!");
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
        <input className="addTaskInput" type="date" name="date" id="date" defaultValue={taskForEdit._id ? taskForEdit.dueDate.slice(0, 10) : null} />
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
