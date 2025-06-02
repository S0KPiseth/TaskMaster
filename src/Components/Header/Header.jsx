import { Authenticated } from "../AccountOptions/Authenticated";
import Unauthorized from "../AccountOptions/Unauthorized";
import { useSelector } from "react-redux";
function Header({ setAcControlStatus, acControlStatus, showSidebarMobile, isTabletScreen }) {
  const user = useSelector((state) => state.isAuth.user);
  return (
    <div className="header">
      <div>
        <button id="menuButton" onClick={showSidebarMobile}>
          <svg width="25px" height="25px" viewBox="0 0 0.531 0.531" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <path d="M0.5 0.094v0.063H0.031V0.094zM0.031 0.313h0.469V0.25H0.031zm0 0.156h0.469v-0.063H0.031z" fill="currentColor" />
          </svg>
        </button>
        <p id="pageIndicator">Dashboard</p>
      </div>
      <div className="headerContent">
        <div>
          <label id="searchBar">
            <input type="text" placeholder="Search..." />
            <svg width="25px" height="25px" viewBox="0 0 0.6 0.6" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" transform="matrix(6.123233995736766e-17,1,-1,6.123233995736766e-17,0,0)">
              <path d="M0.275 0.475a0.2 0.2 0 1 0 0 -0.4 0.2 0.2 0 0 0 0 0.4" stroke="currentColor" strokeWidth={0.05} strokeLinecap="round" strokeLinejoin="round" />
              <path d="m0.525 0.525 -0.1 -0.1" stroke="currentColor" strokeWidth={0.05} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </label>
          {user._id && (
            <button className="notification">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 6.667A5 5 0 0 0 5 6.667c0 5.833 -2.5 7.5 -2.5 7.5h15s-2.5 -1.667 -2.5 -7.5" />
                <path d="M11.442 17.5a1.667 1.667 0 0 1 -2.883 0" />
              </svg>
            </button>
          )}
        </div>
        {user._id ? <Authenticated setAcControlStatus={setAcControlStatus} acControlStatus={acControlStatus} /> : <Unauthorized />}
      </div>
    </div>
  );
}
export default Header;
