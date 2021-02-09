/* eslint-disable import/prefer-default-export */
import { SET_MESSAGE } from '../types/message';

export const setMessage = (message: any) => (dispatch: any) => {
  dispatch({
    type: SET_MESSAGE,
    payload: {
      message,
    },
  });
};
