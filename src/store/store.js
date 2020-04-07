import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import messageReducer from './reducers/message';
import userReducer from './reducers/user.reducer';
import subscriptionReducer from './reducers/subscription.reducer';
import thunk from 'redux-thunk'
const reducer = combineReducers({
 messageReducer,
 userReducer,
 subscriptionReducer
})
const store = createStore(
 reducer,
 compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
 )
)
export default store;