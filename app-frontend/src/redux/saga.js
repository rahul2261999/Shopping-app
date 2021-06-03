import { all,takeEvery } from 'redux-saga/effects'
import {
    USER_SIGNUP_INITIATE,
    USER_SIGNIN_INITIATE,
    USER_SIGNOUT,
    AUTHENTICATE_USER_START,
    ADD_NEW_PRODUCT_START
} from './actionTypes'

import {
    isAuthenticated,
    signup,
    userSignin,
    userSignout
} from './saga/userSaga'

import {addNewProduct} from './saga/productSaga'

export function* rootWatcher(){
    yield all([
        takeEvery(USER_SIGNUP_INITIATE,signup),
        takeEvery(USER_SIGNIN_INITIATE,userSignin),
        takeEvery(USER_SIGNOUT,userSignout),
        takeEvery(AUTHENTICATE_USER_START,isAuthenticated),
        takeEvery(ADD_NEW_PRODUCT_START,addNewProduct)
    ])
}