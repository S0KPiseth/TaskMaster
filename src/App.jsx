import SidebarButton from "./Components/SidebarBtn/SidebarButton";
import { useState, useEffect } from "react";
import "./App.css";
import "./Query.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import TaskTab from "./Components/TasksTab/TaskTab";
import Calendar from "./Components/Calendar/Calendar";

function App() {
  const [isTabletScreen, setIsTabletScreen] = useState(window.matchMedia("(max-width: 768px)").matches);
  const [acControlStatus, setAcControlStatus] = useState(false);
  const [navigationHelper, setNavigationHelper] = useState("Tasks");
  const [sideBarStatus, setSideBarStatus] = useState(!isTabletScreen);
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
  ]);

  // Handle screen size changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleResize = (e) => {
      setIsTabletScreen(e.matches);
      setSideBarStatus(!e.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  // Check for overdue tasks
  useEffect(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
    const currentDate = String(now.getDate()).padStart(2, "0");
    const formattedDate = `${currentYear}-${currentMonth}-${currentDate}`;

    setTaskList((prevTaskList) => prevTaskList.map((task) => (task[3] < formattedDate && task[5] === "In Progress" ? [...task.slice(0, 5), "Over due"] : task)));
  }, []);

  const completeTask = (id) => {
    setTaskList((prevList) => prevList.map((task, index) => (index === id ? [...task.slice(0, 5), "Complete"] : task)));
  };

  const navigate = (e) => {
    setNavigationHelper(e);
  };

  const sideBarCloseNOpen = () => {
    setSideBarStatus((prev) => !prev);
  };

  const renderMainComponent = () => {
    switch (navigationHelper) {
      case "Dashboard":
        return <Dashboard taskList={taskList} setNavigationHelper={setNavigationHelper} setAddStatus={setAddStatus} />;
      case "Tasks":
        return <TaskTab taskList={taskList} setTaskList={setTaskList} addStatus={addStatus} setAddStatus={setAddStatus} completeTask={completeTask} />;
      case "Calendar":
        return <Calendar taskList={taskList} completeTask={completeTask} />;
      case "Settings":
        return <p>Settings</p>;
      default:
        return <Dashboard taskList={taskList} setNavigationHelper={setNavigationHelper} setAddStatus={setAddStatus} />;
    }
  };

  return (
    <>
      <div className="content">
        <div className="header">
          <label>
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
                <button onClick={() => setAcControlStatus((prev) => !prev)}>
                  <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <title>{acControlStatus ? "arrowhead-up-solid" : "arrowhead-down-solid"}</title>
                    <rect width="48" height="48" fill="none" />
                    <path d={acControlStatus ? "M37.4,28.5l-12-11.9a1.9,1.9,0 0,0-2.8,0l-12,11.9A2,2,0,0,0,12,32H36a2,2,0,0,0,1.4-3.5Z" : "M10.6,19.5l12,11.9a1.9,1.9,0,0,0,2.8,0l12-11.9A2,2,0,0,0,36,16H12a2,2,0,0,0-1.4,3.5Z"} />
                  </svg>
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
          {renderMainComponent()}
        </div>
      </div>
      <div className={`sideBarContainer ${sideBarStatus ? "width-250" : "width-60"}`}>
        <div className={`sideBar ${sideBarStatus ? "width-250" : "width-60"}`}>
          <div className="sideBarHeader">
            <a id="logo" href="./index.html" style={{ paddingLeft: sideBarStatus ? "10px" : undefined }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.947 9.523a3.333 3.333 0 0 1 5.107 4.287L18.055 31.683a3.333 3.333 0 1 1 -5.107 -4.283z" fill="black" />
                <path d="M5 21.233a3.333 3.333 0 1 1 6.667 0 3.333 3.333 0 0 1 -6.667 0" fill="green" />
              </svg>
              {sideBarStatus && "Task Master"}
            </a>
          </div>
          <hr />
          <div className="sideBarBtns" style={{ marginLeft: sideBarStatus ? "5px" : "auto" }}>
            <SidebarButton navigate={navigate} navigationHelper={navigationHelper} name="Dashboard" sideBarStatus={sideBarStatus} />
            <SidebarButton navigate={navigate} navigationHelper={navigationHelper} name="Tasks" sideBarStatus={sideBarStatus} />
          </div>
          <hr />
          <div className="sideBarBtns" style={{ marginLeft: sideBarStatus ? "5px" : "auto" }}>
            <SidebarButton navigate={navigate} navigationHelper={navigationHelper} name="Calendar" sideBarStatus={sideBarStatus} />
            <SidebarButton navigate={navigate} navigationHelper={navigationHelper} name="Settings" sideBarStatus={sideBarStatus} />
          </div>
          <footer>{sideBarStatus && "© 2025 Piseth Sok. All rights reserved."}</footer>
          <div
            className="closeNopenSidebar"
            onMouseEnter={() => {
              if (!isTabletScreen) {
                const sidebarBtn = document.querySelector("#sidebarCtrBtn");
                const verticalLine = document.querySelector(".vertical-line");
                if (sidebarBtn && verticalLine) {
                  sidebarBtn.classList.add("bouncingBtn");
                  verticalLine.style.visibility = "visible";
                }
              }
            }}
            onMouseLeave={() => {
              const sidebarBtn = document.querySelector("#sidebarCtrBtn");
              const verticalLine = document.querySelector(".vertical-line");
              if (sidebarBtn && verticalLine) {
                sidebarBtn.classList.remove("bouncingBtn");
                verticalLine.style.visibility = "hidden";
              }
            }}
          >
            <div className="vertical-line"></div>
            <button id="sidebarCtrBtn" onClick={sideBarCloseNOpen}>
              <svg
                id="arrowhead"
                width="20"
                height="20"
                viewBox="0 0 1.2 1.2"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: sideBarStatus ? "rotate(1turn)" : "rotate(0.5turn)",
                }}
              >
                <title>arrowhead-left</title>
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
