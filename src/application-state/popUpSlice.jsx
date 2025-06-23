import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPopUp: false,
  where: null,
  logOut: null,
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
    setLogOut: (state, actions) => {
      state.logOut = actions.payload;
    },
  },
});
export const { setPopUp, setPopUpLocation, setLogOut } = popUpSlice.actions;
export default popUpSlice.reducer;
