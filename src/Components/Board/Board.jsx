import TaskCard from "../TaskCard/TaskCard";
import { useSelector, useDispatch } from "react-redux";
import { setPopUpLocation } from "../../application-state/popUpSlice";
import { setBoard } from "../../application-state/taskListSlice";
import { useDragNDrop } from "../../helper/dragNdrop";
import { useRef } from "react";
export default function Board(props) {
  const dispatcher = useDispatch();
  const tasks = useSelector((state) => state.tasks.list);
  const startDrag = useRef(null);
  const endDrag = useRef(null);
  const taskLayout = useSelector((state) => state.tasks.layout);
  useDragNDrop(startDrag, endDrag);

  return (
    <div className="board" key={props.board.name}>
      <div className="boardHeader">
        <p>
          {props.board.name}
          <span>{tasks.filter((e) => e.boardName === props.board.name).length}</span>
        </p>
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 0.72 0.72"
          xmlns="http://www.w3.org/2000/svg"
          id="plus"
          onClick={() => {
            dispatcher(setPopUpLocation("addTask"));
            dispatcher(setBoard(props.board.name));
          }}
        >
          <path d="M0.57 0.33h-0.18V0.15a0.03 0.03 0 0 0 -0.06 0v0.18H0.15a0.03 0.03 0 0 0 0 0.06h0.18v0.18a0.03 0.03 0 0 0 0.06 0v-0.18h0.18a0.03 0.03 0 0 0 0 -0.06" fill="currentColor" />
        </svg>
      </div>

      {tasks.filter((e) => e.boardName === props.board.name).length > 0 ? (
        tasks
          .filter((e) => e.boardName === props.board.name)
          .map((e, index) => (
            <div key={e._id}>
              {index === 0 && (
                <div className="dropArea" onDragOver={(e) => e.preventDefault()} data-board={e.boardName} data-index={index}>
                  &nbsp;
                </div>
              )}

              <TaskCard chooseTask={props.catchall} task={e} id={e._id} boardName={e.boardName} startDrag={startDrag} endDrag={endDrag} radioValue={taskLayout} />
              <div className="dropArea" onDragOver={(e) => e.preventDefault()} data-board={e.boardName} data-index={index + 1}>
                &nbsp;
              </div>
            </div>
          ))
      ) : (
        <div className="dropArea" onDragOver={(e) => e.preventDefault()} data-board={props.board.name} data-index={0}>
          &nbsp;
        </div>
      )}
    </div>
  );
}
