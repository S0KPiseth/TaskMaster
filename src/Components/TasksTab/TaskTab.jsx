import React, { useState, useRef, useEffect } from "react";
import "./TaskTab.css";
import TaskCard from "../TaskCard/TaskCard";
import AddTask from "./AddTask/AddTask";

function TaskTab({ taskList, setTaskList, addStatus, setAddStatus, completeTask, isTabletScreen }) {
  const tagUpdate = useRef([]);

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
            <option value="">High Priority</option>
            <option value="">Medium Priority</option>
            <option value="">Low Priority</option>
          </select>
        </div>
        {addStatus && (
          <>
            <AddTask taskList={taskList} setAddStatus={setAddStatus} tags={tags} setTag={setTag} setTaskList={setTaskList} tagUpdate={tagUpdate} editTaskValue={editTaskValue} editTaskIndex={idxOfT2E.current} /> <br />
          </>
        )}

        {newList.map((e, index) => {
          return (
            <React.Fragment key={index}>
              <TaskCard taskList={e} setAddStatus={setAddStatus} editTask={editTask} index={index} completeTask={completeTask} deleteTask={deleteTask} isTabletScreen={isTabletScreen} />
              <br />
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}
export default TaskTab;
