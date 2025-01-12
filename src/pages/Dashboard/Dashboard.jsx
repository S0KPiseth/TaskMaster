import "./Dashboard.css";
import DashboardCard from "../../Components/DateCard/DashboardCard";
import TaskCard from "../../Components/TaskCard/TaskCard";
import { Link } from "react-router-dom";

function Dashboard({ taskList, setAddStatus }) {
  const recent = taskList.map((e) => {
    return <TaskCard taskItems={e} recent={true} />;
  });
  [recent[0], recent[1]] = [recent[recent.length - 1], recent[recent.length - 2]];
  return (
    <>
      <div className="dashBoard">
        <h2 style={{ marginBottom: "20px" }}>Dashboard</h2>
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
              className="addTaskBtn"
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
