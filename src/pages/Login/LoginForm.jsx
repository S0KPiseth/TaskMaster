import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../application-state/authenticationSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getStore } from "../../application-state/Store";
import { setTaskLogin } from "../../application-state/taskListSlice";
import { setAuth } from "../../application-state/authenticationSlice";

export default function LoginForm() {
  const [rememberMe, setRememberMe] = useState(false);
  const guestTasks = useSelector((state) => state.tasks.list);
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  function handleLogin(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get("username");
    const password = data.get("password");
    axios
      .post(
        "http://localhost:5050/api/auth",
        {
          username,
          password,
        },
        { withCredentials: true }
      )
      .then(async (res) => {
        if (200 <= res <= 299) {
          dispatcher(setUser(res.data.user));
          dispatcher(setAuth(true));
          navigate(res.data.redirectUrl);
          const { store, persistor } = getStore(rememberMe);
          localStorage.setItem("rememberMe", rememberMe);
          rememberMe && window.location.reload();
          //add the that they the user create when they are a guest user to the database
          if (guestTasks) {
            for (const task of guestTasks) {
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
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <form
      onSubmit={(e) => {
        handleLogin(e);
      }}
    >
      <div>
        <h1>Welcome back</h1>
        <p id="loginSlogan">Your tasks are right where you left them. Time to check a few off.</p>
      </div>
      <br />
      <label htmlFor="username">
        <input className="fields" type="text" name="username" placeholder="Enter your Username" />
      </label>
      <label htmlFor="password">
        <input className="fields" type="password" name="password" placeholder="Enter your password" />
      </label>
      <div className="loginUtilsWrapper">
        <label htmlFor="remember">
          <input type="checkbox" name="remember" id="" checked={rememberMe} onChange={() => setRememberMe((pre) => !pre)} />
          Remember me
        </label>
        <a href="">Forgot password?</a>
      </div>

      <br />
      <input className="login-btn" type="submit" value="Login" />
      <br />
      <div id="separationLine">
        <hr />
        <p>OR</p>
        <hr />
      </div>
      <br />

      <div className="thirdPartyDiv">
        <button className="thirdParty">
          <svg width="25px" height="25px" viewBox="0 0 1 1" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.743 0.5a0.242 0.242 0 0 1 -0.47 0.082L0.134 0.693A0.414 0.414 0 0 0 0.914 0.5" fill="#00ac47" />
            <path d="M0.743 0.5a0.242 0.242 0 0 1 -0.102 0.197l0.137 0.109A0.417 0.417 0 0 0 0.914 0.5" fill="#4285f4" />
            <path d="M0.258 0.5A0.25 0.25 0 0 1 0.273 0.418L0.134 0.307a0.417 0.417 0 0 0 0 0.386L0.273 0.583A0.25 0.25 0 0 1 0.258 0.5" fill="#ffba00" />
            <path fill="#2ab2db" points="8.718 13.374 8.718 13.374 8.718 13.374 8.718 13.374" d="M0.273 0.418" />
            <path d="M0.5 0.258a0.25 0.25 0 0 1 0.143 0.047L0.769 0.186a0.413 0.413 0 0 0 -0.635 0.122l0.138 0.111A0.242 0.242 0 0 1 0.5 0.258" fill="#ea4435" />
            <path fill="#2ab2db" points="8.718 18.626 8.718 18.626 8.718 18.626 8.718 18.626" d="M0.273 0.582" />
            <path d="M0.914 0.469V0.5l-0.071 0.109H0.516V0.438h0.367a0.031 0.031 0 0 1 0.031 0.031" fill="#4285f4" />
          </svg>
        </button>
        <button className="thirdParty">
          <svg width="25px" height="25px" viewBox="0 -2.783 25 25" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
            <g>
              <path d="M21.177 1.621A20.361 20.361 0 0 0 16.02 0c-0.222 0.402 -0.482 0.942 -0.661 1.372q-2.885 -0.434 -5.716 0c-0.179 -0.43 -0.444 -0.97 -0.669 -1.372a20.293 20.293 0 0 0 -5.162 1.625C0.549 6.557 -0.336 11.367 0.106 16.109c2.165 1.617 4.263 2.599 6.326 3.242A15.723 15.723 0 0 0 7.787 17.119a13.32 13.32 0 0 1 -2.133 -1.038 10.645 10.645 0 0 0 0.523 -0.414c4.113 1.924 8.583 1.924 12.647 0a12.891 12.891 0 0 0 0.523 0.414 13.281 13.281 0 0 1 -2.137 1.04c0.391 0.783 0.844 1.53 1.355 2.231 2.065 -0.643 4.165 -1.625 6.33 -3.243 0.519 -5.497 -0.887 -10.263 -3.716 -14.488M8.347 13.193c-1.235 0 -2.248 -1.153 -2.248 -2.557s0.991 -2.559 2.248 -2.559 2.269 1.153 2.248 2.559c0.002 1.404 -0.991 2.557 -2.248 2.557m8.306 0c-1.235 0 -2.247 -1.153 -2.247 -2.557s0.991 -2.559 2.247 -2.559c1.257 0 2.269 1.153 2.248 2.559 0 1.404 -0.991 2.557 -2.248 2.557" fill="#5865F2" fillRule="nonzero" />
            </g>
          </svg>
        </button>
        <button className="thirdParty">
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="24px" height="24px" viewBox="0 0 24 24" style={{ enableBackground: "new 0 0 24 24" }} xmlSpace="preserve">
            <path d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z" />
          </svg>
        </button>
      </div>
      <p className="registerLink">
        You don't have an account yet? <Link to="/auth/register">Register</Link>
      </p>
    </form>
  );
}
