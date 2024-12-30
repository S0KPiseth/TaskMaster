import "./Dashboard.css";
import DashboardCard from "./DashboardCard";
import TaskCard from "./TaskCard";

function Dashboard({ taskList, setNavigationHelper, setAddStatus }) {
  const recent = taskList.map((e) => {
    return <TaskCard taskList={e} recent={true} />;
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
          <button
            className="addTaskBtn"
            onClick={() => {
              setNavigationHelper("Tasks");
              window.scrollTo(0, 0);
              setAddStatus(true);
            }}
          >
            &#x2B; Add new
          </button>
        </div>

        <div className="recentTask">{recent.slice(0, 2)}</div>
      </div>
    </>
  );
}
export default Dashboard;
