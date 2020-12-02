import { combineReducers } from "redux";

import messageReducer from "./reducers/message";
import userReducer from "store/user/reducer";
import companyReducer from "store/company/reducer";
import subscriptionReducer from "./reducers/subscription.reducer";

const reducers = combineReducers({
  messageReducer,
  userReducer,
  companyReducer,
  subscriptionReducer,
});

export default reducers;
