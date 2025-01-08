import "./AccountOptions.css";
export default function Unauthorized() {
  return (
    <div className="uaDiv flex-centerDiv">
      <button className="uaBtn" id="login">
        Login
      </button>
      <button className="uaBtn">Get Start</button>
    </div>
  );
}
