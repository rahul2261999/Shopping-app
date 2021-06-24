import { ADDED_TO_CART, CREATE_ORDER, CREATE_ORDER_SUCCESS, FETCH_ORDERS_SUCCESS, INIT_CART_SUCCESS, REMOVE_FORM_CART_SUCCESS } from "../actionTypes"

const initalState = {
    cartItems:[],
    orders:[],
    loading:false
}

const CartOrder = (state=initalState,action)=>{
    switch (action.type) {
        case INIT_CART_SUCCESS:
            return{
                ...state,
                cartItems:action.payload
            }
        case ADDED_TO_CART:
            return{
                ...state,
                cartItems:action.payload
            } 
        case REMOVE_FORM_CART_SUCCESS:
            return{
                ...state,
                cartItems:action.payload
            }
        case FETCH_ORDERS_SUCCESS:
            return{
                ...state,
                orders:action.payload
            }
        case CREATE_ORDER:
            return{
                ...state,
                loading:true
            }
        case CREATE_ORDER_SUCCESS:
            return{
                ...state,
                orders:[...state.orders,action.payload],
                loading:false
            }
        
        default:
            return state
    }

}

export default CartOrder