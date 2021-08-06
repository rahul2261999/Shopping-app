import {
    ADD_NEW_PRODUCT_SUCCESS,
    CLOSE_PRODUCT_MODAL,
    DELETE_ALL_PRODUCT_SUCCESS,
    DELETE_SINGLE_PRODUCT_SUCCESS,
    EDIT_PRODUCT_SUCCESS,
    FETCH_ALLPRODUCT_FAILED,
    FETCH_ALLPRODUCT_START,
    FETCH_ALLPRODUCT_SUCCESS,
    FETCH_SINGLE_PRODUCT_SUCCESS,
    OPEN_PRODUCT_MODAL,
    RESET_PRODUCT
} from '../actionTypes'

const initialState = {
    modal: false,
    allProducts: [],
    updateProduct: [],
    productLoader: false
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_PRODUCT_MODAL:
            return {
                ...state,
                modal: true
            }
        case CLOSE_PRODUCT_MODAL:
            return {
                ...state,
                modal: false
            }
        case FETCH_ALLPRODUCT_START:
            return {
                ...state,
                productLoader: true
            }
        case FETCH_ALLPRODUCT_SUCCESS:
            return {
                ...state,
                allProducts: action.payload,
                productLoader: false
            }
        case FETCH_ALLPRODUCT_FAILED:
            return {
                ...state,
                productLoader: false
            }
        case FETCH_SINGLE_PRODUCT_SUCCESS:
            return {
                ...state,
                allProducts: action.payload
            }

        case ADD_NEW_PRODUCT_SUCCESS:
            {
                const { payload } = action
                return {
                    ...state,
                    allProducts: [...state.allProducts, payload]
                }
            }
        case EDIT_PRODUCT_SUCCESS: {
            // const products = [...state.allProducts]
            // const index = lastIndexOf(products,(o)=>o._id===action.payload._id)
            // const updateProductList = splice(products,index,1)
            const filteredList = state.allProducts.filter(item => item._id !== action.payload._id)
            return {
                ...state,
                allProducts: [...filteredList, action.payload]
            }

        }

        case DELETE_SINGLE_PRODUCT_SUCCESS: {
            const newList = state.allProducts.filter(prod => prod._id !== action.payload)
            return {
                ...state,
                allProducts: newList
            }
        }

        case DELETE_ALL_PRODUCT_SUCCESS:
            return {
                ...state,
                allProducts: []
            }
        case RESET_PRODUCT: {
            return {
                ...initialState
            }
        }

        default:
            return state
    }
}

export default productReducer