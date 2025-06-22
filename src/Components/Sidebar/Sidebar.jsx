import SidebarButton from "../SidebarBtn/SidebarButton";
import { Authenticated } from "../AccountOptions/Authenticated";
import Unauthorized from "../AccountOptions/Unauthorized";
import { Link } from "react-router";
import { useSelector } from "react-redux";
function Sidebar({ sideBarStatus, sideBarCloseNOpen, setAcControlStatus, closeSidebarMobile }) {
  const isAuthenticated = useSelector((state) => state.isAuth.isAuthenticated);
  return (
    <div className={`sideBarContainer ${sideBarStatus ? "width-250" : "width-60"}`}>
      <div className={`sideBar ${sideBarStatus ? "width-250" : "width-60"}`}>
        <div className={`sideBarHeader ${sideBarStatus ? "headerHorizontalAlign" : "headerVerticalAlign"}`}>
          <a id="logo" href="/" style={{ paddingLeft: sideBarStatus ? "10px" : undefined, position: "static", color: "var(--text-primary)" }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M27.947 9.523a3.333 3.333 0 0 1 5.107 4.287L18.055 31.683a3.333 3.333 0 1 1 -5.107 -4.283z" fill="currentColor" />
              <path d="M5 21.233a3.333 3.333 0 1 1 6.667 0 3.333 3.333 0 0 1 -6.667 0" fill="green" />
            </svg>
            {sideBarStatus && "Task-er"}
            <p className="subText">Task-er</p>
          </a>
          <button onClick={sideBarCloseNOpen}>
            {sideBarStatus ? (
              <svg fill="currentColor" version="1.1" id="Layer_1" xmlnsx="http://ns.adobe.com/Extensibility/1.0/" xmlnsi="http://ns.adobe.com/AdobeIllustrator/10.0/" xmlnsgraph="http://ns.adobe.com/Graphs/1.0/" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 0.6 0.6" xmlSpace="preserve">
                <metadata>
                  <sfw xmlns="http://ns.adobe.com/SaveForWeb/1.0/">
                    <slices />
                    <sliceSourceBounds width="505" height="984" bottomleftorigin="true" x="0" y="-120" />
                  </sfw>
                </metadata>
                <g>
                  <g>
                    <g>
                      <path d="M0.5 0.6H0.1c-0.055 0 -0.1 -0.045 -0.1 -0.1V0.1c0 -0.055 0.045 -0.1 0.1 -0.1h0.4c0.055 0 0.1 0.045 0.1 0.1v0.4c0 0.055 -0.045 0.1 -0.1 0.1M0.1 0.05c-0.028 0 -0.05 0.023 -0.05 0.05v0.4c0 0.028 0.023 0.05 0.05 0.05h0.4c0.028 0 0.05 -0.023 0.05 -0.05V0.1c0 -0.028 -0.023 -0.05 -0.05 -0.05z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M0.2 0.6c-0.015 0 -0.025 -0.01 -0.025 -0.025V0.025c0 -0.015 0.01 -0.025 0.025 -0.025s0.025 0.01 0.025 0.025v0.55c0 0.015 -0.01 0.025 -0.025 0.025" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M0.35 0.325c-0.007 0 -0.013 -0.003 -0.017 -0.007 -0.01 -0.01 -0.01 -0.025 0 -0.035l0.075 -0.075c0.01 -0.01 0.025 -0.01 0.035 0s0.01 0.025 0 0.035l-0.075 0.075c-0.005 0.005 -0.01 0.007 -0.017 0.007" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M0.425 0.4c-0.007 0 -0.013 -0.003 -0.017 -0.007l-0.075 -0.075c-0.01 -0.01 -0.01 -0.025 0 -0.035s0.025 -0.01 0.035 0l0.075 0.075c0.01 0.01 0.01 0.025 0 0.035 -0.005 0.005 -0.01 0.007 -0.017 0.007" />
                    </g>
                  </g>
                </g>
              </svg>
            ) : (
              <svg fill="currentColor" version="1.1" id="Layer_1" xmlnsx="http://ns.adobe.com/Extensibility/1.0/" xmlnsi="http://ns.adobe.com/AdobeIllustrator/10.0/" xmlnsgraph="http://ns.adobe.com/Graphs/1.0/" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 0.6 0.6" xmlSpace="preserve">
                <metadata>
                  <sfw xmlns="http://ns.adobe.com/SaveForWeb/1.0/">
                    <slices />
                    <sliceSourceBounds width="505" height="984" bottomleftorigin="true" x="0" y="-120" />
                  </sfw>
                </metadata>
                <g>
                  <g>
                    <g>
                      <path d="M0.5 0.6h-0.4A0.1 0.1 0 0 1 0 0.5v-0.4A0.1 0.1 0 0 1 0.1 0h0.4A0.1 0.1 0 0 1 0.6 0.1v0.4A0.1 0.1 0 0 1 0.5 0.6M0.1 0.05A0.051 0.051 0 0 0 0.05 0.1v0.4c0 0.027 0.023 0.05 0.05 0.05h0.4A0.051 0.051 0 0 0 0.55 0.5v-0.4A0.051 0.051 0 0 0 0.5 0.05z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M0.2 0.6A0.023 0.023 0 0 1 0.175 0.575V0.025C0.175 0.01 0.185 0 0.2 0s0.025 0.01 0.025 0.025v0.55A0.023 0.023 0 0 1 0.2 0.599" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <g>
                        <path d="M0.425 0.325A0.027 0.027 0 0 1 0.407 0.317L0.333 0.243C0.323 0.233 0.323 0.218 0.333 0.208s0.025 -0.01 0.035 0l0.075 0.075a0.024 0.024 0 0 1 0 0.035 0.027 0.027 0 0 1 -0.017 0.007" />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path d="M0.35 0.4A0.027 0.027 0 0 1 0.333 0.393a0.024 0.024 0 0 1 0 -0.035L0.407 0.283C0.417 0.273 0.432 0.273 0.442 0.283s0.01 0.025 0 0.035L0.367 0.393A0.027 0.027 0 0 1 0.35 0.4" />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            )}
          </button>
        </div>
        <hr />
        <div className="sideBarBtns" style={{ marginLeft: sideBarStatus ? "5px" : "auto" }}>
          <Link to="/" className="text-link">
            <SidebarButton name="Dashboard" sideBarStatus={sideBarStatus} closeSidebarMobile={closeSidebarMobile} />
          </Link>
          <Link to="Tasks" className="text-link">
            <SidebarButton name="Tasks" sideBarStatus={sideBarStatus} closeSidebarMobile={closeSidebarMobile} />
          </Link>
        </div>
        <hr />
        <div className="sideBarBtns" style={{ marginLeft: sideBarStatus ? "5px" : "auto" }}>
          <Link to="Calendar" className="text-link">
            <SidebarButton name="Calendar" sideBarStatus={sideBarStatus} closeSidebarMobile={closeSidebarMobile} />
          </Link>

          <Link to="Setting" className="text-link">
            <SidebarButton name="Settings" sideBarStatus={sideBarStatus} closeSidebarMobile={closeSidebarMobile} />
          </Link>
        </div>
        <div className="mobileAcc">
          {" "}
          {isAuthenticated ? <Authenticated setAcControlStatus={setAcControlStatus} /> : <Unauthorized />}
          {isAuthenticated && (
            <svg width="30px" height="30px" viewBox="0 0 0.563 0.563" fill="none" xmlns="http://www.w3.org/2000/svg" className="dot">
              <path fillRule="evenodd" clipRule="evenodd" d="M0.136 0.281a0.042 0.042 0 1 1 -0.084 0 0.042 0.042 0 0 1 0.084 0m0.188 0a0.042 0.042 0 1 1 -0.084 0 0.042 0.042 0 0 1 0.084 0M0.469 0.323a0.042 0.042 0 1 0 0 -0.084 0.042 0.042 0 0 0 0 0.084" fill="#000000" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
