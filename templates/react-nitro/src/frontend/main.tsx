import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "@/frontend/assets/styles/global.css";
import { TanStackApp } from "@/frontend/lib/tanstack";
import { reportWebVitals } from "@/frontend/lib/web-vitals";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <TanStackApp />
  </StrictMode>,
);

reportWebVitals();
