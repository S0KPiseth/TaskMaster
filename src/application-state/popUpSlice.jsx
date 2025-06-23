import { createSlice } from "@reduxjs/toolkit";
import reducer from "./taskListSlice";

const initialState = {
  isPopUp: false,
  where: null,
};

const popUpSlice = createSlice({
  name: "popUp",
  initialState,
  reducers: {
    setPopUp: (state, actions) => {
      state.isPopUp = actions.payload;
    },
    setPopUpLocation: (state, actions) => {
      state.where = actions.payload;
    },
  },
});
export const { setPopUp, setPopUpLocation } = popUpSlice.actions;
export default popUpSlice.reducer;
