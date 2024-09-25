import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.jsx";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./index.css";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Toaster richColors />
    <App />
  </>
);
