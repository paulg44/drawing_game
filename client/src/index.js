import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// async function enableMocking() {
//   // if (process.env.NODE_ENV === "development") {
//   const { worker } = await import("./mocks/browser");
//   worker.start();
//   // }
// }

// enableMocking(); // Start MSW

// Need to set this up as an environment variable to only work in a development branch?

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
