import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./i18n";

import "./index.scss";
import "./fonts/roboto/roboto.scss";
import "./fonts/orbitron/orbitron.scss";

import store from "./store";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
