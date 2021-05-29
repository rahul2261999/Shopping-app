import { all,takeEvery } from 'redux-saga/effects'
import {USER_SIGNIN_INITIATE} from './actionTypes'
import {signup} from './saga/userSaga'
export function* rootWatcher(){
    yield all([
        takeEvery(USER_SIGNIN_INITIATE,signup)
    ])
}