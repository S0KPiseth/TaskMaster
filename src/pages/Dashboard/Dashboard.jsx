import "./Dashboard.css";
import DashboardCard from "../../Components/DateCard/DashboardCard";
import TaskCard from "../../Components/TaskCard/TaskCard";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Dashboard({ taskList, setAddStatus }) {
  const ApiStatus = useSelector((state) => state.isAuth.user);
  console.log(ApiStatus);
  let recent;
  if (ApiStatus._id) {
    recent = ApiStatus.tasks.map((e, index) => {
      return <TaskCard taskItems={e} recent={true} key={"sdfsadfsd" + index} />;
    });
  } else {
    recent = ApiStatus.map((e, index) => {
      return <TaskCard taskItems={e} recent={true} key={"sdfsadfsd" + index} />;
    });
  }
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
                setAddStatus(true);
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
