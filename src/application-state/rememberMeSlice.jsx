import { createSlice } from "@reduxjs/toolkit";

const init = {
  value: false,
};

const rememberMeSlice = createSlice({
  name: "rememberMe",
  initialState: init,
  reducers: {
    toggleRememberMe: (state) => {
      state.value = !state.value;
    },
  },
});
export const { toggleRememberMe } = rememberMeSlice.actions;
export default rememberMeSlice.reducer;
