import axios from "axios";
import { setUser, setAuth } from "../application-state/authenticationSlice";
import { getStore } from "../application-state/Store";
import { setTaskLogin } from "../application-state/taskListSlice";

export default function fetchUserData(guestTasks, dispatcher, rememberMe) {
  //get user object
  axios.get("http://localhost:5050/api/auth/me", { withCredentials: true }).then(async (res) => {
    if (res.data.isAuth) {
      dispatcher(setUser(res.data.user));
      dispatcher(setAuth(true));
      const { store, persistor } = getStore(rememberMe);
      localStorage.setItem("rememberMe", rememberMe);
      rememberMe && window.location.reload();
      //add the tasks that they the user create when they are a guest user to the database
      console.log("outer count");
      if (guestTasks) {
        console.log("guest tasks");
        console.log(guestTasks);
        console.log("----------------------");
        for (const task of guestTasks) {
          console.log("outer count");

          const { _id, ...reqBody } = task;
          await axios.post("http://localhost:5050/api/task", { ...reqBody, userId: res.data.user._id }, { withCredentials: true }).catch((err) => {
            alert(`error:${err.response.status}:${err.response.data.msg}`);
          });
        }
      }
      //getTask
      axios.get("http://localhost:5050/api/task", { withCredentials: true }).then((res) => {
        dispatcher(setTaskLogin(res.data));
      });
    }
  });
}
