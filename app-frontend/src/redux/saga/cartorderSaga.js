import { put,delay } from '@redux-saga/core/effects'
import axios from '../../axios'
import { addedToCart, initializeCartSuccess, orderCreated, removeItemFormCartSuccess } from '../actions/cartorder'
import { successToaster } from '../actions/toaster'
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
    } else {
        yield put(removeItemFormCartSuccess(oldCart))
    }
}

export function* createOrder(action) {
    const { orderData, token } = action.payload
    try {
        const orderRes = yield axios.post('/order/create', orderData, {
            headers: {
                "authorization": `Bearer ${token}`,
                "content-type":"application/json"
            }
        })
        yield delay(4000)
        yield put(orderCreated(orderRes.data))
        yield localStorage.removeItem('cart')
        yield put(successToaster("Order Created"))
    } catch (error) {
       throw error
    }
}