import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { BillingProvider } from "./context/BillingContext";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BillingProvider>
      <App />
    </BillingProvider>
  </StrictMode>
);