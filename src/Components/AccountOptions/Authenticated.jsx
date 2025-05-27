import React from "react";
import "./AccountOptions.css";
export function Authenticated({ setAcControlStatus, acControlStatus }) {
  return (
    <div className="AccountNNotification">
      <div className="account">
        <div className="userIdentity">
          <p>John Doe</p>
          <p>@justjohn</p>
        </div>
        <div className="profilePic">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </div>
    </div>
  );
}
