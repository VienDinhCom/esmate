import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "@/assets/styles/global.css";
import { TanStackApp } from "@/lib/tanstack";
import { reportWebVitals } from "@/lib/web-vitals";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <TanStackApp />
  </StrictMode>,
);

reportWebVitals();
