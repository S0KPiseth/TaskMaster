import SidebarButton from "../SidebarBtn/SidebarButton";
import { Link } from "react-router";
function Sidebar({ sideBarStatus, sideBarCloseNOpen, navigate, isTabletScreen }) {
  return (
    <div className={`sideBarContainer ${sideBarStatus ? "width-250" : "width-60"}`}>
      <div className={`sideBar ${sideBarStatus ? "width-250" : "width-60"}`}>
        <div className="sideBarHeader">
          <a id="logo" href="/" style={{ paddingLeft: sideBarStatus ? "10px" : undefined }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M27.947 9.523a3.333 3.333 0 0 1 5.107 4.287L18.055 31.683a3.333 3.333 0 1 1 -5.107 -4.283z" fill="currentColor" />
              <path d="M5 21.233a3.333 3.333 0 1 1 6.667 0 3.333 3.333 0 0 1 -6.667 0" fill="green" />
            </svg>
            {sideBarStatus && "Task Master"}
          </a>
        </div>
        <hr />
        <div className="sideBarBtns" style={{ marginLeft: sideBarStatus ? "5px" : "auto" }}>
          <Link to="/" className="text-link">
            <SidebarButton name="Dashboard" sideBarStatus={sideBarStatus} />
          </Link>
          <Link to="Tasks" className="text-link">
            <SidebarButton name="Tasks" sideBarStatus={sideBarStatus} />
          </Link>
        </div>
        <hr />
        <div className="sideBarBtns" style={{ marginLeft: sideBarStatus ? "5px" : "auto" }}>
          <Link to="Calendar" className="text-link">
            <SidebarButton name="Calendar" sideBarStatus={sideBarStatus} />
          </Link>

          <Link to="Setting" className="text-link">
            <SidebarButton name="Settings" sideBarStatus={sideBarStatus} />
          </Link>
        </div>
        <footer>{sideBarStatus && "© 2025 Piseth Sok. All rights reserved."}</footer>
        <div
          className="closeNopenSidebar"
          onMouseEnter={() => {
            if (!isTabletScreen) {
              const sidebarBtn = document.querySelector("#sidebarCtrBtn");
              const verticalLine = document.querySelector(".vertical-line");
              if (sidebarBtn && verticalLine) {
                sidebarBtn.classList.add("bouncingBtn");
                verticalLine.style.visibility = "visible";
              }
            }
          }}
          onMouseLeave={() => {
            const sidebarBtn = document.querySelector("#sidebarCtrBtn");
            const verticalLine = document.querySelector(".vertical-line");
            if (sidebarBtn && verticalLine) {
              sidebarBtn.classList.remove("bouncingBtn");
              verticalLine.style.visibility = "hidden";
            }
          }}
        >
          <div className="vertical-line"></div>
          <button id="sidebarCtrBtn" onClick={sideBarCloseNOpen}>
            <svg
              id="arrowhead"
              width="20"
              height="20"
              viewBox="0 0 1.2 1.2"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                fill: "currentColor",
                transform: sideBarStatus ? "rotate(1turn)" : "rotate(0.5turn)",
              }}
            >
              <title>arrowhead-left</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="invisible_box" data-name="invisible box">
                  <path width={48} height={48} fill="none" d="M0 0h1.2v1.2H0z" />
                </g>
                <g id="icons_Q2" data-name="icons Q2">
                  <path d="M0.52 0.6 0.78 0.34A0.1 0.1 0 0 0 0.77 0.27 0.1 0.1 0 0 0 0.7 0.28l-0.3 0.3a0.1 0.1 0 0 0 0 0.07l0.3 0.3a0.1 0.1 0 0 0 0.07 0.01 0.1 0.1 0 0 0 0.01 -0.07Z" />
                </g>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
