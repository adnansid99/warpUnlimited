import React from "react";
import ReactDOM from "react-dom/client";
import Index from "./components/Index.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
