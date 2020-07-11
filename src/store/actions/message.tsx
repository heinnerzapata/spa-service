import { SET_MESSAGE } from "../types/message";
export const setMessage = (message: any) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_MESSAGE,
      payload: {
        message,
      },
    });
  };
};
