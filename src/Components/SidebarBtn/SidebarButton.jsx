import React from "react";
import DashboardIcon from "/src/assets/Icons/DashboardIcon.jsx";

import "./SidebarBtn.css";
import TaskIcon from "../../assets/Icons/TaskIcon";
import CalendarIcon from "../../assets/Icons/CalendarIcon";
import SettingIcon from "../../assets/Icons/SettignIcon";

function SidebarButton({ navigate, navigationHelper, name }) {
  let mainComponent;
  switch (name) {
    case "Dashboard":
      mainComponent = <DashboardIcon fill={navigationHelper === name ? "var(--text-primary)" : "var(--text-secondary)"} />;
      break;
    case "Tasks":
      mainComponent = <TaskIcon fill={navigationHelper === name ? "var(--text-primary)" : "var(--text-secondary)"} />;
      break;
    case "Calendar":
      mainComponent = <CalendarIcon fill={navigationHelper === name ? "var(--text-primary)" : "var(--text-secondary)"} />;
      break;
    case "Settings":
      mainComponent = <SettingIcon fill={navigationHelper === name ? "var(--text-primary)" : "var(--text-secondary)"} />;
      break;
  }
  return (
    <button
      onClick={(e) => {
        navigate(name);
      }}
      className={navigationHelper === name ? "sideBarBtn activeTab" : "sideBarBtn"}
    >
      <div className="Icon">{mainComponent}</div>

      {name}
    </button>
  );
}
export default SidebarButton;
