import { ADDED_TO_CART, ADD_TO_CART, CREATE_ORDER, CREATE_ORDER_SUCCESS, FETCH_ORDERS, FETCH_ORDERS_SUCCESS, INIT_CART, INIT_CART_SUCCESS, REMOVE_FORM_CART, REMOVE_FORM_CART_SUCCESS } from "../actionTypes"

export const initializeCart = () => {
    return {
        type: INIT_CART
    }
}
export const initializeCartSuccess = data => {
    return {
        type: INIT_CART_SUCCESS,
        payload: data
    }
}

export const addItemToCart = data => {
    return {
        type: ADD_TO_CART,
        payload: data
    }
}

export const addedToCart = data => {
    return {
        type: ADDED_TO_CART,
        payload: data
    }
}

export const removeItemFormCart = id => {
    return {
        type: REMOVE_FORM_CART,
        payload: id
    }
}
export const removeItemFormCartSuccess = data => {
    return {
        type: REMOVE_FORM_CART_SUCCESS,
        payload: data
    }
}

export const initCreateOrder = (orderData,token) => {
    return {
        type: CREATE_ORDER,
        payload:{orderData,token}
    }
}

export const orderCreated = order=>{
    return{
        type:CREATE_ORDER_SUCCESS,
        payload:order,
    }
}

export const initFetchOrder = () =>{
    return{
        type:FETCH_ORDERS,
    }
}

export const fetchOrderSucess = orders =>{
    return{
        type:FETCH_ORDERS_SUCCESS,
        payload:orders
    }
}