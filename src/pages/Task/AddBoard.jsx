import { useDispatch, useSelector } from "react-redux";
import { setPopUpLocation } from "../../application-state/popUpSlice";
import axios from "axios";
import { pushBoard } from "../../application-state/boardSlice";
export default function AddBoard() {
  const dispatcher = useDispatch();
  const boardList = useSelector((state) => state.board.boardList);
  const addBoard = () => {
    const name = document.getElementById("boardName").value;
    //prevent user from adding the same board
    const findBoard = boardList.find((board) => board.name === name);
    if (findBoard) return alert("Cannot create a duplicate board consider changing name");
    axios
      .post("http://localhost:5050/api/board", { name: name }, { withCredentials: true })
      .then((res) => {
        dispatcher(pushBoard(res.data.board));
        dispatcher(setPopUpLocation(null));
      })
      .catch((err) => {
        alert(`error:${err.response.status}:${err.response.data.msg}`);
      });
  };

  return (
    <div className="addTask" id="taskForm">
      <h3 id="header">Add New Board</h3>
      <input className="addTaskInput" type="text" name="boardName" id="boardName" placeholder="Board Name" />

      <div className="addBtnContainer">
        <input type="submit" value="Add board" className="confirmAdd backgroundBtn" onClick={addBoard} />
        <button onClick={() => dispatcher(setPopUpLocation(null))}>Cancel</button>
      </div>
    </div>
  );
}
