import { createSlice } from "@reduxjs/toolkit";

const init = {
  boardList: [],
};
const boardSlice = createSlice({
  name: "board",
  initialState: init,
  reducers: {
    setBoardList: (state, action) => {
      state.boardList = [...action.payload];
    },
    pushBoard: (state, action) => {
      state.boardList.push(action.payload);
    },
  },
});
export const { setBoardList, pushBoard } = boardSlice.actions;
export default boardSlice.reducer;
