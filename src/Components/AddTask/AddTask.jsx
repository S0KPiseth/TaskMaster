import axios from "axios";
import "../../pages/Task/TaskTab.css";
import TagContent from "../TagContent/TagContent";
import { useSelector, useDispatch } from "react-redux";
import { addTag, changeColor, clearTags } from "../../application-state/tagSlice";
import { useRef } from "react";

//taskList, setAddStatus, tags, setTag, setTaskList, tagUpdate, editTaskValue, editTaskIndex
function AddTask({ taskList, setAddStatus, setTaskList, editTaskValue, editTaskIndex }) {
  const tags = useSelector((state) => state.tagList.list);
  const tagUpdate = useRef([]);
  const dispatcher = useDispatch();
  function removeTag(idx) {
    // const updatedArray = tags.filter((_, index) => index !== idx);
    // setTag(updatedArray);
  }
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
    const createdDate = new Date();
    const formattedDate = createdDate.toISOString().slice(0, 10);
    event.preventDefault();
    const task = new FormData(event.target);
    if (task.get("title") && task.get("date")) {
      // let tagConfig = tags;
      tagUpdate.current.forEach((element) => {
        const [r, g, b] = element[1]
          .replace(/^#/, "")
          .match(/.{2}/g)
          .map((hex) => parseInt(hex, 16));
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        let textColor = luminance > 0.5 ? "#000000" : "#FFFFFF";
        dispatcher(changeColor({ idxToUpdate: element[0], updatedColor: element[1], improveTexColor: textColor }));

        // tagConfig[element[0]].color = element[1];
        // tagConfig[element[0]].textColor = textColor;
      });
      tagUpdate.current = [];
      console.log(tags);

      const e = document.getElementById("priorityChoice");
      const text = e.options[e.selectedIndex].text;
      const taskToAdd = [document.getElementById("title").value, document.getElementById("description").value, tags, document.getElementById("date").value, text, "In Progress"];
      if (editTaskIndex.current == null) {
        axios
          .put("http://localhost:5050/api/task", {
            title: task.get("title"),
            description: task.get("description"),
            tags: tags,
            dueDate: task.get("date"),
            priorityChoice: task.get("priorityChoice"),
            status: "in progress",
            createdDate: formattedDate,
          })
          .then((res) => {
            console.log(res.data);
          });
        setTaskList((t) => [...t, taskToAdd]);
      } else {
        const tempTask = [...taskList];
        tempTask[editTaskIndex.current] = taskToAdd;
        setTaskList(tempTask);
        editTaskIndex.current = null;
        editTaskValue.current = [];
      }

      setAddStatus(false);
      dispatcher(clearTags());
    } else {
      alert("Task title and Due date cannot be empty!");
    }
  }

  return (
    <form className="addTask" onSubmit={addTask}>
      <h3 id="header">Add New Task</h3>
      <input className="addTaskInput" type="text" name="title" id="title" placeholder="Task title" required defaultValue={editTaskValue.current[0]} />
      <input className="addTaskInput" type="text" name="description" id="description" placeholder="Task description" defaultValue={editTaskValue.current[1]} />
      <label htmlFor="">
        {tags.map((e, idx) => {
          return <TagContent key={idx} tagElement={e} tags={tags} index={idx} removeTag={removeTag} tagUpdate={tagUpdate} />;
        })}

        <input className="addTaskInput" type="text" name="" placeholder="add tags" onKeyDown={(e) => addNewTag(e)} />
      </label>

      <div className="lastInput">
        <input className="addTaskInput" type="date" name="date" id="date" defaultValue={editTaskValue.current[3]} />
        <select name="priorityChoice" id="priorityChoice" className="selectClass" defaultValue={editTaskValue.current[4]}>
          <option value="High Priority">High Priority</option>
          <option value="Medium Priority">Medium Priority</option>
          <option value="Low Priority">Low Priority</option>
        </select>
      </div>
      <div className="addBtnContainer">
        <input type="submit" value="Add Task" className="confirmAdd backgroundBtn" />
        <button
          onClick={() => {
            setTag([]);
            setAddStatus(false);
            editTaskIndex.current = null;
            editTaskValue.current = [];
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
export default AddTask;
