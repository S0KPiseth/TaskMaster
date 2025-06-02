import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  user: [],
};
// slice
const isAuthenticated = createSlice({
  name: "isAuth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { setUser } = isAuthenticated.actions;
export default isAuthenticated.reducer;
