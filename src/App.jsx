import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import { useState, useRef, useEffect } from "react";
import "./App.css";
import "./Query.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import TaskTab from "./pages/Task/TaskTab";
import Calendar from "./pages/Calendar/Calendar";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import UserAuthentication from "./pages/Login/Auth";
import LoginForm from "./pages/Login/LoginForm";
import RegisterForm from "./pages/Login/RegisterForm";
import AccountControl from "./Components/AccountControl";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

function App(props) {
  //register gsap plugins
  gsap.registerPlugin(useGSAP, ScrollToPlugin);

  const [isTabletScreen, setIsTabletScreen] = useState(window.matchMedia("(max-width: 1024px)").matches);
  const [acControlStatus, setAcControlStatus] = useState(false);
  const [sideBarStatus, setSideBarStatus] = useState(!isTabletScreen);

  const tabRef = useRef(null);
  const location = useLocation();
  const isAuthPath = ["/auth", "/auth/register"].includes(location.pathname);
  const navigator = useNavigate();
  const isAuthenticated = useSelector((state) => state.isAuth.isAuthenticated);

  //mobile sidebar flag
  const isMobileSidebarOpen = useRef(false);

  const sideBarCloseNOpen = () => {
    setSideBarStatus((prev) => !prev);
  };
  const showSidebarMobile = () => {
    document.querySelector(".sideBar").classList.add("show");
    document.querySelector(".sideBarContainer").classList.add("show");
    isMobileSidebarOpen.current = true;
  };
  const closeSidebarMobile = () => {
    if (!isMobileSidebarOpen.current || !isTabletScreen) return;
    document.querySelector(".sideBar").classList.remove("show");
    document.querySelector(".sideBarContainer").classList.remove("show");
    isMobileSidebarOpen.current = false;
  };
  useEffect(() => {
    //prevent the authenticated user from login again
    if (isAuthPath && isAuthenticated) {
      navigator("/");
    }
    if (isAuthPath) return;
    const setTablet = () => {
      setIsTabletScreen(window.matchMedia("(max-width: 1024px)").matches);
    };

    window.addEventListener("resize", setTablet);

    tabRef.current.addEventListener("click", closeSidebarMobile);

    return () => {
      window.removeEventListener("resize", setTablet);
    };
  }, [isAuthPath]);

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
            {acControlStatus && <AccountControl persistor={props.persistor} setAcControlStatus={setAcControlStatus} />}
            <div className="middleContent" ref={tabRef}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/Tasks/*" element={<TaskTab isTabletScreen={isTabletScreen} />} />
                <Route path="/Calendar" element={<Calendar />} />
              </Routes>
            </div>
          </div>
          <Sidebar sideBarCloseNOpen={sideBarCloseNOpen} sideBarStatus={sideBarStatus} setAcControlStatus={setAcControlStatus} closeSidebarMobile={closeSidebarMobile} />
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
