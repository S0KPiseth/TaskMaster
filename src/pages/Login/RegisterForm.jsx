import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BACKEND_URI;

export default function RegisterForm() {
  const [correctPw, setCorrectPw] = useState(false);
  const [termState, setTermState] = useState(false);
  const termRef = useRef(null);
  function handleFormSubmission(e) {
    const formDt = new FormData(e.target);
    const fname = formDt.get("fname");
    const lname = formDt.get("lname");
    const username = formDt.get("username");
    const password = formDt.get("password");
    const email = formDt.get("email");

    e.preventDefault();
    axios
      .post(`${BASE_URL}/api/auth/register`, {
        fname,
        lname,
        username,
        password,
        email,
      })
      .then((res) => {
        if (200 <= res <= 299) {
          window.location.href = res.data.redirectUrl;
        }
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  }
  const checkComFirmPw = (e) => {
    console.log(!correctPw || !termRef.current.checked);
    const passwordField = document.getElementById("password");
    if (passwordField.value === e.target.value) {
      e.target.style.border = "2px solid green";
      setCorrectPw(true);
    } else {
      e.target.style.border = "2px solid red";
      setCorrectPw(false);
    }
  };
  return (
    <div className="loginFormWrapper">
      <form
        onSubmit={(e) => {
          handleFormSubmission(e, setIsLoading);
        }}
      >
        <div>
          <h1>New here? Welcome come abroad</h1>
          <p id="loginSlogan">Let's make your day organize</p>
        </div>
        <br />
        <div className="nameWrapper">
          <label htmlFor="fname">
            <input className="fields name" type="text" name="fname" placeholder="First name" required />
          </label>
          <label htmlFor="lname">
            <input className="fields name" type="text" name="lname" placeholder="Last name" required />
          </label>
        </div>

        <label htmlFor="username">
          <input className="fields" type="text" name="username" placeholder="Enter your username" required />
        </label>
        <label htmlFor="email">
          <input className="fields" type="email" name="email" placeholder="Enter your email main address" required />
        </label>
        <label htmlFor="password">
          <input className="fields" type="password" name="password" placeholder="Create password" id="password" required />
        </label>
        <label htmlFor="cpassword">
          <input className="fields" type="password" name="cpassword" placeholder="Confirm password" onChange={checkComFirmPw} />
        </label>
        <div className="loginUtilsWrapper">
          <label htmlFor="remember">
            <input type="checkbox" name="remember" id="terms" onChange={(e) => setTermState(e.target.checked)} />I agree to <a href="">Term of service</a>
          </label>
        </div>

        <br />
        <input className="login-btn" type="submit" value="Register" disabled={!termState || !correctPw} />
        <br />

        <p className="registerLink">
          Already have an account? <Link to="/auth">Login</Link>
        </p>
      </form>
    </div>
  );
}
