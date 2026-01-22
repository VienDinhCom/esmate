import { createRoot } from "react-dom/client";
import "./assets/main.css";
import { App } from "./app";

const container = document.getElementById("app");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
