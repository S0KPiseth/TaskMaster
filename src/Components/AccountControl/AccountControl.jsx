import { useLayoutEffect } from "react";
import Logout from "./Logout";
export default function AccountControl(props) {
  useLayoutEffect(() => {
    return () => {
      const accountCtrPanel = document.getElementById("accountCtrPanel");
      accountCtrPanel.style.animationPlayState = true;
      accountCtrPanel.style.animationDirection = "revert";
    };
  });
  return (
    <div className="accountPanel" id="accountCtrPanel">
      <button>View Profile</button>
      <button>Switch Account</button>
      <Logout persistor={props.persistor} />
    </div>
  );
}
