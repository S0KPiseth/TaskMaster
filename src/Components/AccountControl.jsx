import { useLayoutEffect } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URI;
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
      <button
        onClick={() => {
          props.setAcControlStatus(false);
          axios.get(`${BASE_URL}/api/auth/logout`, { withCredentials: true }).then((res) => {
            props.persistor.pause();
            props.persistor.flush().then(() => {
              return props.persistor.purge();
            });
            window.location.reload();
          });
        }}
      >
        Log out
      </button>
    </div>
  );
}
