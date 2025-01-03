import SidebarButton from "./Components/SidebarBtn/SidebarButton";
import { useState, useRef, createContext, useEffect } from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import TaskTab from "./Components/TasksTab/TaskTab";
import Calendar from "./Components/Calendar/Calendar";

function App() {
  const now = new Date();
  const [acControlStatus, setAcControlStatus] = useState(false);
  const [navigationHelper, setNavigationHelper] = useState("Dashboard");
  //condition render for add task
  const [addStatus, setAddStatus] = useState(false);
  const [taskList, setTaskList] = useState([
    [
      "Check userContext",
      "The use context have been use in the project but it doesn't work properly.",
      [
        { tagname: "Urgent", color: "#fef2f2", textColor: "#8b0000" },
        { tagname: "Review", color: "#fffbe6", textColor: "#8b5e00" },
        { tagname: "roadblock", color: "#f2f6f2", textColor: "#004d00" },
      ],
      "2025-01-02",
      "Medium Priority",
      "In Progress",
    ],
    [
      "Project Update",
      "Update on the project status.",
      [
        { tagname: "Urgent", color: "#fef2f2", textColor: "#8b0000" },
        { tagname: "Review", color: "#fffbe6", textColor: "#8b5e00" },
        { tagname: "Completed", color: "#f2f6f2", textColor: "#004d00" },
      ],
      "2024-12-01",
      "High Priority",
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
      "High Priority",
      "Over due",
    ],
    [
      "New Feature",
      "Adding new features to the platform.",
      [
        { tagname: "New", color: "#fffbe6", textColor: "#8b5e00" },
        { tagname: "Feature", color: "#e0f7fa", textColor: "#004d40" },
      ],
      "2025-01-10",
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
      "2025-01-01",
      "Low Priority",
      "In Progress",
    ],
  ]);

  //complete task
  function completeTask(id) {
    const list = [...taskList];
    const task2Complete = [...list[id]];
    task2Complete[5] = "Complete";
    list[id] = task2Complete;
    setTaskList(list);
  }
  function overDueTasks(id) {
    const list = [...taskList];
    const task2Complete = [...list[id]];
    task2Complete[5] = "Over due";
    list[id] = task2Complete;
    setTaskList(list);
  }
  useEffect(() => {
    const currentYear = now.getFullYear(); // Year
    const currentMonth = String(now.getMonth() + 1).padStart(2, "0"); // Month
    const currentDate = String(now.getDate()).padStart(2, "0"); // Day

    const formattedDate = `${currentYear}-${currentMonth}-${currentDate}`;
    taskList.forEach((task, idx) => {
      task[3] < formattedDate && task[5] === "In Progress" ? overDueTasks(idx) : null;
    });
  }, [taskList]);

  function navigate(e) {
    setNavigationHelper(e);
  }
  let mainComponent = <Dashboard taskList={taskList} setNavigationHelper={setNavigationHelper} setAddStatus={setAddStatus} />;
  switch (navigationHelper) {
    case "Dashboard":
      mainComponent = <Dashboard taskList={taskList} setNavigationHelper={setNavigationHelper} setAddStatus={setAddStatus} />;
      break;
    case "Tasks":
      mainComponent = <TaskTab taskList={taskList} setTaskList={setTaskList} addStatus={addStatus} setAddStatus={setAddStatus} completeTask={completeTask} />;
      break;
    case "Calendar":
      mainComponent = <Calendar taskList={taskList} completeTask={completeTask} />;
      break;
    case "Settings":
      mainComponent = <p>Tasks</p>;
      break;
  }
  return (
    <>
      <div style={{ width: "250px", position: "relative" }}>
        <div className="sideBar">
          <div className="sideBarHeader">
            <a id="logo" href="./index.html">
              <svg width="40px" height="40px" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.947 9.523a3.333 3.333 0 0 1 5.107 4.287L18.055 31.683a3.333 3.333 0 1 1 -5.107 -4.283z" fill="black" />
                <path d="M5 21.233a3.333 3.333 0 1 1 6.667 0 3.333 3.333 0 0 1 -6.667 0" fill="green" />
              </svg>
              Task Master
            </a>
          </div>
          <hr />
          <div className="sideBarBtns">
            <SidebarButton navigate={navigate} navigationHelper={navigationHelper} name="Dashboard" />
            <SidebarButton navigate={navigate} navigationHelper={navigationHelper} name="Tasks" />
          </div>
          <hr />
          <div className="sideBarBtns">
            <SidebarButton navigate={navigate} navigationHelper={navigationHelper} name="Calendar" />
            <SidebarButton navigate={navigate} navigationHelper={navigationHelper} name="Settings" />
          </div>
          <footer>&copy; 2025 Piseth Sok. All rights reserved.</footer>
        </div>
      </div>
      <div className="content">
        <div className="header">
          <label htmlFor="">
            <input type="text" placeholder="Search..." />
          </label>

          <div>
            <button className="notification">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
            </button>
            <div className="account">
              <div className="profilePic">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="accountControl">
                <p>Name</p>
                <button
                  onClick={() => {
                    acControlStatus ? setAcControlStatus(false) : setAcControlStatus(true);
                  }}
                >
                  {!acControlStatus ? (
                    <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-labelledby="arrowhead-down-title">
                      <title id="arrowhead-down-title">arrowhead-down-solid</title>
                      <rect width="48" height="48" fill="none" />
                      <path d="M10.6,19.5l12,11.9a1.9,1.9,0,0,0,2.8,0l12-11.9A2,2,0,0,0,36,16H12a2,2,0,0,0-1.4,3.5Z" />
                    </svg>
                  ) : (
                    <svg width={20} height={20} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <title>{"arrowhead-up-solid"}</title>
                      <g id="Layer_2" data-name="Layer 2">
                        <g id="invisible_box" data-name="invisible box">
                          <rect width={48} height={48} fill="none" />
                        </g>
                        <g id="Q3_icons" data-name="Q3 icons">
                          <path d="M37.4,28.5l-12-11.9a1.9,1.9,0,0,0-2.8,0l-12,11.9A2,2,0,0,0,12,32H36a2,2,0,0,0,1.4-3.5Z" />
                        </g>
                      </g>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="middleContent">
          {acControlStatus && (
            <div className="accountPanel">
              <a href="#Profile">View Profile</a>
              <a href="#switch account">Switch Account</a>
            </div>
          )}
          {mainComponent}
          <div
            className="closeNopenSidebar"
            onMouseEnter={() => {
              document.querySelector("#sidebarCtrBtn").classList += "bouncingBtn";
              document.querySelector(".vertical-line").style.visibility = "visible";
            }}
            onMouseLeave={() => {
              document.querySelector("#sidebarCtrBtn").classList = [];
              document.querySelector(".vertical-line").style.visibility = "hidden";
            }}
          >
            <div className="vertical-line"></div>
            <button id="sidebarCtrBtn">
              <svg width="20px" height="20px" viewBox="0 0 1.2 1.2" xmlns="http://www.w3.org/2000/svg">
                <title>{"arrowhead-left"}</title>
                <g id="Layer_2" data-name="Layer 2">
                  <g id="invisible_box" data-name="invisible box">
                    <path width={48} height={48} fill="none" d="M0 0h1.2v1.2H0z" />
                  </g>
                  <g id="icons_Q2" data-name="icons Q2">
                    <path d="M0.52 0.6 0.78 0.34A0.1 0.1 0 0 0 0.77 0.27 0.1 0.1 0 0 0 0.7 0.28l-0.3 0.3a0.1 0.1 0 0 0 0 0.07l0.3 0.3a0.1 0.1 0 0 0 0.07 0.01 0.1 0.1 0 0 0 0.01 -0.07Z" />
                  </g>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
