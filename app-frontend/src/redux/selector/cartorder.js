import { createSelector } from "reselect";

export const memoizedcartorder = createSelector(
    state=>state.cartorder,
    cartData=>{
        const {cartItems} = cartData
        return {
            cartItems
        }
    }
)