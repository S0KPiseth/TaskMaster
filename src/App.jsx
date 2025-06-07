import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import { useState, useRef, useEffect } from "react";
import { tasks } from "./lib/Constant";
import "./App.css";
import "./Query.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import TaskTab from "./pages/Task/TaskTab";
import Calendar from "./pages/Calendar/Calendar";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import UserAuthentication from "./pages/Login/Auth";
import LoginForm from "./pages/Login/LoginForm";
import RegisterForm from "./pages/Login/RegisterForm";
import { useDispatch } from "react-redux";
import { setUser } from "./application-state/authenticationSlice";

function App(props) {
  const [isTabletScreen, setIsTabletScreen] = useState(window.matchMedia("(max-width: 1024px)").matches);
  const [acControlStatus, setAcControlStatus] = useState(false);
  const [sideBarStatus, setSideBarStatus] = useState(!isTabletScreen);
  const [addStatus, setAddStatus] = useState(false);
  const [hover, setHover] = useState(false);
  const [taskList, setTaskList] = useState([...tasks]);
  const tabRef = useRef(null);
  const location = useLocation();
  const dispatcher = useDispatch();
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
      {!["/auth", "/auth/register"].includes(location.pathname) && (
        <>
          <div className={!sideBarStatus ? "content horizontalShaking" : "content"}>
            <Header isTabletScreen={isTabletScreen} setAcControlStatus={setAcControlStatus} acControlStatus={acControlStatus} showSidebarMobile={showSidebarMobile} />
            <div className="middleContent" ref={tabRef}>
              {acControlStatus && (
                <div
                  className="accountPanel"
                  onClick={() => {
                    setAcControlStatus(false);
                    dispatcher(setUser([]));
                    props.persistor.pause();
                    props.persistor.flush().then(() => {
                      return props.persistor.purge();
                    });
                  }}
                >
                  <button>View Profile</button>
                  <button>Switch Account</button>
                  <button>Log out</button>
                </div>
              )}
              <Routes>
                <Route path="/" element={<Dashboard setAddStatus={setAddStatus} />} />
                <Route path="/Tasks" element={<TaskTab taskList={taskList} setTaskList={setTaskList} addStatus={addStatus} setAddStatus={setAddStatus} completeTask={completeTask} isTabletScreen={isTabletScreen} />} />
                <Route path="/Calendar" element={<Calendar taskList={taskList} completeTask={completeTask} hover={hover} setHover={setHover} />} />
              </Routes>
            </div>
          </div>
          <Sidebar sideBarCloseNOpen={sideBarCloseNOpen} sideBarStatus={sideBarStatus} navigate={navigate} isTabletScreen={isTabletScreen} />
        </>
      )}

      {["/auth", "/auth/register"].includes(location.pathname) && (
        <Routes>
          <Route path="/auth" element={<UserAuthentication location={location} />}>
            <Route index element={<LoginForm />} />
            <Route path="/auth/register" element={<RegisterForm />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

function RootApp(props) {
  return (
    <Router>
      <App persistor={props.persistor} />
    </Router>
  );
}

export default RootApp;
