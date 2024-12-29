import { useState, useRef, useEffect } from "react";
import "./TaskTab.css";
import TaskCard from "./TaskCard";

function TaskTab() {
  const tagUpdate = useRef([]);
  const [addStatus, setAddStatus] = useState(false);
  const [taskList, setTaskList] = useState([
    [
      "Project Update",
      "Update on the project status.",
      [
        { tagname: "Urgent", color: "#fef2f2", textColor: "#8b0000" },
        { tagname: "Review", color: "#fffbe6", textColor: "#8b5e00" },
        { tagname: "Completed", color: "#f2f6f2", textColor: "#004d00" },
      ],
      "2024-01-01",
      "Hight Priority",
      "In Progress",
    ],
    [
      "Bug Fix",
      "Fixing critical bug in the system.",
      [
        { tagname: "Critical", color: "#fef2f2", textColor: "#8b0000" },
        { tagname: "Bug", color: "#e6f7ff", textColor: "#0066cc" },
      ],
      "2024-01-05",
      "Hight Priority",
      "Over due",
    ],
    [
      "New Feature",
      "Adding new features to the platform.",
      [
        { tagname: "New", color: "#fffbe6", textColor: "#8b5e00" },
        { tagname: "Feature", color: "#e0f7fa", textColor: "#004d40" },
      ],
      "2024-01-10",
      "Medium Priority",
      "Complete",
    ],
    [
      "Client Meeting",
      "Meeting with the client to discuss project progress.",
      [
        { tagname: "Client", color: "#f2f6f2", textColor: "#004d00" },
        { tagname: "Meeting", color: "#ffe0b2", textColor: "#e65100" },
      ],
      "2024-01-15",
      "Low Priority",
      "In Progress",
    ],
  ]);
  //filter option
  const [filterOption, setFilterOption] = useState(["All Status", "All Priority"]);

  // edit task
  const editTaskValue = useRef([]);
  const idxOfT2E = useRef(null);

  const [tags, setTag] = useState([]);
  const [newList, setNewList] = useState(taskList);

  useEffect(filterTask, [taskList]);

  //Filter task
  function filterTask() {
    const filter1 = document.getElementById("status");
    const filter2 = document.getElementById("priority");
    const filter1_option = filter1.options[filter1.selectedIndex].text;
    const filter2_option = filter2.options[filter2.selectedIndex].text;
    setFilterOption([filter1_option, filter2_option]);
    let tempList = taskList.filter((e) => {
      const statusMatch = filter1_option === "All Status" || e[5] === filter1_option;
      const priorityMatch = filter2_option === "All Priority" || e[4] === filter2_option;

      return statusMatch && priorityMatch;
    });
    setNewList(tempList);
    // console.log(taskList);
    // console.log(newList);
  }
  // edit task
  function editTask(id) {
    idxOfT2E.current = id;
    const task2edit = newList[id];
    editTaskValue.current = task2edit;
    setTag(editTaskValue.current[2]);
    setAddStatus(true);
  }
  //complete task
  function completeTask(id) {
    const list = [...taskList];
    const task2Complete = [...list[id]];
    task2Complete[5] = "Complete";
    list[id] = task2Complete;
    console.log(list);
    setTaskList(list);
  }
  //delete task
  function deleteTask(id) {
    const list = [...taskList];
    const updateList = list.filter((_, idx) => {
      return idx != id;
    });
    setTaskList(updateList);
  }

  return (
    <>
      <div className="tasksTabContent">
        <div>
          <div className="headerTask" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2>Tasks Management</h2>
            <button
              className="addTaskBtn"
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
          <select className="selectClass" id="status" onChange={filterTask}>
            <option value="" defaultValue>
              All Status
            </option>
            <option value="">In Progress</option>
            <option value="">Complete</option>
            <option value="">Over due</option>
          </select>
          <select className="selectClass" id="priority" onChange={filterTask}>
            <option value="" defaultValue>
              All Priority
            </option>
            <option value="">Hight Priority</option>
            <option value="">Medium Priority</option>
            <option value="">Low Priority</option>
          </select>
        </div>
        {addStatus && (
          <>
            {" "}
            <AddTask taskList={taskList} setAddStatus={setAddStatus} tags={tags} setTag={setTag} setTaskList={setTaskList} tagUpdate={tagUpdate} editTaskValue={editTaskValue} editTaskIndex={idxOfT2E.current} /> <br />
          </>
        )}

        {newList.map((e, index) => {
          return (
            <>
              <TaskCard taskList={e} setAddStatus={setAddStatus} editTask={editTask} index={index} completeTask={completeTask} deleteTask={deleteTask} />
              <br />
            </>
          );
        })}
      </div>
    </>
  );
}
export default TaskTab;

