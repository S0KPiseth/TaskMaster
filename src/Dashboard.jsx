import "./Dashboard.css";
import DashboardCard from "./DashboardCard";
import TaskCard from "./TaskCard";

function Dashboard() {
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
          <button className="addTaskBtn">&#x2B; Add new</button>
        </div>

        <div className="recentTask">
          {/* <TaskCard />
          <TaskCard />
          <TaskCard /> */}
        </div>
      </div>
    </>
  );
}
export default Dashboard;
