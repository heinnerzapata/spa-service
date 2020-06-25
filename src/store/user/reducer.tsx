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
  error: {},
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
    case userActionType.LOGIN_STARTED:
      return { ...state, authenticated: false, isFetching: true };
    case userActionType.LOGOUT_SUCCESS:
      return {
        ...state,
        authenticated: false,
        isFetching: false,
        userInfo: initState.userInfo,
      };
    case userActionType.LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.userInfo,
        authenticated: true,
        isFetching: false,
      };
    case userActionType.LOGIN_ERROR:
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
