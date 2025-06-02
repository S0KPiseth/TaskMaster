import "./AccountOptions.css";
import { Link } from "react-router-dom";
export default function Unauthorized() {
  return (
    <div className="uaDiv flex-centerDiv ">
      <Link to="/auth">
        <button className="uaBtn" id="login">
          Login
        </button>
      </Link>
      <Link to="/auth/register">
        <button className="uaBtn backgroundBtn registerBtn">Get Start</button>
      </Link>
    </div>
  );
}
