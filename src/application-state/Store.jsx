import { configureStore } from "@reduxjs/toolkit";
import isAuthReducer from "./authenticationSlice";
export const store = configureStore({
  reducer: {
    isAuth: isAuthReducer,
  },
});
