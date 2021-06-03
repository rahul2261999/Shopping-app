import { CLOSE_PRODUCT_MODAL, OPEN_PRODUCT_MODAL } from "../actionTypes"

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