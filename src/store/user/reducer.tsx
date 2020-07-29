import { userActionType } from "./types";
import { IAction } from "./actions";

export interface IUserState {
  isFetching: boolean;
  authenticated: boolean;
  token: string;
  userInfo: any;
  error: any;
}

const initState: IUserState = {
  isFetching: false,
  authenticated: false,
  token: "",
  error: null,
  userInfo: {
    hexId: "",
    email: "",
    displayname: "",
    avatar: "",
    firstName: "",
    phoneContact: "",
    lastName: "",
    company: "",
  },
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
    case userActionType.LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.userInfo,
        authenticated: true,
        isFetching: false,
        error: null,
      };
    case userActionType.LOGIN_ERROR:
    case userActionType.SIGNUP_ERROR:
      debugger;
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
    default:
      return state;
  }
};

export default userReducer;
