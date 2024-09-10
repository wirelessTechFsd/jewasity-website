import React from "react";
import { hydrate, render } from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "react-datepicker/dist/react-datepicker.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import mixpanel from "mixpanel-browser";
import { HelmetProvider } from "react-helmet-async";

mixpanel.init("4fbbe7193eeaa9f4e91b347194243689");

const rootElement = document.getElementById("root");

// Use hydrate if the app is already rendered, otherwise use render
const app = (
  <HelmetProvider>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </HelmetProvider>
);

if (rootElement.hasChildNodes()) {
  hydrate(app, rootElement);
} else {
  render(app, rootElement);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
