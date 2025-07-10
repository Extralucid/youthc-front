import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from "./App";
import { Provider } from "react-redux";
import store from "./stores/authStore";


const rootElement = document.getElementById("root") as Element;
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
