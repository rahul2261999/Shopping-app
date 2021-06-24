import { createSelector } from "reselect";

export const memoizedcartorder = createSelector(
    state=>state.cartorder,
    cartData=>{
        const {cartItems,orders,loading} = cartData
        return {
            cartItems,
            orders,
            loading
        }
    }
)