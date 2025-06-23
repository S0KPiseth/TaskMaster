import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import DashboardIcon from "/src/assets/Icons/DashboardIcon.jsx";

import "./SidebarBtn.css";
import TaskIcon from "../../assets/Icons/TaskIcon";
import CalendarIcon from "../../assets/Icons/CalendarIcon";
import SettingIcon from "../../assets/Icons/SettignIcon";

function SidebarButton({ name, sideBarStatus, closeSidebarMobile }) {
  const location = useLocation();
  const activeBtn = useRef(null);
  useEffect(() => {
    if (!activeBtn.current) return;
    if (location.pathname.split("/")[1] === name) {
      activeBtn.current.classList.add("activeTab");
    } else if (location.pathname === "/" && name === "Dashboard") {
      activeBtn.current.classList.add("activeTab");
    } else {
      activeBtn.current.classList.remove("activeTab");
    }
  });

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
    <button className={name === "Dashboard" ? "sideBarBtn activeTab" : "sideBarBtn"} ref={activeBtn}>
      <div className={sideBarStatus ? "Icon" : "Icon full-width"}>{mainComponent}</div>
      {sideBarStatus ? name : null}
      <p className="subText">{name}</p>
    </button>
  );
}
export default SidebarButton;
