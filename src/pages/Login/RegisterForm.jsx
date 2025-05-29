import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
export function handleFormSubmission(e, setState) {
  const formDt = new FormData(e.target);
  const username = formDt.get("username");
  const password = formDt.get("password");
  const email = formDt.get("email");

  e.preventDefault();
  axios
    .post("http://localhost:5050/api/auth/register", {
      username,
      password,
      email,
    })
    .then((res) => {
      setState(false);
      if (200 <= res <= 299) {
        window.location.href = res.data.redirectUrl;
      }
    })
    .catch((err) => {
      alert(err.response.data.msg);
    });
}
export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(true);
  return (
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
      <label htmlFor="username">
        <input className="fields" type="text" name="username" placeholder="Enter your username" />
      </label>
      <label htmlFor="email">
        <input className="fields" type="email" name="email" placeholder="Enter your email main address" />
      </label>
      <label htmlFor="password">
        <input className="fields" type="password" name="password" placeholder="Create password" />
      </label>
      <label htmlFor="cpassword">
        <input className="fields" type="password" name="cpassword" placeholder="Confirm password" />
      </label>
      <div className="loginUtilsWrapper">
        <label htmlFor="remember">
          <input type="checkbox" name="remember" id="" />I agree to <a href="">Term of service</a>
        </label>
      </div>

      <br />
      <input className="login-btn" type="submit" value="Register" />
      <br />

      <p className="registerLink">
        Already have an account? <Link to="/auth">Login</Link>
      </p>
    </form>
  );
}
