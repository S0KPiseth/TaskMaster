import { createSlice } from "@reduxjs/toolkit";

const tagSlice = createSlice({
  name: "tag",
  initialState: {
    list: [],
  },
  reducers: {
    addTag: (state, action) => {
      state.list.push(action.payload);
    },
    changeColor: (state, action) => {
      const { idxToUpdate, updatedColor, improveTexColor } = action.payload;
      if (state.list.length > 0) {
        state.list[idxToUpdate].color = updatedColor;
        state.list[idxToUpdate].texColor = improveTexColor;
      }
    },
    clearTags: (state) => {
      state.list = [];
    },
    setTag: (state, action) => {
      state.list = action.payload;
    },
    removeByIDX: (state, action) => {
      const { index } = action.payload;
      state.list.splice(index, 1);
    },
  },
});

export const { addTag, changeColor, clearTags, setTag, removeByIDX } = tagSlice.actions;
export default tagSlice.reducer;
