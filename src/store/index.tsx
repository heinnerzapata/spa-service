import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "store/reducers";

import { IUserState } from "./user/reducer";

export interface IAppState {
  userReducer: IUserState;
}

const middleware = [
  applyMiddleware(thunk),
  ...((window as any).__REDUX_DEVTOOLS_EXTENSION__
    ? [(window as any).__REDUX_DEVTOOLS_EXTENSION__()]
    : []),
];

const store = createStore(reducers, compose(...middleware));
export default store;
