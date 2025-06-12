import { useLayoutEffect } from "react";
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
          setAcControlStatus(false);
          axios.get("http://localhost:5050/api/auth/logout", { withCredentials: true }).then((res) => {
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
