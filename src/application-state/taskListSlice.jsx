import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  list: [],
  editTask: {
    _id: null,
    title: "",
    description: "",
    tags: [],
    dueDate: null,
    priorityChoice: "Low Priority",
    createdDate: null,
    userId: null,
    status: "not started",
    boardName: "",
  },
  layout: "list",
};
// slice
const tasks = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addNewTask: (state, action) => {
      state.list.push(action.payload);
    },
    editExistTask: (state, action) => {
      const { idx, newTask } = action.payload;
      const upDateIndex = state.list.findIndex((task) => task._id === idx);
      state.list.splice(upDateIndex, 1, newTask);
    },
    setTaskLogin: (state, action) => {
      const tasks = action.payload;
      state.list = [...tasks];
    },
    initializeEdit: (state, action) => {
      state.editTask = action.payload;
    },
    setBoard: (state, action) => {
      state.editTask.boardName = action.payload;
    },
    resetEditTask: (state) => {
      state.editTask = initialState.editTask;
    },
    deleteTask: (state, action) => {
      const taskToDelete = state.list.findIndex((task) => task._id === action.payload);
      state.list.splice(taskToDelete, 1);
    },
    completeTk: (state, action) => {
      state.list.forEach((e) => {
        if (e._id === action.payload) {
          e.status = "Complete";
          e.boardName = "Done";
          e.dueDate = null;
          e.completedDate = new Date();
        }
      });
    },
    moveTask: (state, action) => {
      const { task, newIndex } = action.payload;
      state.list = state.list.filter((e) => e._id !== task._id);
      state.list.splice(newIndex, 0, task);
    },
    setLayout: (state, action) => {
      state.layout = action.payload;
    },
  },
});
export const { addNewTask, editExistTask, setTaskLogin, initializeEdit, resetEditTask, deleteTask, completeTk, moveTask, setBoard, setLayout } = tasks.actions;
export default tasks.reducer;
