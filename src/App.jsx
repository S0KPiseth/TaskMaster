import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import { useState, useEffect, useRef } from "react";
import { tasks } from "./lib/Constant";
import "./App.css";
import "./Query.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import TaskTab from "./pages/Task/TaskTab";
import Calendar from "./pages/Calendar/Calendar";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTabletScreen, setIsTabletScreen] = useState(window.matchMedia("(max-width: 1024px)").matches);
  const [acControlStatus, setAcControlStatus] = useState(false);
  const [sideBarStatus, setSideBarStatus] = useState(!isTabletScreen);
  const [addStatus, setAddStatus] = useState(false);
  const [hover, setHover] = useState(false);
  const [taskList, setTaskList] = useState([...tasks]);
  const tabRef = useRef(null);

  const location = useLocation();

  const completeTask = (id) => {
    setTaskList((prevList) => prevList.map((task, index) => (index === id ? [...task.slice(0, 5), "Complete"] : task)));
  };

  const navigate = (e) => {
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

  return (
    <>
      {location.pathname !== "/login" && (
        <>
          <div className={!sideBarStatus ? "content horizontalShaking" : "content"}>
            <Header isAuthenticated={isAuthenticated} isTabletScreen={isTabletScreen} setAcControlStatus={setAcControlStatus} acControlStatus={acControlStatus} showSidebarMobile={showSidebarMobile} />
            <div className="middleContent" ref={tabRef}>
              {acControlStatus && (
                <div className="accountPanel">
                  <a href="#Profile">View Profile</a>
                  <a href="#switch account">Switch Account</a>
                </div>
              )}
              <Routes>
                <Route path="/" element={<Dashboard taskList={taskList} setAddStatus={setAddStatus} />} />
                <Route path="/Tasks" element={<TaskTab taskList={taskList} setTaskList={setTaskList} addStatus={addStatus} setAddStatus={setAddStatus} completeTask={completeTask} isTabletScreen={isTabletScreen} />} />
                <Route path="/Calendar" element={<Calendar taskList={taskList} completeTask={completeTask} hover={hover} setHover={setHover} />} />
              </Routes>
            </div>
          </div>
          <Sidebar sideBarCloseNOpen={sideBarCloseNOpen} sideBarStatus={sideBarStatus} navigate={navigate} isTabletScreen={isTabletScreen} />
        </>
      )}

      {location.pathname === "/login" && (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
}

function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default RootApp;
