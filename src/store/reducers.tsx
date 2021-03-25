import { combineReducers } from 'redux';

import userReducer from 'store/user/reducer';
import companyReducer from 'store/company/reducer';
import deviceReducer from 'store/device/reducer';

const reducers = combineReducers({
  userReducer,
  companyReducer,
  deviceReducer,
});

export default reducers;
