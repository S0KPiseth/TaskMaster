import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URI;
import { useDispatch } from "react-redux";
import { setLogOut } from "../../application-state/popUpSlice";

export default function Logout(props) {
  const dispatcher = useDispatch();
  return (
    <button
      onClick={() => {
        dispatcher(setLogOut(null));
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
  );
}
