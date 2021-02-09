import { SET_SUBSCRIPTION, CLEAN_SUBSCRIPTION } from '../types/subscription.types';

export const setSubscription = (subscription: any) => (dispatch: any) => {
  dispatch({
    type: SET_SUBSCRIPTION,
    payload: subscription,
  });
};

export const cleanSubscription = () => (dispatch: any) => {
  dispatch({
    type: CLEAN_SUBSCRIPTION,
    payload: null,
  });
};
