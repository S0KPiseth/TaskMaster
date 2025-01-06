import React, { useEffect } from "react";
import DashboardIcon from "/src/assets/Icons/DashboardIcon.jsx";

import "./SidebarBtn.css";
import TaskIcon from "../../assets/Icons/TaskIcon";
import CalendarIcon from "../../assets/Icons/CalendarIcon";
import SettingIcon from "../../assets/Icons/SettignIcon";

function SidebarButton({ navigate, navigationHelper, name, sideBarStatus }) {
  let mainComponent;
  switch (name) {
    case "Dashboard":
      mainComponent = <DashboardIcon />;
      break;
    case "Tasks":
      mainComponent = <TaskIcon />;
      break;
    case "Calendar":
      mainComponent = <CalendarIcon />;
      break;
    case "Settings":
      mainComponent = <SettingIcon />;
      break;
  }
  return (
    <button
      onClick={(e) => {
        navigate(name);
      }}
      className={navigationHelper === name ? "sideBarBtn activeTab" : "sideBarBtn"}
    >
      <div className={sideBarStatus ? "Icon" : "Icon full-width"}>{mainComponent}</div>

      {sideBarStatus ? name : null}
    </button>
  );
}
export default SidebarButton;
