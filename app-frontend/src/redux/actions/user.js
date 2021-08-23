import {
  USER_SIGNIN_INITIATE,
  USER_SIGNIN_SUCCESS,
  USER_SIGNUP_INITIATE,
  USER_SIGNOUT,
  OPEN_AUTH_MODAL,
  CLOSE_AUTH_MODAL,
  AUTHENTICATE_USER_START,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_FAIL,
  USER_SIGNOUT_SUCCESS,
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USER_FAILED,
  AUTHENTICATE_USER_GOOGLE_START,
  AUTHENTICATE_USER_GOOGLE_SUCCESS
} from '../actionTypes';

export const openAuthModal = (data) => ({
  type: OPEN_AUTH_MODAL,
  payload: data
});

export const closeAuthModal = (data) => ({
  type: CLOSE_AUTH_MODAL,
  payload: data
});

export const userSignup = (formData) => ({
  type: USER_SIGNUP_INITIATE,
  payload: formData
});

export const userSignInInitiate = (formData) => ({
  type: USER_SIGNIN_INITIATE,
  payload: formData
});

export const userLoginSucess = (user) => ({
  type: USER_SIGNIN_SUCCESS,
  payload: user
});

export const isAuthenticated = () => ({
  type: AUTHENTICATE_USER_START
});

export const authenticationSuceess = (data) => ({
  type: AUTHENTICATE_USER_SUCCESS,
  payload: data
});
export const authenticationFail = () => ({
  type: AUTHENTICATE_USER_FAIL
});

export const signOut = (user) => ({
  type: USER_SIGNOUT,
  payload: user
});

export const signOutSuccess = (user) => ({
  type: USER_SIGNOUT_SUCCESS,
  payload: user
});

export const getAllUser = (token) => ({
  type: FETCH_USERS,
  payload: token
});

export const getAllUserSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users
});

export const fetchUserFailed = () => ({
  type: FETCH_USER_FAILED
});

export const userGoogleAuthInit = (data) => ({
  type: AUTHENTICATE_USER_GOOGLE_START,
  payload: data
});

export const userGoogleAuthSuccess = (data) => ({
  type: AUTHENTICATE_USER_GOOGLE_SUCCESS,
  payload: data
});
