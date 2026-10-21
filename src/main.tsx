import { createRoot } from "react-dom/client";
import { App } from "./App";
import { BrowserRouter } from "react-router";
import "./styles.css";
const rootElement = document.getElementById("root");
if (!(rootElement instanceof HTMLElement)) {
  throw new Error("Nie znaleziono elementu root");
}
createRoot(rootElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
