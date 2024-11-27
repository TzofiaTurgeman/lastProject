import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CurrentUserContextProvider } from "./context/currentUser.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CurrentUserContextProvider>
      <App />
    </CurrentUserContextProvider>
  </StrictMode>
);
