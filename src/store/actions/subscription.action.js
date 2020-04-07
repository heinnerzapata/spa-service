import { SET_SUBSCRIPTION, CLEAN_SUBSCRIPTION } from '../types/subscription.types';

export const setSubscription = (subscription) => {
  return dispatch => {
    dispatch({
       type: SET_SUBSCRIPTION,
       payload: subscription
    })
  }
}

export const cleanSubscription = () => {
  return dispatch => {
    dispatch({
       type: CLEAN_SUBSCRIPTION,
       payload: null
    })
  }
}