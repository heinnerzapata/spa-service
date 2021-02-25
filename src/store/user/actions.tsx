import { Dispatch } from 'redux';
import { ICredentials } from 'models';
import services from 'services';
import { clearCompany } from 'store/company/actions';
import { userActionType } from './types';

export interface ISignupStarted {
  type: userActionType.SIGNUP_STARTED;
}

export interface IUpdateUserStarted {
  type: userActionType.UPDATE_USER_STARTED;
}

export interface IUpdateUserSuccess {
  type: userActionType.UPDATE_USER_SUCCESS;
  userInfo: any;
}

export interface IUpdateUserError {
  type: userActionType.UPDATE_USER_ERROR;
  error: any;
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
  companyId: string | null;
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

export interface IRecoverStarted {
  type: userActionType.RECOVER_STARTED;
}

export interface IRecoverSuccess {
  type: userActionType.RECOVER_SUCCESS;
}

export interface IRecoverError {
  type: userActionType.RECOVER_ERROR;
  error: string;
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
  | ISignupError
  | IRecoverStarted
  | IRecoverSuccess
  | IRecoverError
  | IUpdateUserStarted
  | IUpdateUserSuccess
  | IUpdateUserError;

export const cleanToken = () => (dispatch: Dispatch) => {
  dispatch({
    type: userActionType.CLEAN_TOKEN,
  });
};

export const setUserInfo = (userInfo: any) => (dispatch: Dispatch) => {
  dispatch({
    type: userActionType.SET_USER_INFO,
    userInfo,
  });
};

export const cleanUserInfo = () => (dispatch: Dispatch) => {
  dispatch({
    type: userActionType.CLEAN_USER_INFO,
  });
};

export const signupStarted = (): ISignupStarted => ({
  type: userActionType.SIGNUP_STARTED,
});

export const updateUserStarted = (): IUpdateUserStarted => ({
  type: userActionType.UPDATE_USER_STARTED,
});

export const updateUserSuccess = (userInfo: any): IUpdateUserSuccess => ({
  type: userActionType.UPDATE_USER_SUCCESS,
  userInfo,
});

export const updateUserError = (error: any): IUpdateUserError => ({
  type: userActionType.UPDATE_USER_ERROR,
  error,
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

export const loginSuccess = (
  userInfo: any,
  companyId: string | null,
): ILoginSuccess => ({
  type: userActionType.LOGIN_SUCCESS,
  userInfo,
  companyId,
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

export const recoverStarted = (): IRecoverStarted => ({
  type: userActionType.RECOVER_STARTED,
});

export const recoverSuccess = (): IRecoverSuccess => ({
  type: userActionType.RECOVER_SUCCESS,
});

export const recoverError = (error: string): IRecoverError => ({
  type: userActionType.RECOVER_ERROR,
  error,
});

export const updateUser = (newUserInfo: any, hexId: string) => async (dispatch: Dispatch) => {
  dispatch(updateUserStarted());
  try {
    const result = (await services.user.updateAccount(
      newUserInfo,
      hexId,
    )) as any;
    const { data } = result.response;
    const userInfo = data.account;
    dispatch(updateUserSuccess(userInfo));

    return await Promise.resolve(userInfo);
  } catch (error) {
    dispatch(updateUserError(error));

    return Promise.reject(error);
  }
};

export const userLogOut = (email: string) => async (dispatch: Dispatch) => {
  dispatch(loginStarted());
  try {
    await services.user.logout(email);
    dispatch(logOutSuccess());
    dispatch(setToken(''));

    return await Promise.resolve();
  } catch (error) {
    dispatch(loginError(error));

    return Promise.reject(error);
  }
};

export const signUp = (newUserInfo: any) => async (dispatch: Dispatch) => {
  dispatch(signupStarted());

  try {
    const result = (await services.user.signup(newUserInfo)) as any;
    const userInfo = result.response.data.account;
    const resultToken = result.response.data.token;
    const { data } = result.response;

    dispatch(signupSuccess(userInfo));
    dispatch(setToken(resultToken));

    return await Promise.resolve(data);
  } catch (error) {
    dispatch(signupError('error'));

    return Promise.reject(error);
  }
};

export const loginFromToken = (token: string) => async (dispatch: Dispatch) => {
  dispatch(loginStarted());
  try {
    const result = (await services.user.checkUserToken(token)) as any;
    const userInfo = result.response.data.account;
    const { company } = result.response.data;
    const companyId = company ? company.hex_id : null;
    const { data } = result.response;

    if (!company) {
      dispatch(clearCompany());
    }

    dispatch(loginSuccess(userInfo, companyId));
    dispatch(setToken(token));

    return await Promise.resolve(data);
  } catch (error) {
    dispatch(loginError(error));

    return Promise.reject(error);
  }
};

export const loginFromCredentials = (credentials: ICredentials) => async (dispatch: Dispatch) => {
  dispatch(loginStarted());
  try {
    const result = (await services.user.login(credentials)) as any;
    const userInfo = result.response.data.account;
    const resultToken = result.response.data.token;
    const { data } = result.response;

    dispatch(loginSuccess(userInfo, null));
    dispatch(setToken(resultToken));

    return await Promise.resolve(data);
  } catch (error) {
    dispatch(loginError(error));

    return Promise.reject(error);
  }
};

export const recoverPassword = (email: string) => async (dispatch: Dispatch) => {
  dispatch(recoverStarted());
  try {
    const result = (await services.user.recoverPassword(email)) as any;

    dispatch(recoverSuccess());

    return await Promise.resolve(result);
  } catch (error) {
    dispatch(recoverError(error));

    return Promise.reject(error);
  }
};

export const checkRecoverHash = (hash: string) => async (dispatch: Dispatch) => {
  dispatch(recoverStarted());
  try {
    const result = (await services.user.checkRecoverHash(hash)) as any;

    dispatch(recoverSuccess());

    return await Promise.resolve(result);
  } catch (error) {
    dispatch(recoverError(error));

    return Promise.reject(error);
  }
};

export const restorePassword = (password: string, hash: string) => async (dispatch: Dispatch) => {
  dispatch(recoverStarted());
  try {
    const result = (await services.user.restorePassword(
      password,
      hash,
    )) as any;
    const userInfo = result.response.data.account;

    dispatch(recoverSuccess());
    dispatch(loginSuccess(userInfo, null));
    dispatch(setToken(userInfo.token));

    return await Promise.resolve(result.response.data);
  } catch (error) {
    dispatch(recoverError(error));

    return Promise.reject(error);
  }
};
