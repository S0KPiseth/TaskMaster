import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  user: null,
  isAuthenticated: false,
};
// slice
const isAuthenticated = createSlice({
  name: "isAuth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
    },
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});
export const { setUser, setAuth } = isAuthenticated.actions;
export default isAuthenticated.reducer;
