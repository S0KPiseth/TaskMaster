import React from "react";
import "./AccountOptions.css";
export function Authenticated({ setAcControlStatus, acControlStatus }) {
  return (
    <div className="AccountNNotification">
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
          <button id="dropDownBtn" onClick={() => setAcControlStatus((prev) => !prev)}>
            <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <title>{acControlStatus ? "arrowhead-up-solid" : "arrowhead-down-solid"}</title>
              <rect width="48" height="48" fill="none" />
              <path d={acControlStatus ? "M37.4,28.5l-12-11.9a1.9,1.9,0 0,0-2.8,0l-12,11.9A2,2,0,0,0,12,32H36a2,2,0,0,0,1.4-3.5Z" : "M10.6,19.5l12,11.9a1.9,1.9,0,0,0,2.8,0l12-11.9A2,2,0,0,0,36,16H12a2,2,0,0,0-1.4,3.5Z"} fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
