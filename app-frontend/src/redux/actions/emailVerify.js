import {
  EMAIL_VERIFICATION_FAILED,
  EMAIL_VERIFICATION_INIT,
  EMAIL_VERIFICATION_SUCCESS,
  REDIRECT_USER
} from '../actionTypes';

export const verifyEmailInit = (token) => ({
  type: EMAIL_VERIFICATION_INIT,
  payload: token
});

export const verifyEmailSuccess = () => ({
  type: EMAIL_VERIFICATION_SUCCESS
});

export const verifyEmailFailed = () => ({
  type: EMAIL_VERIFICATION_FAILED
});

export const redirectUser = () => ({
  type: REDIRECT_USER
});
