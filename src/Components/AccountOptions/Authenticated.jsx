import { useSelector } from "react-redux";
import "./AccountOptions.css";
import { useDispatch } from "react-redux";
import { setLogOut } from "../../application-state/popUpSlice";
export function Authenticated() {
  const dispacher = useDispatch();
  const user = useSelector((state) => state.isAuth.user);
  const logOutLocation = useSelector((state) => state.popUp.logOut);
  return (
    <div
      className="AccountNNotification"
      onClick={() => {
        if (logOutLocation === "accountPc") {
          dispacher(setLogOut(null));
        } else {
          dispacher(setLogOut("accountPc"));
        }
      }}
    >
      <div className="account">
        <div className="userIdentity">
          <p>{user.lname ? `${user.fname} ${user.lname}` : `${user.fname}`}</p>
          <p>{`@${user.username}`}</p>
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
