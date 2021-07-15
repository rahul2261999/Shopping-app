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
    REMOVE_CATEGORY,
    ADD_TO_CART,
    INIT_CART,
    REMOVE_FORM_CART,
    CREATE_ORDER,
    FETCH_USERS,
    FETCH_ALL_USER_ORDER_INIT,
    UPDATE_ORDER_STATUS_INIT,
    USER_ORDER_REQUEST_INIT,
    EMAIL_VERIFICATION_INIT,
    AUTHENTICATE_USER_GOOGLE_START
} from './actionTypes'

import {
    fetchUsers,
    googleAuth,
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

import { initCart, addCart, removeFromCart, createOrder, fetchAdminAllOrders, updateOrderStatus, fetchUserOrders } from './saga/cartorderSaga'
import { verifyEmail } from './saga/emailVerifySaga'

export function* rootWatcher() {
    yield all([
        // -------------USER AUTH------------------
        takeEvery(USER_SIGNUP_INITIATE, signup),
        takeEvery(USER_SIGNIN_INITIATE, userSignin),
        takeEvery(USER_SIGNOUT, userSignout),
        takeEvery(AUTHENTICATE_USER_START, isAuthenticated),
        takeEvery(ADD_NEW_PRODUCT_START, addNewProduct),
        takeEvery(EDIT_PRODUCT_START, updateProduct),
        takeEvery(FETCH_ALLPRODUCT_START, getAllProduct),
        takeEvery(DELETE_SINGLE_PRODUCT_START, deleteProduct),
        takeEvery(USER_SIGNOUT, userSignout),
        // -------------GOOGLE AUTH------------------
        takeEvery(AUTHENTICATE_USER_GOOGLE_START,googleAuth),
        // -------------USER VERFIACTION------------------
        takeEvery(EMAIL_VERIFICATION_INIT,verifyEmail),
        // -------------CATEGORY------------------
        takeEvery(FETCH_ALL_CATEGORY, fetchCategory),
        takeEvery(ADD_CATEGORY, addCategory),
        takeEvery(EDIT_CATEGORY, editCategory),
        takeEvery(REMOVE_CATEGORY, removeCategory),
        // -------------Cart------------------
        takeEvery(ADD_TO_CART, addCart),
        takeEvery(INIT_CART, initCart),
        takeEvery(REMOVE_FORM_CART, removeFromCart),
        // -------------Order------------------
        takeEvery(CREATE_ORDER, createOrder),
        takeEvery(USER_ORDER_REQUEST_INIT,fetchUserOrders),
        // -------------Admin Order------------------
        takeEvery(FETCH_ALL_USER_ORDER_INIT, fetchAdminAllOrders),
        takeEvery(UPDATE_ORDER_STATUS_INIT, updateOrderStatus),
        // -------------USERS------------------
        takeEvery(FETCH_USERS, fetchUsers)


    ])
}