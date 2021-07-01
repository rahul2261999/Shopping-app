import { ADDED_TO_CART, CREATE_ORDER, CREATE_ORDER_SUCCESS, FETCH_ALL_USER_ORDER_ERROR, FETCH_ALL_USER_ORDER_INIT, FETCH_ALL_USER_ORDER_SUCCESS, FETCH_ORDERS_SUCCESS, INIT_CART_SUCCESS, REMOVE_FORM_CART_SUCCESS } from "../actionTypes"

const initalState = {
    cartItems:[],
    orders:[],
    loading:false,
}

const CartOrder = (state=initalState,action)=>{
    const {payload} = action
    switch (action.type) {
        case INIT_CART_SUCCESS:
            return{
                ...state,
                cartItems:payload
            }
        case ADDED_TO_CART:
            return{
                ...state,
                cartItems:payload
            } 
        case REMOVE_FORM_CART_SUCCESS:
            return{
                ...state,
                cartItems:payload
            }
        case FETCH_ORDERS_SUCCESS:
            return{
                ...state,
                orders:payload
            }
        case CREATE_ORDER:
            return{
                ...state,
                loading:true
            }
        case CREATE_ORDER_SUCCESS:
            return{
                ...state,
                orders:[...state.orders,payload],
                loading:false
            }
        case FETCH_ALL_USER_ORDER_INIT:
            return{
                ...state,
                loading:true
            }
        case FETCH_ALL_USER_ORDER_SUCCESS:
            return{
                ...state,
                orders:payload,
                loading:false

            }
        case FETCH_ALL_USER_ORDER_ERROR:
            return{
                ...state,
                loading:false
            }
        default:
            return state
    }

}

export default CartOrder