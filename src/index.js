import sdk from "@twa-dev/sdk";
import React from "react";
import ReactDOM from "react-dom/client"; // Импортируем createRoot
import App from "./App";

import { initGA } from "./analyticsGA"; // импорт инициализации GA

console.log("Telegram SDK:", sdk);
sdk.ready();

initGA(); // инициализация Google Analytics

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
