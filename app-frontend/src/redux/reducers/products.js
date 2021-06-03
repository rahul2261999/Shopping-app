import {Product} from '../../assests/raw-data/raw-data'
import { ADD_NEW_PRODUCT_SUCCESS, CLOSE_PRODUCT_MODAL, OPEN_PRODUCT_MODAL } from '../actionTypes'
const initialState = {
    modal: false,
    allProducts: Product,
}

const productReducer = (state=initialState,action)=>{
    switch(action.type){
        case OPEN_PRODUCT_MODAL:
            return {
            ...state,
            modal:true            
        }
        case CLOSE_PRODUCT_MODAL:
            return {
                ...state,
                modal:false
            }
        case ADD_NEW_PRODUCT_SUCCESS:
            const {payload} = action
            return {
                ...state,
                allProducts:[...state.allProducts,payload]
            }
        default:
            return state
    }
}

export default productReducer