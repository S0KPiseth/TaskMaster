import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import { useState, useEffect, useRef } from "react";
import { tasks } from "./lib/Constant";
import "./App.css";
import "./Query.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import TaskTab from "./pages/Task/TaskTab";
import Calendar from "./pages/Calendar/Calendar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTabletScreen, setIsTabletScreen] = useState(window.matchMedia("(max-width: 1024px)").matches);
  const [acControlStatus, setAcControlStatus] = useState(false);
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
  const handleCapture = (e) => {
    if (!moveMentRef.current) return;
    const middleBox = tabRef.current.getBoundingClientRect();
    moveMentRef.current.style.left = `${e.clientX - middleBox.left}px`;
    moveMentRef.current.style.top = `${e.clientY}px`;
  };
  return (
    <>
      <Router>
        <div className={!sideBarStatus ? "content horizontalShaking" : "content"} onMouseMove={handleCapture}>
          <Header isAuthenticated={isAuthenticated} isTabletScreen={isTabletScreen} moveMentRef={moveMentRef} setAcControlStatus={setAcControlStatus} acControlStatus={acControlStatus} showSidebarMobile={showSidebarMobile} />
          <div className="middleContent" ref={tabRef}>
            {acControlStatus && (
              <div className="accountPanel">
                <a href="#Profile">View Profile</a>
                <a href="#switch account">Switch Account</a>
              </div>
            )}
            <Routes>
              <Route path="/" exact element={<Dashboard taskList={taskList} setAddStatus={setAddStatus} />} />
              <Route path="/Tasks" element={<TaskTab taskList={taskList} setTaskList={setTaskList} addStatus={addStatus} setAddStatus={setAddStatus} completeTask={completeTask} isTabletScreen={isTabletScreen} />} />
              <Route path="/Calendar" element={<Calendar taskList={taskList} completeTask={completeTask} hover={hover} setHover={setHover} />} />
            </Routes>
          </div>
        </div>
        <Sidebar sideBarCloseNOpen={sideBarCloseNOpen} sideBarStatus={sideBarStatus} navigate={navigate} isTabletScreen={isTabletScreen} />
      </Router>
    </>
  );
}

export default App;
