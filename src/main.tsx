import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "unfonts.css";
import "./styles/globals.css";

import App from "./app.tsx";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
