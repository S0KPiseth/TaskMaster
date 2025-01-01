import { useState, useRef, createContext, useEffect } from "react";
import "./App.css";
import Dashboard from "./Dashboard";
import TaskTab from "./TaskTab";
import Calendar from "./Calendar";
function App() {
  const now = new Date();
  const [acControlStatus, setAcControlStatus] = useState(false);
  const [navigationHelper, setNavigationHelper] = useState("Calendar");
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
      "2025-01-01",
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
    taskList.forEach((task, idx) => {
      const date = task[3].split("-");
      console.log(date[0]);

      new Date(date[0], date[1] - 1, date[2]) < now && task[5] === "In Progress" ? overDueTasks(idx) : null;
    });
  }, [taskList]);

  function navigate(e) {
    setNavigationHelper(e.target.textContent);
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
      <div style={{ width: "20%" }}>
        <div className="sideBar">
          <a style={{ textDecoration: "none" }} href="./index.html">
            Task Master
          </a>
          <br />
          <br />
          <div className="sideBarBtns">
            <button
              onClick={(e) => {
                navigate(e);
              }}
              className={navigationHelper === "Dashboard" ? "sideBarBtn activeTab" : "sideBarBtn"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="7" height="9" x="3" y="3" rx="1"></rect>
                <rect width="7" height="5" x="14" y="3" rx="1"></rect>
                <rect width="7" height="9" x="14" y="12" rx="1"></rect>
                <rect width="7" height="5" x="3" y="16" rx="1"></rect>
              </svg>
              Dashboard
            </button>
            <button
              onClick={(e) => {
                navigate(e);
              }}
              className={navigationHelper === "Tasks" ? "sideBarBtn activeTab" : "sideBarBtn"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 11 3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
              Tasks
            </button>
            <hr />
            <button
              onClick={(e) => {
                navigate(e);
              }}
              className={navigationHelper === "Calendar" ? "sideBarBtn activeTab" : "sideBarBtn"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
              Calendar
            </button>
            <hr />
            <button
              onClick={(e) => {
                navigate(e);
              }}
              className={navigationHelper === "Settings" ? "sideBarBtn activeTab" : "sideBarBtn"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              Settings
            </button>
          </div>
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
        </div>
      </div>
    </>
  );
}

export default App;
