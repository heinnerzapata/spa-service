import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store from 'store';
import Router from 'router';

const App: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </Provider>
);

export default App;
