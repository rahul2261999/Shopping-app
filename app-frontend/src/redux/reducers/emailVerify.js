import {
  EMAIL_VERIFICATION_FAILED,
  EMAIL_VERIFICATION_INIT,
  EMAIL_VERIFICATION_SUCCESS,
  REDIRECT_USER
} from '../actionTypes';

const initialState = {
  loading: false,
  redirect: false,
  error: true
};

const emailVerify = (state = initialState, action) => {
  switch (action.type) {
  case EMAIL_VERIFICATION_INIT: {
    return {
      ...state,
      loading: true
    };
  }
  case EMAIL_VERIFICATION_SUCCESS:
    return {
      ...state,
      error: false,
      loading: false
    };
  case REDIRECT_USER:
    return {
      ...state,
      redirect: true
    };
  case EMAIL_VERIFICATION_FAILED:
    return {
      ...state,
      loading: false
    };

  default:
    return state;
  }
};

export default emailVerify;
