import isAuthReducer from "./authenticationSlice";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";
import localStorage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import tagReducer from "./tagSlice";
import taskListReducer from "./taskListSlice";
import rememberMeReducer from "./rememberMeSlice";
import popUpReducer from "./popUpSlice";
import boardReducer from "./boardSlice";

export const getStore = (useLocal = false) => {
  const storage = useLocal ? localStorage : sessionStorage;
  const persistConfig = {
    key: "root",
    storage,
    whitelist: ["isAuth", "tasks", "board"],
  };
  const rootReducer = combineReducers({
    isAuth: isAuthReducer,
    tagList: tagReducer,
    tasks: taskListReducer,
    rememberMe: rememberMeReducer,
    popUp: popUpReducer,
    board: boardReducer,
  });
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  const persistor = persistStore(store);
  return { store, persistor };
};
