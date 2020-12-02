import { IAction } from "./actions";
import { userActionType } from "./types";

export interface IUserState {
  isFetching: boolean;
  authenticated: boolean;
  token: string;
  userInfo: any;
  error: any;
  companyId: string | null;
}

const initState: IUserState = {
  isFetching: false,
  authenticated: false,
  token: "",
  error: null,
  userInfo: null,
  companyId: null,
};

const userReducer = (
  state: IUserState = initState,
  action: IAction
): IUserState => {
  switch (action.type) {
    case userActionType.RECOVER_STARTED:
    case userActionType.SIGNUP_STARTED:
    case userActionType.LOGIN_STARTED:
      return { ...state, authenticated: false, isFetching: true, error: null };
    case userActionType.RECOVER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    case userActionType.RECOVER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case userActionType.LOGOUT_SUCCESS:
      return {
        ...state,
        authenticated: false,
        isFetching: false,
        error: null,
        userInfo: initState.userInfo,
      };
    case userActionType.SIGNUP_SUCCESS:
      return {
        ...state,
        userInfo: action.userInfo,
        authenticated: true,
        isFetching: false,
        error: null,
      };
    case userActionType.LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.userInfo,
        authenticated: true,
        isFetching: false,
        error: null,
        companyId: action.companyId,
      };
    case userActionType.LOGIN_ERROR:
    case userActionType.SIGNUP_ERROR:
      return {
        ...state,
        userInfo: initState.userInfo,
        authenticated: false,
        error: initState.error,
        isFetching: false,
      };
    case userActionType.SET_TOKEN:
      return { ...state, token: action.token };
    case userActionType.CLEAN_TOKEN:
      return { ...state, token: initState.token };
    case userActionType.SET_USER_INFO:
      return { ...state, userInfo: action.userInfo };
    case userActionType.CLEAN_USER_INFO:
      return { ...state, userInfo: initState.userInfo };
    case userActionType.UPDATE_USER_STARTED:
      return { ...state, isFetching: true };
    case userActionType.UPDATE_USER_SUCCESS:
      return { ...state, isFetching: false, userInfo: action.userInfo };
    case userActionType.UPDATE_USER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        authenticated: false,
      };
    default:
      return state;
  }
};

export default userReducer;
