import { Authenticated } from "./Components/AccountOptions/Authenticated";
import Unauthorized from "./Components/AccountOptions/Unauthorized";
import SidebarButton from "./Components/SidebarBtn/SidebarButton";
import { useState, useEffect, useRef } from "react";
import { tasks } from "./lib/Constant";
import "./App.css";
import "./Query.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import TaskTab from "./Components/TasksTab/TaskTab";
import Calendar from "./Components/Calendar/Calendar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTabletScreen, setIsTabletScreen] = useState(window.matchMedia("(max-width: 1024px)").matches);
  const [acControlStatus, setAcControlStatus] = useState(false);
  const [navigationHelper, setNavigationHelper] = useState("Tasks");
  const [sideBarStatus, setSideBarStatus] = useState(!isTabletScreen);
  const [addStatus, setAddStatus] = useState(false);
  const [hover, setHover] = useState(false);
  const [taskList, setTaskList] = useState([...tasks]);
  const tabRef = useRef(null);
  const moveMentRef = useRef(null);

  // Handle screen size changes
  useEffect(() => {
    const tabletQuery = window.matchMedia("(max-width: 1024px)");
    const phoneQuery = window.matchMedia("(max-width: 480px)");

    const handleBodyClick = () => {
      document.querySelector(".sideBar").classList.remove("show");
      document.querySelector(".sideBarContainer").classList.remove("show");
    };

    const handleResize = () => {
      if (phoneQuery.matches) {
        // Phone size: sidebar should be true (open) and add body click listener
        setIsTabletScreen(true);
        setSideBarStatus(true);
        setHover(true);
        document.querySelector(".content").addEventListener("click", handleBodyClick);
      } else if (tabletQuery.matches) {
        // Tablet size: sidebar should be false (closed)
        setIsTabletScreen(true);
        setSideBarStatus(false);
        setHover(false);
        document.body.removeEventListener("click", handleBodyClick);
      } else {
        // Larger screens: not tablet and sidebar open
        setHover(false);
        setIsTabletScreen(false);
        setSideBarStatus(true);
        document.body.removeEventListener("click", handleBodyClick);
      }
    };

    // Initial check
    handleResize();

    // Add listeners to both queries
    tabletQuery.addEventListener("change", handleResize);
    phoneQuery.addEventListener("change", handleResize);

    // Cleanup
    return () => {
      tabletQuery.removeEventListener("change", handleResize);
      phoneQuery.removeEventListener("change", handleResize);
      document.querySelector(".content").removeEventListener("click", handleBodyClick);
    };
  }, []);

  // Check for overdue tasks
  useEffect(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
    const currentDate = String(now.getDate()).padStart(2, "0");
    const formattedDate = `${currentYear}-${currentMonth}-${currentDate}`;

    setTaskList((prevTaskList) => prevTaskList.map((task) => (task[3] < formattedDate && task[5] === "In Progress" ? [...task.slice(0, 5), "Over due"] : task)));
  }, [addStatus]);

  const completeTask = (id) => {
    setTaskList((prevList) => prevList.map((task, index) => (index === id ? [...task.slice(0, 5), "Complete"] : task)));
  };

  const navigate = (e) => {
    setNavigationHelper(e);
    if (tabRef) {
      tabRef.current.classList += " animate__bounceInUp";
      setTimeout(() => tabRef.current.classList.remove("animate__bounceInUp"), 500);
    }
  };

  const sideBarCloseNOpen = () => {
    setSideBarStatus((prev) => !prev);
  };
  const showSidebarMobile = () => {
    document.querySelector(".sideBar").classList += " show";
    document.querySelector(".sideBarContainer").classList += " show";
  };
  const renderMainComponent = () => {
    switch (navigationHelper) {
      case "Dashboard":
        return <Dashboard taskList={taskList} setNavigationHelper={setNavigationHelper} setAddStatus={setAddStatus} />;
      case "Tasks":
        return <TaskTab taskList={taskList} setTaskList={setTaskList} addStatus={addStatus} setAddStatus={setAddStatus} completeTask={completeTask} isTabletScreen={isTabletScreen} />;
      case "Calendar":
        return <Calendar taskList={taskList} completeTask={completeTask} hover={hover} setHover={setHover} />;
      case "Settings":
        return <p>Settings</p>;
      default:
        return <Dashboard taskList={taskList} setNavigationHelper={setNavigationHelper} setAddStatus={setAddStatus} />;
    }
  };
  const handleCapture = (e) => {
    if (!moveMentRef.current) return;
    const middleBox = tabRef.current.getBoundingClientRect();
    moveMentRef.current.style.left = `${e.clientX - middleBox.left}px`;
    moveMentRef.current.style.top = `${e.clientY}px`;
  };
  return (
    <>
      <div className={!sideBarStatus ? "content horizontalShaking" : "content"} onMouseMove={handleCapture}>
        <div className="header">
          {!isTabletScreen && <div id="mouseMovement" ref={moveMentRef}></div>}
          <div>
            <button id="menuButton" onClick={showSidebarMobile}>
              <svg width="25px" height="25px" viewBox="0 0 0.531 0.531" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <path d="M0.5 0.094v0.063H0.031V0.094zM0.031 0.313h0.469V0.25H0.031zm0 0.156h0.469v-0.063H0.031z" fill="currentColor" />
              </svg>
            </button>
            <label id="searchBar">
              <svg width="25px" height="25px" viewBox="0 0 0.6 0.6" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" transform="matrix(6.123233995736766e-17,1,-1,6.123233995736766e-17,0,0)">
                <path d="M0.275 0.475a0.2 0.2 0 1 0 0 -0.4 0.2 0.2 0 0 0 0 0.4" stroke="currentColor" strokeWidth={0.05} strokeLinecap="round" strokeLinejoin="round" />
                <path d="m0.525 0.525 -0.1 -0.1" stroke="currentColor" strokeWidth={0.05} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input type="text" placeholder="Search..." />
            </label>
          </div>

          {isAuthenticated ? <Authenticated setAcControlStatus={setAcControlStatus} acControlStatus={acControlStatus} /> : <Unauthorized />}
        </div>
        <div className="middleContent" ref={tabRef}>
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
                <path d="M27.947 9.523a3.333 3.333 0 0 1 5.107 4.287L18.055 31.683a3.333 3.333 0 1 1 -5.107 -4.283z" fill="currentColor" />
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
                  fill: "currentColor",
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
