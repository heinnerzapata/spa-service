import {
  SET_TOKEN,
  SET_USER_INFO,
  CLEAN_TOKEN,
  CLEAN_USER_INFO,
} from "./types";

const initState = {
  token: "",
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
const userReducer = (state = initState, action: any) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload.token };
    case CLEAN_TOKEN:
      return { ...state, token: initState.token };
    case SET_USER_INFO:
      return { ...state, userInfo: action.payload.userInfo };
    case CLEAN_USER_INFO:
      return { ...state, userInfo: initState.userInfo };
    default:
      return state;
  }
};

export default userReducer;
