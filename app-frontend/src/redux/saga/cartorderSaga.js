import { put } from '@redux-saga/core/effects'
import { addedToCart, initializeCartSuccess } from '../actions/cartorder'
import _ from 'lodash'

export function* initCart() {
    let cart = []
    if (localStorage.getItem("cart")) {
        cart = yield JSON.parse(localStorage.getItem("cart"))
    } else {
        yield localStorage.setItem('cart', "[]")
    }
    yield put(initializeCartSuccess(cart))
}

export function* addCart(action) {
    yield localStorage.setItem('cart',JSON.stringify(action.payload))
    yield put(addedToCart(action.payload))
}