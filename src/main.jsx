import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./general-sans.css";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { getStore } from "./application-state/Store.jsx";
import { PersistGate } from "redux-persist/integration/react";
const { store, persistor } = getStore(false);
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  // </StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App persistor={persistor} />
    </PersistGate>
  </Provider>
);
