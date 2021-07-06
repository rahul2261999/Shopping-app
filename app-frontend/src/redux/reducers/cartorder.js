import _ from 'lodash'
import {
    ADDED_TO_CART,
    CREATE_ORDER,
    CREATE_ORDER_SUCCESS,
    FETCH_ALL_USER_ORDER_ERROR,
    FETCH_ALL_USER_ORDER_INIT,
    FETCH_ALL_USER_ORDER_SUCCESS,
    FETCH_ORDERS_SUCCESS,
    INIT_CART_SUCCESS,
    REMOVE_FORM_CART_SUCCESS,
    UPDATE_ORDER_STATUS_SUCCESS,
    USER_ORDER_REQUEST_FAILED,
    USER_ORDER_REQUEST_INIT,
    USER_ORDER_REQUEST_SUCCESS
} from "../actionTypes"

const initalState = {
    cartItems: [],
    orders: [],
    userOrders:[],
    loading: false,
}

const CartOrder = (state = initalState, action) => {
    const { payload } = action
    switch (action.type) {
        case INIT_CART_SUCCESS:
            return {
                ...state,
                cartItems: payload
            }
        case ADDED_TO_CART:
            return {
                ...state,
                cartItems: payload
            }
        case REMOVE_FORM_CART_SUCCESS:
            return {
                ...state,
                cartItems: payload
            }
        case FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: payload
            }
        case CREATE_ORDER:
            return {
                ...state,
                loading: true
            }
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                orders: [...state.orders, payload],
                loading: false
            }
        case USER_ORDER_REQUEST_INIT:
            return {
                ...state,
                loading:true
            }
        case USER_ORDER_REQUEST_SUCCESS:
            return{
                ...state,
                userOrders:payload,
                loading:false
            }
        case USER_ORDER_REQUEST_FAILED:
            return{
                ...state,
                loading:false
            }
            // admin
        case FETCH_ALL_USER_ORDER_INIT:
            return {
                ...state,
                loading: true
            }
        case FETCH_ALL_USER_ORDER_SUCCESS:
            return {
                ...state,
                orders: payload,
                loading: false

            }
        case FETCH_ALL_USER_ORDER_ERROR:
            return {
                ...state,
                loading: false
            }
        case UPDATE_ORDER_STATUS_SUCCESS:
            const { id, status } = payload
            console.log(payload);
            const newOrderArray = state.orders.map(item => {
                if (item._id === id) {
                    item.order_status = status
                }
                return item
            })
            return {
                ...state,
                orders: newOrderArray
            }

        default:
            return state
    }

}

export default CartOrder