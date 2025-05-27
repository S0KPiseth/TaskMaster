import "./Dashboard.css";
import DashboardCard from "../../Components/DateCard/DashboardCard";
import TaskCard from "../../Components/TaskCard/TaskCard";
import { Link, Navigate } from "react-router-dom";
import { useEffect } from "react";

function Dashboard({ taskList, setAddStatus }) {
  if (!document.cookie) {
    return <Navigate to="/login" replace />;
  }
  const recent = taskList.map((e) => {
    return <TaskCard taskItems={e} recent={true} />;
  });
  [recent[0], recent[1]] = [recent[recent.length - 1], recent[recent.length - 2]];
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

        <div className="recentTask">{recent.slice(0, 2)}</div>
      </div>
    </>
  );
}
export default Dashboard;
