import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import "./App.css";
import "./Query.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import TaskTab from "./pages/Task/TaskTab";
import Calendar from "./pages/Calendar/Calendar";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import UserAuthentication from "./pages/Login/Auth";
import LoginForm from "./pages/Login/LoginForm";
import RegisterForm from "./pages/Login/RegisterForm";
import AccountControl from "./Components/AccountControl";
import axios from "axios";
function App(props) {
  const [isTabletScreen, setIsTabletScreen] = useState(window.matchMedia("(max-width: 1024px)").matches);
  const [acControlStatus, setAcControlStatus] = useState(false);
  const [sideBarStatus, setSideBarStatus] = useState(!isTabletScreen);
  const [addStatus, setAddStatus] = useState(false);
  const tabRef = useRef(null);
  const location = useLocation();

  const sideBarCloseNOpen = () => {
    setSideBarStatus((prev) => !prev);
  };
  const showSidebarMobile = () => {
    document.querySelector(".sideBar").classList += " show";
    document.querySelector(".sideBarContainer").classList += " show";
  };
  useEffect(() => {
    const setTablet = () => {
      setIsTabletScreen(window.matchMedia("(max-width: 1024px)").matches);
    };
    const toggleSideBarOff = () => {
      setSideBarStatus(false);
    };
    window.addEventListener("resize", setTablet);
    // document.body.addEventListener("mousedown", toggleSideBarOff);
    return () => {
      window.removeEventListener("resize", setTablet);
      // document.body.removeEventListener("mousedown", toggleSideBarOff);
    };
  }, []);
  useEffect(() => {
    setSideBarStatus(!isTabletScreen);
  }, [isTabletScreen]);
  useEffect(() => {
    if (tabRef.current) {
      const el = tabRef.current;
      el.style.animation = "none";
      void el.offsetWidth;
      el.style.animation = "";
    }
  }, [location]);
  return (
    <>
      {!["/auth", "/auth/register"].includes(location.pathname) && (
        <>
          <div className={!sideBarStatus ? "content horizontalShaking" : "content"}>
            <Header setAcControlStatus={setAcControlStatus} showSidebarMobile={showSidebarMobile} />
            {acControlStatus && <AccountControl persistor={props.persistor} />}
            <div className="middleContent" ref={tabRef}>
              <Routes>
                <Route path="/" element={<Dashboard setAddStatus={setAddStatus} />} />
                <Route path="/Tasks" element={<TaskTab addStatus={addStatus} setAddStatus={setAddStatus} isTabletScreen={isTabletScreen} />} />
                <Route path="/Calendar" element={<Calendar />} />
              </Routes>
            </div>
          </div>
          <Sidebar sideBarCloseNOpen={sideBarCloseNOpen} sideBarStatus={sideBarStatus} setAcControlStatus={setAcControlStatus} />
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
