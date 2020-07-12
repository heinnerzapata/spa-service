import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "store/reducers";

import { IUserState } from "./user/reducer";

export interface IAppState {
  userReducer: IUserState;
}

const devtools =
  process.env.NODE_ENV === "test"
    ? (x: any) => x /* eslint-disable no-underscore-dangle */
    : (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__();
/* eslint-enable no-underscore-dangle */

const store = createStore(reducers, compose(applyMiddleware(thunk), devtools));
export default store;
