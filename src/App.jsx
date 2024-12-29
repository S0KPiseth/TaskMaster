import { useState } from "react";
import "./App.css";
import Dashboard from "./Dashboard";
import TaskTab from "./TaskTab";

function App() {
  const [acControlStatus, setAcControlStatus] = useState(false);
  const [navigationHelper, setNavigationHelper] = useState("Tasks");
  function navigate(e) {
    document.querySelectorAll(".sideBarBtn").forEach((element) => {
      element.className = "sideBarBtn";
    });
    setNavigationHelper(e.target.textContent);
    e.target.className += " activeTab";
  }
  let mainComponent = <Dashboard />;
  switch (navigationHelper) {
    case "Dashboard":
      mainComponent = <Dashboard />;
      break;
    case "Tasks":
      mainComponent = <TaskTab />;
      break;
    case "Calender":
      mainComponent = <p>Tasks</p>;
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
              className="sideBarBtn activeTab"
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
              className="sideBarBtn"
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
              className="sideBarBtn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
              Calender
            </button>
            <hr />
            <button
              onClick={(e) => {
                navigate(e);
              }}
              className="sideBarBtn"
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
