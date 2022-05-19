import { SEND_FORGET_PASSWORD_EMAIL, SIGNIN_POPUP, UPDATE_AUTH_USER, UPDATE_LOAD_USER } from '../../@jumbo/constants/ActionTypes';

export const setAuthUser = user => {
  return dispatch => {
    dispatch({
      type: UPDATE_AUTH_USER,
      payload: user,
    });
  };
};

export const updateLoadUser = loading => {
  return dispatch => {
    dispatch({
      type: UPDATE_LOAD_USER,
      payload: loading,
    });
  };
};

export const setForgetPassMailSent = status => {
  return dispatch => {
    dispatch({
      type: SEND_FORGET_PASSWORD_EMAIL,
      payload: status,
    });
  };
};

// dragon_5
export const setSigninPopup = status => {
  return dispatch => {
    dispatch({
      type: SIGNIN_POPUP,
      payload: status,
    });
  };
};
