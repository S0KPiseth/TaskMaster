import { useSelector } from "react-redux";
import TaskCard from "../TaskCard/TaskCard";
export default function List(props) {
  const taskLayout = useSelector((state) => state.tasks.layout);
  return (
    <>
      {props.taskToRender.length > 0 ? (
        props.taskToRender.map((e, index) => (
          <div key={e._id}>
            {index === 0 && <br />}
            <TaskCard chooseTask={props.catchall} task={e} radioValue={taskLayout} />
            <br />
          </div>
        ))
      ) : (
        <p className="noTasks">You haven't created any tasks. Click "Add New Task" to create one.</p>
      )}
    </>
  );
}
