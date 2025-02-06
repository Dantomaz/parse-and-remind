import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Routing from "./routing/Routing";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Routing>
      <App />
    </Routing>
  </React.StrictMode>
);
