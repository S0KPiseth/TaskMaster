import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { moveTask } from "../application-state/taskListSlice";
const BASE_URL = import.meta.env.VITE_BACKEND_URI;
export function useDragNDrop(startDrag, endDrag) {
  const dispatcher = useDispatch();
  const tasks = useSelector((state) => state.tasks.list);
  const boardList = useSelector((state) => state.board.boardList);
  const taskLayout = useSelector((state) => state.tasks.layout);

  useGSAP(() => {
    if (taskLayout === "list") return;
    const dropAreas = gsap.utils.toArray(".dropArea");

    const handleDragEnter = (e) => {
      e.preventDefault();

      const el = e.currentTarget;
      const board = el.dataset.board;
      const index = Number(el.dataset.index);
      if (!board) return;

      endDrag.current = { board, index };

      const cardEl = document.querySelector(".tkCard");
      const height = cardEl?.offsetHeight || 80;

      gsap.to(el, { height, borderTop: "2px solid #0969da" });
    };

    const handleDragLeave = (e) => {
      const el = e.currentTarget;
      gsap.to(el, { height: "10px", border: 0 });
      endDrag.current = null;
    };

    const handleDrop = () => {
      if (!startDrag.current || !endDrag.current) return;

      const { id } = startDrag.current;
      const { board, index } = endDrag.current;
      const boardObject = boardList.find((b) => b.name === endDrag.current.board);

      if (!id || board === null || index === null) return;

      const draggedTask = tasks.find((task) => task._id === id);
      if (!draggedTask) return;

      const filteredTasks = tasks.filter((task) => task._id !== id);

      const targetBoard = filteredTasks.filter((task) => task.boardName === board);
      targetBoard.splice(index, 0, draggedTask);
      const otherTasks = filteredTasks.filter((task) => task.boardName !== board);
      const finalTasksArray = [...otherTasks, ...targetBoard];
      const indexOfChanging = finalTasksArray.findIndex((task) => task._id === draggedTask._id);
      //update backend

      let updatedTask;
      const today = new Date();
      if (endDrag.current.board === "Doing") {
        const dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3);
        //default deadline 3 days
        updatedTask = { ...draggedTask, dueDate: dueDate, boardName: endDrag.current.board, boardId: boardObject._id };
      } else if (endDrag.current.board === "Done") {
        updatedTask = { ...draggedTask, completedDate: today, boardName: endDrag.current.board, dueDate: null, boardId: boardObject._id };
      } else {
        updatedTask = { ...draggedTask, completedDate: null, boardName: endDrag.current.board, dueDate: null, boardId: boardObject._id };
      }

      axios
        .put(`${BASE_URL}/api/task`, { ...updatedTask, idx: draggedTask._id }, { withCredentials: true })
        .then((res) => {
          dispatcher(moveTask({ task: res.data.task, newIndex: indexOfChanging }));
          gsap.to(".dropArea", { height: "10px", border: 0 });

          // CLEANUP
          startDrag.current = null;
          endDrag.current = null;
        })
        .catch((err) => {
          alert(`error:${err}`);
        });
    };

    dropAreas.forEach((el) => {
      el.addEventListener("dragenter", handleDragEnter);
      el.addEventListener("dragleave", handleDragLeave);
      el.addEventListener("drop", handleDrop);
    });

    return () => {
      dropAreas.forEach((el) => {
        el.removeEventListener("dragenter", handleDragEnter);
        el.removeEventListener("dragleave", handleDragLeave);
        el.removeEventListener("drop", handleDrop);
      });
    };
  }, [tasks, taskLayout, boardList]);
}