function AddTask({ taskList, setAddStatus, tags, setTag, setTaskList, tagUpdate, editTaskValue, editTaskIndex }) {
  function removeTag(idx) {
    const updatedArray = tags.filter((_, index) => index !== idx);
    setTag(updatedArray);
  }
  function addTag(e) {
    if (e.key == "Enter" && e.target.value != "") {
      setTag((t) => [...t, { tagname: e.target.value, color: "black", textColor: "white" }]);
    } else if (e.key == "Enter" && e.target.value == "") {
      e.target.className = "shakingInput";
      setTimeout(() => {
        e.target.className = "";
      }, 200);
    }
  }
  function addTask() {
    if (document.getElementById("title").value && document.getElementById("date").value) {
      let tagConfig = tags;
      tagUpdate.current.forEach((element) => {
        const [r, g, b] = element[1]
          .replace(/^#/, "")
          .match(/.{2}/g)
          .map((hex) => parseInt(hex, 16));
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        let textColor = luminance > 0.5 ? "#000000" : "#FFFFFF";

        tagConfig[element[0]].color = element[1];
        tagConfig[element[0]].textColor = textColor;
      });
      tagUpdate.current = [];

      const e = document.getElementById("priorityChoice");
      const text = e.options[e.selectedIndex].text;
      const taskToAdd = [document.getElementById("title").value, document.getElementById("description").value, tags, document.getElementById("date").value, text, "In Progress"];
      if (editTaskIndex == null) {
        setTaskList((t) => [...t, taskToAdd]);
      } else {
        const tempTask = [...taskList];
        tempTask[editTaskIndex] = taskToAdd;
        setTaskList(tempTask);
        editTaskValue.current = [];
      }

      setAddStatus(false);
      setTag([]);
    } else {
      alert("Task title and Due date cannot be empty!");
    }
  }

  return (
    <div className="addTask">
      <h3 id="header">Add New Task</h3>
      <input type="text" name="" id="title" placeholder="Task title" required defaultValue={editTaskValue.current[0]} />
      <input type="text" name="" id="description" placeholder="Task description" defaultValue={editTaskValue.current[1]} />
      <label htmlFor="">
        {tags.map((e, idx) => {
          return <TagContent key={idx} tagElement={e} tags={tags} index={idx} removeTag={removeTag} tagUpdate={tagUpdate} />;
        })}

        <input type="text" name="" placeholder="add tags" onKeyDown={(e) => addTag(e)} />
      </label>

      <div className="lastInput">
        <input type="date" name="" id="date" defaultValue={editTaskValue.current[3]} />
        <select name="" id="priorityChoice" className="selectClass" defaultValue={editTaskValue.current[4]}>
          <option value="Hight Priority">Hight Priority</option>
          <option value="Medium Priority">Medium Priority</option>
          <option value="Low Priority">Low Priority</option>
        </select>
      </div>
      <div className="addBtnContainer">
        <button className="addTaskBtn" onClick={addTask}>
          Add Task
        </button>
        <button
          className="addTaskBtn"
          onClick={() => {
            setTag([]);
            setAddStatus(false);
            editTaskValue.current = [];
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function TagContent({ removeTag, tagElement, index, tagUpdate }) {
  function color(e) {
    let temTag = tagUpdate.current;
    temTag[index] = [index, e.target.value];
    tagUpdate.current = temTag;
  }
  return (
    <div
      style={{
        marginRight: "5px",
        position: "relative",
        paddingLeft: "5px",
        borderRadius: "1rem",
        height: "25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: "5px",
        backgroundColor: "var(--color-primary-100)",
      }}
    >
      <input type="color" id="style2" onChange={color} defaultValue={tagElement.color} />
      <p
        style={{
          fontSize: "var(--text-sm)",
          color: "var(--color-primary-700)",
          fontWeight: "--font-semibold",
          paddingRight: "30px",
        }}
      >
        {tagElement.tagname}
      </p>
      <button
        style={{
          color: "var(--color-primary-700)",
          fontSize: "var(--text-xs)",
          backgroundColor: "var(--color-primary-200)",
          border: "0",
          position: "absolute",
          right: "0",
          borderRadius: "2rem",
          height: "25px",
          width: "25px",
        }}
        onClick={() => removeTag(index)}
      >
        &#10006;
      </button>
    </div>
  );
}
