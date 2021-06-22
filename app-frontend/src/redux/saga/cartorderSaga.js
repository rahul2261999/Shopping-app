import { put } from '@redux-saga/core/effects'
import { addedToCart, initializeCartSuccess, removeItemFormCartSuccess } from '../actions/cartorder'

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
    yield localStorage.setItem('cart', JSON.stringify(action.payload))
    yield put(addedToCart(action.payload))
}

export function* removeFromCart(action) {
    const oldCart = JSON.parse(localStorage.getItem("cart"))
    const itemExist = oldCart.some(item => item._id === action.payload)
    if (itemExist) {
        const newCart = oldCart.filter(item => item._id !== action.payload)
        yield localStorage.setItem('cart', JSON.stringify(newCart))
        yield put(removeItemFormCartSuccess(newCart))
    }else{
        yield put(removeItemFormCartSuccess(oldCart))
    }
}