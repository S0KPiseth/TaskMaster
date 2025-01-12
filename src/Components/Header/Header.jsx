import { Authenticated } from "../AccountOptions/Authenticated";
import Unauthorized from "../AccountOptions/Unauthorized";
function Header({ moveMentRef, isAuthenticated, setAcControlStatus, acControlStatus, showSidebarMobile, isTabletScreen }) {
  return (
    <div
      className="header"
      onMouseEnter={() => {
        if (moveMentRef == null) return;
        moveMentRef.current.style.visibility = "visible";
      }}
      onMouseLeave={() => {
        if (moveMentRef == null) return;
        moveMentRef.current.style.visibility = "hidden";
      }}
    >
      {!isTabletScreen && <div id="mouseMovement" ref={moveMentRef}></div>}
      <div>
        <button id="menuButton" onClick={showSidebarMobile}>
          <svg width="25px" height="25px" viewBox="0 0 0.531 0.531" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <path d="M0.5 0.094v0.063H0.031V0.094zM0.031 0.313h0.469V0.25H0.031zm0 0.156h0.469v-0.063H0.031z" fill="currentColor" />
          </svg>
        </button>
        <label id="searchBar">
          <svg width="25px" height="25px" viewBox="0 0 0.6 0.6" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" transform="matrix(6.123233995736766e-17,1,-1,6.123233995736766e-17,0,0)">
            <path d="M0.275 0.475a0.2 0.2 0 1 0 0 -0.4 0.2 0.2 0 0 0 0 0.4" stroke="currentColor" strokeWidth={0.05} strokeLinecap="round" strokeLinejoin="round" />
            <path d="m0.525 0.525 -0.1 -0.1" stroke="currentColor" strokeWidth={0.05} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input type="text" placeholder="Search..." />
        </label>
      </div>

      {isAuthenticated ? <Authenticated setAcControlStatus={setAcControlStatus} acControlStatus={acControlStatus} /> : <Unauthorized />}
    </div>
  );
}
export default Header;
