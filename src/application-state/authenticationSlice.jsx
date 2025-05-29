import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// initial state
const initialState = {
  value: false,
};

// create async thunk for auth status
export const getAuthStatus = createAsyncThunk("isAuth/getAuthStatus", async () => {
  const response = await axios.get("http://localhost:5050/api/auth/status");
  return response.data.value;
});

// slice
const isAuthenticated = createSlice({
  name: "isAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAuthStatus.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});
export default isAuthenticated.reducer;
