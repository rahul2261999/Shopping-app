import { all, takeEvery } from 'redux-saga/effects'
import {
    USER_SIGNUP_INITIATE,
    USER_SIGNIN_INITIATE,
    USER_SIGNOUT,
    AUTHENTICATE_USER_START,
    ADD_NEW_PRODUCT_START,
    EDIT_PRODUCT_START,
    FETCH_ALLPRODUCT_START,
    DELETE_SINGLE_PRODUCT_START,
    FETCH_ALL_CATEGORY,
    ADD_CATEGORY,
    EDIT_CATEGORY,
    REMOVE_CATEGORY
} from './actionTypes'

import {
    isAuthenticated,
    signup,
    userSignin,
    userSignout,
} from './saga/userSaga'

import {
    fetchCategory,
    addCategory,
    editCategory,
    removeCategory
} from './saga/categorySaga'

import {
    addNewProduct,
    deleteProduct,
    getAllProduct,
    updateProduct
} from './saga/productSaga'

export function* rootWatcher() {
    yield all([
        takeEvery(USER_SIGNUP_INITIATE, signup),
        takeEvery(USER_SIGNIN_INITIATE, userSignin),
        takeEvery(USER_SIGNOUT, userSignout),
        takeEvery(AUTHENTICATE_USER_START, isAuthenticated),
        takeEvery(ADD_NEW_PRODUCT_START, addNewProduct),
        takeEvery(EDIT_PRODUCT_START, updateProduct),
        takeEvery(FETCH_ALLPRODUCT_START, getAllProduct),
        takeEvery(DELETE_SINGLE_PRODUCT_START, deleteProduct),
        takeEvery(USER_SIGNOUT, userSignout),
        // -------------CATEGORY------------------
        takeEvery(FETCH_ALL_CATEGORY,fetchCategory),
        takeEvery(ADD_CATEGORY,addCategory),
        takeEvery(EDIT_CATEGORY,editCategory),
        takeEvery(REMOVE_CATEGORY,removeCategory)
    ])
}