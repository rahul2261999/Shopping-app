import { put,delay } from '@redux-saga/core/effects'
import axios from '../../axios'
import {
    addedToCart,
    initializeCartSuccess, 
    orderCreated, 
    removeItemFormCartSuccess,
    adminGetAllUserOrderSuccess,
    adminGetAllUserOrderFailed,
    updateOrderStatusSuccess,
    getUserOrderSuccess,
    getUserOrderFailed,
} from '../actions/cartorder'
import { errorToaster, successToaster } from '../actions/toaster'
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

export  function* fetchUserOrders(action){
    const {payload} = action
    try {
        const response = yield axios.get('/allorders',{
            headers:{
                "Authorization":`Bearer ${payload}`
            }
        })
        yield put(getUserOrderSuccess(response.data))
    } catch (error) {
        yield put(getUserOrderFailed())
        if(error.response.data.msg){
            return yield put(errorToaster(error.response.data.msg))
         }
         yield put(errorToaster("Network Problem"))
    }
}


// admin calls

export function* fetchAdminAllOrders(action){
    const {payload} = action
    try {
        const response = yield axios.get('/admin/allorders',{
            headers:{
                "authorization":`Bearer ${payload}`
            }
        })
        yield put(adminGetAllUserOrderSuccess(response.data))
    } catch (error) {
        yield put(adminGetAllUserOrderFailed())
        if(error.response.data.msg){
           return yield put(errorToaster(error.response.data.msg))
        }
        yield put(errorToaster("Network Problem"))
    }
}

export function* updateOrderStatus(action){
    const {payload:{id, status, token}} = action

    try {
        const response = yield axios.put(`/order/status/${id}`,{order_status:status},{
            headers:{
                "authorization":`Bearer ${token}`
            }
        })
        yield put(updateOrderStatusSuccess({id,status}))
        yield put(successToaster(response.data.msg))
    } catch (error) {
        if(error.response.data.msg){
            return yield put(errorToaster(error.response.data.msg))
         }
         yield put(errorToaster("Network Problem"))
    }
}