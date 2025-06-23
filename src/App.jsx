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
import AccountControl from "./Components/AccountControl/AccountControl";
import { useSelector, useDispatch } from "react-redux";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Logout from "./Components/AccountControl/Logout";
import { setPopUpLocation } from "./application-state/popUpSlice";

function App(props) {
  //register gsap plugins
  gsap.registerPlugin(useGSAP, ScrollToPlugin);

  const [isTabletScreen, setIsTabletScreen] = useState(window.matchMedia("(max-width: 1024px)").matches);

  const [sideBarStatus, setSideBarStatus] = useState(!isTabletScreen);

  const tabRef = useRef(null);
  const location = useLocation();
  const isAuthPath = ["/auth", "/auth/register"].includes(location.pathname);
  const navigator = useNavigate();
  const isAuthenticated = useSelector((state) => state.isAuth.isAuthenticated);
  const popUpLocation = useSelector((state) => state.popUp.where);
  const dispatcher = useDispatch();

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

    tabRef.current.addEventListener("click", () => {
      closeSidebarMobile();
      if (popUpLocation === "accountMobile" || !popUpLocation) {
        dispatcher(setPopUpLocation(null));
      }
    });

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
            <Header showSidebarMobile={showSidebarMobile} />
            {popUpLocation === "accountPc" ? (
              <AccountControl persistor={props.persistor} />
            ) : (
              popUpLocation === "accountMobile" && (
                <div className="mobileAcControl">
                  <svg
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 24 24"
                    style={{
                      enableBackground: "new 0 0 490.3 490.3",
                    }}
                    xmlSpace="preserve"
                    width={24}
                    height={24}
                  >
                    <g>
                      <g>
                        <path fill="currentColor" d="M0 5.925v12.149c0 1.674 1.366 3.04 3.04 3.04h9.819c1.674 0 3.04 -1.366 3.04 -3.04v-1.968c0 -0.333 -0.269 -0.602 -0.602 -0.602s-0.602 0.269 -0.602 0.602v1.968c0 1.013 -0.827 1.841 -1.841 1.841H3.04c-1.013 0 -1.841 -0.827 -1.841 -1.841v-12.149c0 -1.013 0.827 -1.841 1.841 -1.841h9.819c1.013 0 1.841 0.827 1.841 1.841v1.968c0 0.333 0.269 0.602 0.602 0.602s0.602 -0.269 0.602 -0.602v-1.968c0 -1.674 -1.366 -3.04 -3.04 -3.04H3.04c-1.674 0 -3.04 1.361 -3.04 3.04" />
                        <path fill="currentColor" d="M18.865 16.528c0.117 0.117 0.269 0.176 0.426 0.176s0.308 -0.059 0.426 -0.176l4.107 -4.107c0.235 -0.235 0.235 -0.612 0 -0.847l-4.107 -4.107c-0.235 -0.235 -0.612 -0.235 -0.847 0s-0.235 0.612 0 0.847l3.084 3.084H10.7c-0.333 0 -0.602 0.269 -0.602 0.602s0.269 0.602 0.602 0.602h11.249l-3.084 3.084c-0.235 0.23 -0.235 0.612 0 0.842" />
                      </g>
                    </g>
                  </svg>
                  <Logout persistor={props.persistor} />
                </div>
              )
            )}

            <div className="middleContent" ref={tabRef}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/Tasks/*" element={<TaskTab />} />
                <Route path="/Calendar" element={<Calendar />} />
              </Routes>
            </div>
          </div>
          <Sidebar sideBarCloseNOpen={sideBarCloseNOpen} sideBarStatus={sideBarStatus} closeSidebarMobile={closeSidebarMobile} />
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
