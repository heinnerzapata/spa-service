import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "store/reducers";

import { IUserState } from "./user/reducer";

export interface IAppState {
  userReducer: IUserState;
}

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
