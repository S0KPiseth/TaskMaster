import React, { useRef } from "react";
import DashboardIcon from "/src/assets/Icons/DashboardIcon.jsx";

import "./SidebarBtn.css";
import TaskIcon from "../../assets/Icons/TaskIcon";
import CalendarIcon from "../../assets/Icons/CalendarIcon";
import SettingIcon from "../../assets/Icons/SettignIcon";

function SidebarButton({ name, sideBarStatus, closeSidebarMobile }) {
  const activeBtn = useRef(null);
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
        const active = document.querySelectorAll(".activeTab");
        if (activeBtn == null) return;

        active.forEach((e) => {
          e.classList.remove("activeTab");
        });
        activeBtn.current.className += " activeTab";
        closeSidebarMobile();
      }}
      className={name === "Dashboard" ? "sideBarBtn activeTab" : "sideBarBtn"}
      ref={activeBtn}
    >
      <div className={sideBarStatus ? "Icon" : "Icon full-width"}>{mainComponent}</div>
      {sideBarStatus ? name : null}
      <p className="subText">{name}</p>
    </button>
  );
}
export default SidebarButton;
