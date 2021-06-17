import {
    ADD_NEW_PRODUCT_START,
    ADD_NEW_PRODUCT_SUCCESS,
    CLOSE_PRODUCT_MODAL,
    DELETE_ALL_PRODUCT_START,
    DELETE_ALL_PRODUCT_SUCCESS,
    DELETE_SINGLE_PRODUCT_START,
    DELETE_SINGLE_PRODUCT_SUCCESS,
    EDIT_PRODUCT_START,
    EDIT_PRODUCT_SUCCESS,
    FETCH_ALLPRODUCT_START,
    FETCH_ALLPRODUCT_SUCCESS,
    FETCH_SINGLE_PRODUCT_START,
    FETCH_SINGLE_PRODUCT_SUCCESS,
    OPEN_PRODUCT_MODAL, 
    RESET_PRODUCT} from "../actionTypes"

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

export const fetchAllProduct = () =>{
    return {
        type:FETCH_ALLPRODUCT_START,
    }
}

export const fetchAllProductSuccess = prods =>{
    return {
        type:FETCH_ALLPRODUCT_SUCCESS,
        payload:prods
    }
}

export const fetchSingleProduct = params =>{
    return {
        type:FETCH_SINGLE_PRODUCT_START,
        payload:params
    }
}

export const fetchSingleProductSuccess = prod =>{
    return {
        type:FETCH_SINGLE_PRODUCT_SUCCESS,
        payload:prod
    }
}

export const createProduct = (token,userId,productData) =>{
    return {
        type:ADD_NEW_PRODUCT_START,
        payload:{token,userId,productData}
    }
}

export const createProductSuccess = productData =>{
    return {
        type:ADD_NEW_PRODUCT_SUCCESS,
        payload:productData
    }
}

export const updateProduct = (token,userId,productId,productData) =>{
    return {
        type:EDIT_PRODUCT_START,
        payload:{token,userId,productId,productData}
    }
}

export const updateProductSuccess = productData =>{
    return {
        type:EDIT_PRODUCT_SUCCESS,
        payload:productData
    }
}



export const deleteProduct = params =>{
    return {
        type:DELETE_SINGLE_PRODUCT_START,
        payload:params
    }
}

export const deleteProductSuccess = data =>{
    return {
        type:DELETE_SINGLE_PRODUCT_SUCCESS,
        payload:data
    }
}

export const deleteAllProduct = () =>{
    return {
        type:DELETE_ALL_PRODUCT_START,
    }
}

export const deleteAllProductSuccess = () =>{
    return {
        type:DELETE_ALL_PRODUCT_SUCCESS,
    }
}

export const resetProduct = () =>{
    return{
        type:RESET_PRODUCT
    }
}