import "./addBoard.css";
import { useDispatch } from "react-redux";
import { setPopUp } from "../../application-state/popUpSlice";

export default function AddBoard() {
  const dispatch = useDispatch();
  return (
    <div className="addBoardWrapper">
      <div>
        <button
          className="cancelBoardBtn"
          onClick={() => {
            dispatch(setPopUp(false));
          }}
        >
          <svg width="24px" height="24px" viewBox="0 0 0.54 0.54" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
            <title>{"Icon/18/icon-close"}</title>
            <desc>{"\n    Created with Sketch.\n  "}</desc>
            <defs />
            <g id="out" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd" sketch:type="MSPage">
              <path d="M0.427 0.144 0.396 0.112 0.27 0.238 0.144 0.112 0.112 0.144 0.238 0.27 0.112 0.396l0.032 0.032L0.27 0.302l0.126 0.126 0.032 -0.032L0.302 0.27z" id="path" fill="#000000" sketch:type="MSShapeGroup" />
            </g>
          </svg>
        </button>
      </div>
      <div className="createBoard">
        <div className="nameOfBoard">
          <div>
            <h1>Create Board</h1>
          </div>
          <div>
            <input type="text" placeholder="Name" />
          </div>
        </div>
        <div className="moveTask">
          <input type="text" placeholder="Find task to add" />
        </div>
      </div>
      <div>
        <button className="cancelBoardBtn backgroundBtn Done">Done</button>
      </div>
    </div>
  );
}
