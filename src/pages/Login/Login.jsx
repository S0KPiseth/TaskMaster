import "./login.css";
export default function Login(props) {
  return (
    <div className="loginDiv">
      <form action="http://localhost:5000" method="POST">
        <label htmlFor="username">
          <input className="fields" type="text" name="username" placeholder="Enter your Username" />
        </label>
        <label htmlFor="password">
          <input className="fields" type="password" name="password" placeholder="Enter your password" />
        </label>
        <a href="">Forgot password?</a>
        <input type="submit" value="Login" />
        <label htmlFor="tos">
          <input type="radio" name="tos" id="" />I agree to term of services
        </label>
        <div>
          <button className="thirdParty"></button>
          <button className="thirdParty"></button>
          <button className="thirdParty"></button>
        </div>
      </form>
    </div>
  );
}
