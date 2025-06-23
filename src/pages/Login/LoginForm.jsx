import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { toggleRememberMe } from "../../application-state/rememberMeSlice";

export default function LoginForm() {
  const rememberMe = useSelector((state) => state.rememberMe.value);
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
      .then((res) => {
        if (200 <= res <= 299) {
          navigate(res.data.redirectUrl);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error " + err.status + ": " + err.response.data.msg);
      });
  }

  return (
    <div className="loginFormWrapper">
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
            <input type="checkbox" name="remember" id="" checked={rememberMe} onChange={() => dispatcher(toggleRememberMe())} />
            Remember me
          </label>
          {/* <a href="">Forgot password?</a> */}
        </div>

        <br />
        <input className="login-btn" type="submit" value="Login" />
      </form>
      <br />
      <div id="separationLine">
        <hr />
        <p>OR</p>
        <hr />
      </div>
      <br />
      <br />

      <div className="thirdPartyDiv">
        <button
          className="thirdParty"
          onClick={() => {
            window.location.href = "http://localhost:5050/api/auth/google";
          }}
        >
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
        <button
          className="thirdParty"
          onClick={() => {
            window.location.href = "http://localhost:5050/api/auth/discord";
          }}
        >
          <svg width="25px" height="25px" viewBox="0 -2.783 25 25" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
            <g>
              <path d="M21.177 1.621A20.361 20.361 0 0 0 16.02 0c-0.222 0.402 -0.482 0.942 -0.661 1.372q-2.885 -0.434 -5.716 0c-0.179 -0.43 -0.444 -0.97 -0.669 -1.372a20.293 20.293 0 0 0 -5.162 1.625C0.549 6.557 -0.336 11.367 0.106 16.109c2.165 1.617 4.263 2.599 6.326 3.242A15.723 15.723 0 0 0 7.787 17.119a13.32 13.32 0 0 1 -2.133 -1.038 10.645 10.645 0 0 0 0.523 -0.414c4.113 1.924 8.583 1.924 12.647 0a12.891 12.891 0 0 0 0.523 0.414 13.281 13.281 0 0 1 -2.137 1.04c0.391 0.783 0.844 1.53 1.355 2.231 2.065 -0.643 4.165 -1.625 6.33 -3.243 0.519 -5.497 -0.887 -10.263 -3.716 -14.488M8.347 13.193c-1.235 0 -2.248 -1.153 -2.248 -2.557s0.991 -2.559 2.248 -2.559 2.269 1.153 2.248 2.559c0.002 1.404 -0.991 2.557 -2.248 2.557m8.306 0c-1.235 0 -2.247 -1.153 -2.247 -2.557s0.991 -2.559 2.247 -2.559c1.257 0 2.269 1.153 2.248 2.559 0 1.404 -0.991 2.557 -2.248 2.557" fill="#5865F2" fillRule="nonzero" />
            </g>
          </svg>
        </button>
        <button
          className="thirdParty"
          onClick={() => {
            window.location.href = "http://localhost:5050/api/auth/github";
          }}
        >
          <svg role="img" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" width={25} height={25}>
            <title>{"GitHub"}</title>
            <path d="M12.5 0.309c-6.906 0 -12.5 5.597 -12.5 12.5 0 5.524 3.581 10.208 8.547 11.859 0.625 0.118 0.854 -0.269 0.854 -0.601 0 -0.297 -0.01 -1.083 -0.016 -2.125 -3.477 0.754 -4.21 -1.677 -4.21 -1.677C4.606 18.823 3.784 18.438 3.784 18.438c-1.132 -0.775 0.088 -0.759 0.088 -0.759 1.255 0.088 1.915 1.288 1.915 1.288 1.115 1.911 2.926 1.359 3.641 1.04 0.113 -0.808 0.434 -1.359 0.792 -1.672 -2.776 -0.313 -5.694 -1.388 -5.694 -6.177 0 -1.365 0.484 -2.479 1.286 -3.354 -0.141 -0.316 -0.563 -1.586 0.109 -3.308 0 0 1.047 -0.335 3.438 1.281 1 -0.278 2.063 -0.416 3.125 -0.422 1.063 0.006 2.125 0.144 3.125 0.422 2.375 -1.617 3.422 -1.281 3.422 -1.281 0.672 1.722 0.25 2.993 0.125 3.308 0.797 0.875 1.281 1.99 1.281 3.354 0 4.802 -2.922 5.859 -5.703 6.167 0.438 0.375 0.844 1.142 0.844 2.313 0 1.673 -0.016 3.017 -0.016 3.423 0 0.328 0.219 0.719 0.859 0.594C21.422 23.012 25 18.325 25 12.809c0 -6.903 -5.597 -12.5 -12.5 -12.5" />
          </svg>
        </button>
      </div>
      <br />
      <p className="registerLink">
        You don't have an account yet? <Link to="/auth/register">Register</Link>
      </p>
    </div>
  );
}
