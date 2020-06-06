import { SET_SUBSCRIPTION, CLEAN_SUBSCRIPTION } from '../types/subscription.types';

export const setSubscription = (subscription: any) => {
  return (dispatch: any) => {
    dispatch({
       type: SET_SUBSCRIPTION,
       payload: subscription
    })
  }
}

export const cleanSubscription = () => {
  return (dispatch: any) => {
    dispatch({
       type: CLEAN_SUBSCRIPTION,
       payload: null
    })
  }
}