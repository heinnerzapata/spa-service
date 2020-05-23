import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { DEFAULT_CONFIG } from "./variables/constants/constants";

import "./index.scss";
import "./fonts/roboto/roboto.scss";
import "./fonts/orbitron/orbitron.scss";

import "materialize-css/dist/css/materialize.min.css";

// import registerServiceWorker from "./registerServiceWorker";
// import * as serviceWorker from './serviceWorker';

import store from "./store/store";

import App from "./App";

import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';

import common_es from "./translations/es/common.json";
import common_en from "./translations/en/common.json";

i18next.init({
  interpolation: { escapeValue: false },  
  lng: DEFAULT_CONFIG.defaultLanguage,                              
  resources: {
      en: {
          common: common_en               
      },
      es: {
          common: common_es
      },
  },
});

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <Provider store={store}>
      <App />
    </Provider>
  </I18nextProvider>,
  document.getElementById("root")
);
//registerServiceWorker();
