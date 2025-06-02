import isAuthReducer from "./authenticationSlice";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import tagReducer from "./tagSlice";
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  isAuth: isAuthReducer,
  tagList: tagReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
