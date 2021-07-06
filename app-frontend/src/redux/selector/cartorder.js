import { createSelector } from "reselect";

export const memoizedcartorder = createSelector(
    state=>state.cartorder,
    cartData=>{
        const {
            cartItems,
            orders,
            userOrders,
            loading
        } = cartData
        return {
            cartItems,
            orders,
            userOrders,
            loading
        }
    }
)