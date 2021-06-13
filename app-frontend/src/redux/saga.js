import { all,take,takeEvery } from 'redux-saga/effects'
import {
    USER_SIGNUP_INITIATE,
    USER_SIGNIN_INITIATE,
    USER_SIGNOUT,
    AUTHENTICATE_USER_START,
    ADD_NEW_PRODUCT_START,
    EDIT_PRODUCT_START,
    FETCH_ALLPRODUCT_START,
    DELETE_SINGLE_PRODUCT_START
} from './actionTypes'

import {
    isAuthenticated,
    signup,
    userSignin,
    userSignout
} from './saga/userSaga'

import {addNewProduct, deleteProduct, getAllProduct, updateProduct} from './saga/productSaga'

export function* rootWatcher(){
    yield all([
        takeEvery(USER_SIGNUP_INITIATE,signup),
        takeEvery(USER_SIGNIN_INITIATE,userSignin),
        takeEvery(USER_SIGNOUT,userSignout),
        takeEvery(AUTHENTICATE_USER_START,isAuthenticated),
        takeEvery(ADD_NEW_PRODUCT_START,addNewProduct),
        takeEvery(EDIT_PRODUCT_START,updateProduct),
        takeEvery(FETCH_ALLPRODUCT_START,getAllProduct),
        takeEvery(DELETE_SINGLE_PRODUCT_START,deleteProduct),
        takeEvery(USER_SIGNOUT,userSignout)
    ])
}