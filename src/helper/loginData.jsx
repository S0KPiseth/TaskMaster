import axios from "axios";
import { setUser, setAuth } from "../application-state/authenticationSlice";
import { getStore } from "../application-state/Store";
import { setTaskLogin } from "../application-state/taskListSlice";
import { setBoardList } from "../application-state/boardSlice";
import { setLayout } from "../application-state/taskListSlice";
const BASE_URL = import.meta.env.VITE_BACKEND_URI;

export default function fetchUserData(guestTasks, dispatcher, rememberMe) {
  axios
    .get(`${BASE_URL}/api/auth/me`, { withCredentials: true })
    .then(async (res) => {
      if (res.data.isAuth) {
        dispatcher(setUser(res.data.user));
        dispatcher(setAuth(true));
        dispatcher(setLayout("board"));

        const { store, persistor } = getStore(rememberMe);
        localStorage.setItem("rememberMe", rememberMe);
        rememberMe && window.location.reload();

        try {
          const boardRes = await axios.get(`${BASE_URL}/api/board`, { withCredentials: true });
          let boardData;

          if (boardRes.data.boards.length === 0) {
            const defaultBoardRes = await axios.post(`${BASE_URL}/api/board/default`, {}, { withCredentials: true });

            dispatcher(setBoardList(defaultBoardRes.data.boardList));
            boardData = [...defaultBoardRes.data.boardList];
          } else {
            dispatcher(setBoardList(boardRes.data.boards));
            boardData = [...boardRes.data.boards];
          }
          //store the task that user create when they are guess to the right board
          if (guestTasks) {
            for (const task of guestTasks) {
              const { _id, ...reqBody } = task;
              const board = boardData.find((e) => e.name === reqBody.boardName);

              try {
                await axios.post(`${BASE_URL}/api/task`, { ...reqBody, userId: res.data.user._id, boardId: board._id }, { withCredentials: true });
              } catch (err) {
                alert(`Task error: ${err.response?.status || ""}: ${err.response?.data?.msg || err.message}`);
              }
            }
          }
        } catch (boardErr) {
          console.error("Board fetching error:", boardErr);
          alert(`Board error: ${boardErr?.response?.data?.msg || boardErr.message}`);
        }

        try {
          const taskRes = await axios.get(`${BASE_URL}/api/task`, { withCredentials: true });
          dispatcher(setTaskLogin(taskRes.data));
        } catch (taskErr) {
          console.error("Task loading error:", taskErr);
          alert(`Task load error: ${taskErr?.response?.data?.msg || taskErr.message}`);
        }
      }
    })
    .catch((err) => {
      console.error("Auth fetch error:", err);
      alert(`Auth error: ${err.response?.data?.msg || err.message}`);
    });
}
