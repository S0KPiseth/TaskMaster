import "./TaskCard.css";
import { useEffect, useRef, useState } from "react";
import { initializeEdit } from "../../application-state/taskListSlice";
import { useDispatch, useSelector } from "react-redux";
import { setTag } from "../../application-state/tagSlice";
import { deleteTask, completeTk } from "../../application-state/taskListSlice";
import axios from "axios";
// taskList, taskItems, editTask, index, completeTask, deleteTask, recent, isTabletScreen
function TaskCard({ task, recent, isTabletScreen, setAddStatus }) {
  const myRef = useRef(null);
  const DateRef = useRef(null);
  const [isTouching, setIsTouching] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const animatedRef = useRef(null);
  const dispatcher = useDispatch();
  const user = useSelector((state) => state.isAuth.user);

  const checkCollision = () => {
    if (!myRef.current || !DateRef.current) return;
    const tagsBox = myRef.current.getBoundingClientRect();
    const dateBox = DateRef.current.getBoundingClientRect();
    const threshold = 2;
    const isBorderTouching =
      // Touching on right/left
      Math.abs(dateBox.right - tagsBox.left) <= threshold ||
      // OR boxes are overlapping
      (dateBox.left < tagsBox.right && dateBox.right > tagsBox.left);
    isBorderTouching && setIsTouching(true);
  };

  useEffect(() => {
    const handleWidth = () => {
      setWindowWidth(window.innerWidth);
      checkCollision();
    };
    handleWidth();
    window.addEventListener("resize", handleWidth);
    return () => window.removeEventListener("resize", handleWidth);
  }, []);

  useEffect(() => {
    checkCollision();
  }, [windowWidth, task.tags.length]);
  const editTask = (task) => {
    dispatcher(initializeEdit(task));
    setAddStatus(true);
    dispatcher(setTag(task.tags));
  };
  //delete task
  const deleteUserTask = (task) => {
    if (user) {
      axios
        .delete(`http://localhost:5050/api/task/${task._id}`, { withCredentials: true })
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            dispatcher(deleteTask(task._id));
          }
        })
        .catch((err) => {
          alert("Some thing went wrong " + err.response.status + ": " + err.response.data.msg);
        });
    } else {
      dispatcher(deleteTask(task._id));
    }
  };
  //complete task
  const completeTask = (currentTask) => {
    if (!["Complete", "Over due"].includes(currentTask.status)) {
      if (user) {
        axios
          .put(`http://localhost:5050/api/task/${currentTask._id}`, { withCredentials: true })
          .then((res) => {
            if (res.status >= 200 && res.status < 300) {
              dispatcher(completeTk(currentTask._id));
            }
          })
          .catch((err) => {
            alert("Some thing went wrong " + err.response.status + ": " + err.response.data.msg);
          });
      } else {
        dispatcher(completeTk(currentTask._id));
      }
    } else {
      alert("The task already complete or it over due");
    }
  };

  const tags = task.tags.map((e, index) => {
    return (
      <p key={index} style={{ backgroundColor: e.color, color: e.textColor }}>
        {e.tagname}
      </p>
    );
  });
  return (
    <div className="tkCard slideInUP" ref={animatedRef}>
      <div className="taskContent">
        <p style={{ fontWeight: "var(--font-semibold)", fontSize: "var(--text-xl)" }} className={task.status == "Complete" ? "line-trough" : ""}>
          {task.title}
        </p>
        <p style={{ fontSize: "var(--text-lg)", color: "var(--color-gray-500)" }}>{task.description}</p>
        <div className="tags">{(isTabletScreen || isTouching) && tags}</div>
        <p style={{ color: "var(--color-gray-500)", display: "flex", columnGap: "10px", width: "fit-content", alignItems: "center" }} ref={DateRef}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 2v4"></path>
            <path d="M16 2v4"></path>
            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
            <path d="M3 10h18"></path>
          </svg>
          {task.dueDate.slice(0, 10)}
        </p>
      </div>
      <div id="TagsNControl">
        <p className={task.status == "In Progress" ? "in-progress" : task.status == "Over due" ? "priority-high" : "complete"}>{task.status}</p>
        <div id="innerTagNControl">
          <div className="tags" ref={myRef}>
            <p className={task.priorityChoice == "Medium Priority" ? "priority-medium" : task.priorityChoice == "High Priority" ? "priority-high" : "priority-low"}>{task.priorityChoice}</p>
            {!isTabletScreen && !isTouching && tags}
          </div>
          {!recent && (
            <div id="buttonTask">
              <button
                id="edit"
                onClick={() => {
                  editTask(task);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                </svg>
              </button>
              <button id="complete" onClick={() => completeTask(task)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </button>
              <button
                id="delete"
                onClick={() => {
                  animatedRef && (animatedRef.current.className += " fadeOutLeft");
                  setTimeout(() => {
                    deleteUserTask(task);
                  }, 300);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default TaskCard;
