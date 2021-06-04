import {Product} from '../../assests/raw-data/raw-data'
import {lastIndexOf,splice} from 'lodash'
import { 
    ADD_NEW_PRODUCT_SUCCESS,
    CLOSE_PRODUCT_MODAL,
    DELETE_ALL_PRODUCT_SUCCESS,
    DELETE_SINGLE_PRODUCT_SUCCESS,
    EDIT_PRODUCT_SUCCESS,
    FETCH_SINGLE_PRODUCT_SUCCESS,
    OPEN_PRODUCT_MODAL } from '../actionTypes'

const initialState = {
    modal: false,
    allProducts: Product,
}

const productReducer = (state=initialState,action)=>{
    switch(action.type){
        case OPEN_PRODUCT_MODAL:
            return{
                ...state,
                modal:true            
            }
        case CLOSE_PRODUCT_MODAL:
            return {
                ...state,
                modal:false
            }
        case FETCH_SINGLE_PRODUCT_SUCCESS:
            return{
                ...state,
                allProducts:action.payload
            }

        case ADD_NEW_PRODUCT_SUCCESS:
            {
                const {payload} = action
                return {
                    ...state,
                    allProducts:[...state.allProducts,payload]
                }
            }
        case EDIT_PRODUCT_SUCCESS:{
            const products = [...state.allProducts]
            const index = lastIndexOf(products,(o)=>o._id===action.payload._id)
            const updateProductList = splice(products,index,1)
            return {
                ...state,
                allProducts:updateProductList
            }

        }

        case DELETE_SINGLE_PRODUCT_SUCCESS:{
            const newList = state.allProducts.filter(prod=>prod._id!==action.payload_id)
            return{
                ...state,
                allProducts:newList
            }
        }
        
        case DELETE_ALL_PRODUCT_SUCCESS:
                return{
                    ...state,
                    allProducts:[]
                }

        default:
            return state
    }
}

export default productReducer