import { SET_TOKEN, CLEAN_TOKEN , SET_USER_INFO, CLEAN_USER_INFO } from '../types/user.types';

export const setToken = (token) => {
  return dispatch => {
    dispatch({
       type: SET_TOKEN,
       payload: {
        token
       }
    })
  }
}

export const cleanToken = () => {
  return dispatch => {
    dispatch({
       type: CLEAN_TOKEN,
       payload: null
    })
  }
}

export const setUserInfo = (userInfo) => {
  return dispatch => {
    dispatch({
       type: SET_USER_INFO,
       payload: {
        userInfo
       }
    })
  }
}

export const cleanUserInfo = () => {
  return dispatch => {
    dispatch({
       type: CLEAN_USER_INFO,
       payload: null
    })
  }
}