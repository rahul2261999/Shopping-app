import { ADDED_TO_CART, INIT_CART_SUCCESS } from "../actionTypes"

const initalState = {
    cartItems:[]
}

const CartOrder = (state=initalState,action)=>{
    switch (action.type) {
        case INIT_CART_SUCCESS:
            return{
                cartItems:action.payload
            }
        case ADDED_TO_CART:
            return{
                cartItems:action.payload
            }  
        default:
            return state
    }

}

export default CartOrder