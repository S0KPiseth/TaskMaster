import "./TaskCard.css";
import "../../Query.css";
import { useEffect, useRef } from "react";
import { editExistTask, initializeEdit, resetEditTask } from "../../application-state/taskListSlice";
import { useDispatch, useSelector } from "react-redux";
import { setTag } from "../../application-state/tagSlice";
import { deleteTask, completeTk } from "../../application-state/taskListSlice";
import axios from "axios";
import { setPopUpLocation } from "../../application-state/popUpSlice";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const BASE_URL = import.meta.env.VITE_BACKEND_URI;

function TaskCard({ chooseTask, task, recent, id, boardName, startDrag, endDrag, radioValue }) {
  useGSAP(() => {
    if (radioValue === "list") {
      gsap.fromTo(animatedRef.current, { y: 100 }, { y: 0 });
    } else if (radioValue === "board") {
      gsap.fromTo(
        animatedRef.current,
        { scale: 0 },
        {
          scale: 1,
          onComplete: () => {
            if (id === chooseTask) {
              gsap.to(document.querySelector(".middleContent"), {
                duration: 0.5,
                scrollTo: animatedRef.current,
                onComplete: () => {
                  gsap.fromTo(animatedRef.current, { backgroundColor: "var(--color-primary-50)" }, { backgroundColor: "white" });
                },
              });
            }
          },
        }
      );
    }
    const handleDragStart = () => {
      if (radioValue === "list") return;
      startDrag.current = { board: boardName, id: id };
    };
    const handleEnd = () => {
      if (radioValue === "list") return;
      startDrag.current = null;
      endDrag.current = null;
    };

    animatedRef.current.addEventListener("dragstart", handleDragStart);
    animatedRef.current.addEventListener("dragend", handleEnd);
    return () => {
      animatedRef.current.removeEventListener("dragstart", handleDragStart);
      animatedRef.current.removeEventListener("dragend", handleEnd);
    };
  }, [chooseTask]);

  const DateRef = useRef(null);
  const animatedRef = useRef(null);
  const dispatcher = useDispatch();
  const user = useSelector((state) => state.isAuth.user);
  const popUpLocation = useSelector((state) => state.popUp.where);
  const isAuthenticated = useSelector((state) => state.isAuth.isAuthenticated);

  const editTask = (task) => {
    dispatcher(setPopUpLocation(null));
    dispatcher(resetEditTask());
    dispatcher(initializeEdit(task));
    dispatcher(setPopUpLocation("addTask"));
    dispatcher(setTag(task.tags));
  };
  //delete task
  const deleteUserTask = (task) => {
    if (user) {
      axios
        .delete(`${BASE_URL}/api/task/${task._id}`, { withCredentials: true })
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            dispatcher(deleteTask(task._id));
          }
        })
        .catch((err) => {
          alert(`Some thing went wrong ${err.response.status}: ${err.response.data.msg}`);
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
          .put(`${BASE_URL}/api/task/${currentTask._id}`, {}, { withCredentials: true })
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
  const updateTaskStatus = (status) => {
    if (isAuthenticated) {
      const { _id, ...rest } = task;
      const reqBody = { ...rest, status, idx: _id };
      axios
        .put(`${BASE_URL}/api/task`, reqBody, { withCredentials: true })
        .then((res) => dispatcher(editExistTask({ idx: res.data.task._id, newTask: res.data.task })))
        .catch((err) => alert(err));
    } else {
      const updatedTask = { ...task, status };
      dispatcher(editExistTask({ idx: updatedTask._id, newTask: updatedTask }));
    }
  };

  const tags = task.tags.map((e, index) => {
    return (
      <p key={index} style={{ backgroundColor: e.color, color: e.textColor, height: "fit-content" }}>
        {e.tagname}
      </p>
    );
  });
  //check due date
  useEffect(() => {
    const currentDate = new Date().toISOString();

    if (task.boardName === "Doing" && currentDate > task.dueDate) {
      updateTaskStatus("Over Due");
    } else if (task.boardName === "Doing" && currentDate < task.dueDate) {
      updateTaskStatus("In progress");
    }
  }, []);

  return (
    <div className="tkCard taskContent" ref={animatedRef} draggable={radioValue === "board"} id={`task${id}`}>
      <p className={`${task.priorityChoice == "Medium Priority" ? "priority-medium" : task.priorityChoice == "High Priority" ? "priority-high" : "priority-low"}`} id="taskPriority">
        {task.priorityChoice}
        <span>
          <svg width="12px" height="12px" viewBox="1.6 -0.017 22.4 25.634" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 2.383c-4 0 -5.066 -2.4 -10.133 -2.4C3.6 -0.017 1.6 2.45 1.6 2.45v22.366c0 0.442 0.358 0.8 0.8 0.8s0.8 -0.358 0.8 -0.8V14.62c0.844 -0.544 2.008 -1.037 3.467 -1.037 5.066 0 6.533 2.4 10.533 2.4s6.8 -2.4 6.8 -2.4v-13.6s-3 2.4 -7 2.4M22.4 12.768c-0.904 0.59 -2.82 1.615 -5.2 1.615 -1.573 0 -2.646 -0.432 -4.006 -0.978 -1.657 -0.666 -3.535 -1.422 -6.527 -1.422 -1.367 0 -2.527 0.344 -3.467 0.804v-9.687c0.602 -0.548 1.916 -1.517 3.667 -1.517 2.353 0 3.677 0.571 5.08 1.175 1.397 0.602 2.842 1.225 5.053 1.225 2.131 0 4.003 -0.589 5.4 -1.223z" fill="currentColor" />
          </svg>
        </span>
      </p>

      <div className="taskTitleNPriority">
        <p style={{ fontWeight: "var(--font-semibold)", fontSize: "var(--text-xl)" }} className={task.status == "Complete" ? "line-trough" : ""}>
          {task.title}
        </p>
        <p className={`taskProgress ${task.status == "In Progress" ? "in-progress" : task.status == "Over Due" ? "priority-high" : "complete"}`}>{task.status}</p>
      </div>

      <p className="taskDes">{task.description}</p>

      <div className="tags">{tags}</div>
      <div className="TagNControl">
        <p className="dateOfTask" ref={DateRef}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
          </svg>

          {task.dueDate ? `${new Date(task.dueDate).toDateString().slice(3, 10)} (Due)` : task.completedDate ? `${new Date(task.completedDate).toDateString().slice(3, 10)} (complete)` : "Not started"}
        </p>

        {!recent && (
          <div className="buttonTask">
            <button
              id="edit"
              onClick={() => {
                editTask(task);
              }}
              disabled={popUpLocation === "addTask" && true}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="75%" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              </svg>
            </button>
            <button id="complete" onClick={() => completeTask(task)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="75%" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </button>
            <button
              id="delete"
              onClick={() => {
                if (animatedRef) animatedRef.current.className += " fadeOutLeft";
                setTimeout(() => {
                  deleteUserTask(task);
                }, 300);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="75%" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  );
}
export default TaskCard;
