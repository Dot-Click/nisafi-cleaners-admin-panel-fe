import React from "react";
import ReactDOM from "react-dom/client";
// import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import "./App.css";
// import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <QueryClientProvider client={queryClient}>
  <App />
  // <ReactQueryDevtools initialIsOpen={false} />
  // </QueryClientProvider>
);
// ReactDOM.render(
//   <QueryClientProvider client={queryClient}>
//     <App />
//     <ReactQueryDevtools initialIsOpen={false} />
//   </QueryClientProvider>,
//   document.getElementById("root")
// );
