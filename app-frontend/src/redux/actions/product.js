import { ADD_NEW_PRODUCT_START, ADD_NEW_PRODUCT_SUCCESS, CLOSE_PRODUCT_MODAL, EDIT_PRODUCT_START, OPEN_PRODUCT_MODAL } from "../actionTypes"

export const openModal = () =>{
    return {
        type:OPEN_PRODUCT_MODAL
    }
}

export const closeModal = () =>{
    return {
        type:CLOSE_PRODUCT_MODAL
    }
}

export const createProduct = productData =>{
    return {
        type:ADD_NEW_PRODUCT_START,
        payload:productData
    }
}

export const createProductSuccess = productData =>{
    return {
        type:ADD_NEW_PRODUCT_SUCCESS,
        payload:productData
    }
}

export const updateProduct = productData =>{
    return {
        type:EDIT_PRODUCT_START,
        payload:productData
    }
}