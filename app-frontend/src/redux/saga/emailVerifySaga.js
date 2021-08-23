import { delay, put } from 'redux-saga/effects';

import axios from '../../axios';
import {
  redirectUser,
  verifyEmailFailed,
  verifyEmailSuccess
} from '../actions/emailVerify';

export function* verifyEmail(action) {
  const { payload } = action;
  try {
    const response = yield axios.get(`user/verify/${payload}`);
    yield put(verifyEmailSuccess());
    if (response.data.token) {
      yield localStorage.setItem('token', response.data.token);
      yield localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    yield delay(5000);
    yield put(redirectUser());
  } catch (error) {
    if (error.response.data.error) {
      yield put(verifyEmailFailed());
    }
  }
}
