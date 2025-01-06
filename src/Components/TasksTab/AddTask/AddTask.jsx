import "../TaskTab.css";
import TagContent from "../TagContent/TagContent";

function AddTask({ taskList, setAddStatus, tags, setTag, setTaskList, tagUpdate, editTaskValue, editTaskIndex }) {
  function removeTag(idx) {
    const updatedArray = tags.filter((_, index) => index !== idx);
    setTag(updatedArray);
  }
  function addTag(e) {
    if (e.key == "Enter" && e.target.value != "") {
      setTag((t) => [...t, { tagname: e.target.value, color: "black", textColor: "white" }]);
    } else if (e.key == "Enter" && e.target.value == "") {
      e.target.className = "shakingInput";
      setTimeout(() => {
        e.target.className = "";
      }, 200);
    }
  }
  function addTask() {
    if (document.getElementById("title").value && document.getElementById("date").value) {
      let tagConfig = tags;
      tagUpdate.current.forEach((element) => {
        const [r, g, b] = element[1]
          .replace(/^#/, "")
          .match(/.{2}/g)
          .map((hex) => parseInt(hex, 16));
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        let textColor = luminance > 0.5 ? "#000000" : "#FFFFFF";

        tagConfig[element[0]].color = element[1];
        tagConfig[element[0]].textColor = textColor;
      });
      tagUpdate.current = [];

      const e = document.getElementById("priorityChoice");
      const text = e.options[e.selectedIndex].text;
      const taskToAdd = [document.getElementById("title").value, document.getElementById("description").value, tags, document.getElementById("date").value, text, "In Progress"];
      if (editTaskIndex.current == null) {
        setTaskList((t) => [...t, taskToAdd]);
      } else {
        const tempTask = [...taskList];
        tempTask[editTaskIndex.current] = taskToAdd;
        setTaskList(tempTask);
        editTaskIndex.current = null;
        editTaskValue.current = [];
      }

      setAddStatus(false);
      setTag([]);
    } else {
      alert("Task title and Due date cannot be empty!");
    }
  }

  return (
    <div className="addTask">
      <h3 id="header">Add New Task</h3>
      <input type="text" name="" id="title" placeholder="Task title" required defaultValue={editTaskValue.current[0]} />
      <input type="text" name="" id="description" placeholder="Task description" defaultValue={editTaskValue.current[1]} />
      <label htmlFor="">
        {tags.map((e, idx) => {
          return <TagContent key={idx} tagElement={e} tags={tags} index={idx} removeTag={removeTag} tagUpdate={tagUpdate} />;
        })}

        <input type="text" name="" placeholder="add tags" onKeyDown={(e) => addTag(e)} />
      </label>

      <div className="lastInput">
        <input type="date" name="" id="date" defaultValue={editTaskValue.current[3]} />
        <select name="" id="priorityChoice" className="selectClass" defaultValue={editTaskValue.current[4]}>
          <option value="High Priority">High Priority</option>
          <option value="Medium Priority">Medium Priority</option>
          <option value="Low Priority">Low Priority</option>
        </select>
      </div>
      <div className="addBtnContainer">
        <button className="addTaskBtn" onClick={addTask}>
          Add Task
        </button>
        <button
          className="addTaskBtn"
          onClick={() => {
            setTag([]);
            setAddStatus(false);
            editTaskIndex.current = null;
            editTaskValue.current = [];
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
export default AddTask;
