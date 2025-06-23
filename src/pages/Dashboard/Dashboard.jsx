import "./Dashboard.css";
import DashboardCard from "../../Components/DateCard/DashboardCard";
import TaskCard from "../../Components/TaskCard/TaskCard";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import fetchUserData from "../../helper/loginData";
import { useEffect } from "react";
import { setPopUpLocation } from "../../application-state/popUpSlice";

function Dashboard() {
  const tasks = useSelector((state) => state.tasks.list);
  const isAuthenticated = useSelector((state) => state.isAuth.isAuthenticated);
  const rememberMe = useSelector((state) => state.rememberMe.value);
  const dispatcher = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      fetchUserData(tasks, dispatcher, rememberMe);
    }
  }, []);

  let recent = tasks.map((e, index) => {
    return <TaskCard task={e} recent={true} key={"sdfsadfsd" + index} />;
  });
  if (recent.length === 0) {
    recent = <p className="noTasks">No tasks to show</p>;
  }

  return (
    <>
      <div className="dashBoard">
        <div className="dbcContainer">
          <DashboardCard type={"task"} />
          <DashboardCard type={"progress"} />
          <DashboardCard type={"complete"} />
          <DashboardCard type={"overdue"} />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }} className="header2">
          <h2>Recent Task</h2>
          <Link to="/Tasks">
            <button
              className="addTaskBtn backgroundBtn"
              onClick={() => {
                window.scrollTo(0, 0);
                dispatcher(setPopUpLocation("addTask"));
              }}
            >
              &#x2B; Add new
            </button>
          </Link>
        </div>
        <div className="recentTask">{recent}</div>
      </div>
    </>
  );
}
export default Dashboard;
