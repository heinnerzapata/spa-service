import { userActionType } from "./types";
import { Dispatch } from "redux";
import services from "services";
import { ICredentials } from "models";

export interface ISignupStarted {
  type: userActionType.SIGNUP_STARTED;
}

export interface ISignupSuccess {
  type: userActionType.SIGNUP_SUCCESS;
  userInfo: any;
}

export interface ISignupError {
  type: userActionType.SIGNUP_ERROR;
  error: any;
}

export interface ILoginStarted {
  type: userActionType.LOGIN_STARTED;
}

export interface ILoginSuccess {
  type: userActionType.LOGIN_SUCCESS;
  userInfo: any;
}

export interface ILogOutSuccess {
  type: userActionType.LOGOUT_SUCCESS;
}

export interface ILoginError {
  type: userActionType.LOGIN_ERROR;
  error: any;
}

export interface ICleanToken {
  type: userActionType.CLEAN_TOKEN;
}

export interface ISetToken {
  type: userActionType.SET_TOKEN;
  token: string;
}

export interface ISetUserInfo {
  type: userActionType.SET_USER_INFO;
  userInfo: any;
}

export interface ICleanUserInfo {
  type: userActionType.CLEAN_USER_INFO;
}

export type IAction =
  | ICleanToken
  | ISetToken
  | ISetUserInfo
  | ICleanUserInfo
  | ILoginStarted
  | ILoginSuccess
  | ILoginError
  | ILogOutSuccess
  | ISignupStarted
  | ISignupSuccess
  | ISignupError;

export const cleanToken = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: userActionType.CLEAN_TOKEN,
    });
  };
};

export const setUserInfo = (userInfo: any) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: userActionType.SET_USER_INFO,
      userInfo,
    });
  };
};

export const cleanUserInfo = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: userActionType.CLEAN_USER_INFO,
    });
  };
};

export const signupStarted = (): ISignupStarted => ({
  type: userActionType.SIGNUP_STARTED,
});

export const signupSuccess = (userInfo: any): ISignupSuccess => ({
  type: userActionType.SIGNUP_SUCCESS,
  userInfo,
});

export const signupError = (error: any): ISignupError => ({
  type: userActionType.SIGNUP_ERROR,
  error,
});

export const loginStarted = (): ILoginStarted => ({
  type: userActionType.LOGIN_STARTED,
});

export const loginSuccess = (userInfo: any): ILoginSuccess => ({
  type: userActionType.LOGIN_SUCCESS,
  userInfo,
});

export const logOutSuccess = (): ILogOutSuccess => ({
  type: userActionType.LOGOUT_SUCCESS,
});

export const loginError = (error: any): ILoginError => ({
  type: userActionType.LOGIN_ERROR,
  error,
});

export const setToken = (token: string): ISetToken => ({
  type: userActionType.SET_TOKEN,
  token,
});

export const userLogOut = (email: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(loginStarted());
    try {
      await services.user.logout(email);
      dispatch(logOutSuccess());
      dispatch(setToken(""));
    } catch (error) {
      dispatch(loginError(error));
      return error;
    }
  };
};

export const signUp = (newUserInfo: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(signupStarted());

    try {
      const userInfo = (await services.user.signup(newUserInfo)) as any;

      dispatch(signupSuccess(userInfo));
      dispatch(setToken(userInfo.token));

      return Promise.resolve(userInfo);
    } catch (error) {
      dispatch(signupError(error));
      return error;
    }
  };
};

export const loginFromToken = (token: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(loginStarted());
    try {
      const userInfo = (await services.user.checkUserToken(token)) as any;

      dispatch(loginSuccess(userInfo.account));
      dispatch(setToken(token));

      return userInfo;
    } catch (error) {
      dispatch(loginError(error));
      return error;
    }
  };
};

export const loginFromCredentials = (credentials: ICredentials) => {
  return async (dispatch: Dispatch) => {
    dispatch(loginStarted());
    try {
      const userInfo = (await services.user.login(credentials)) as any;

      dispatch(loginSuccess(userInfo.account));
      dispatch(setToken(userInfo.token));

      return Promise.resolve(userInfo);
    } catch (error) {
      dispatch(loginError(error));
      return Promise.reject(error);
    }
  };
};
