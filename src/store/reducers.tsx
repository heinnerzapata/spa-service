import { combineReducers } from 'redux';

import userReducer from 'store/user/reducer';
import companyReducer from 'store/company/reducer';
import messageReducer from './reducers/message';
import subscriptionReducer from './reducers/subscription.reducer';

const reducers = combineReducers({
  messageReducer,
  userReducer,
  companyReducer,
  subscriptionReducer,
});

export default reducers;
