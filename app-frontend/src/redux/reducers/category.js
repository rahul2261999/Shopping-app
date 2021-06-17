import { CLOSE_CATEGORY_MODAL, FETCH_ALL_CATEGORY_SUCESS, OPEN_CATEGORY_MODAL, REMOVE_CATEGORY_SUCCESS } from "../actionTypes";

const initalState = {
    loading: false,
    modal: false,
    allCategories: []
}

const categoryReducer = (state = initalState, action) => {

    switch (action.type) {

        case OPEN_CATEGORY_MODAL:
            return {
                ...state,
                modal: true
            }

        case CLOSE_CATEGORY_MODAL:
            return {
                ...state,
                modal: false
            }

        case FETCH_ALL_CATEGORY_SUCESS:
            return {
                ...state,
                allCategories: action.payload
            }

        case REMOVE_CATEGORY_SUCCESS: {
            const removeCategory = state.allCategories.filter(item => item._id !== action.payload)
            return {
                allCategories: removeCategory
            }
        }

        default:
            return state
    }
}

export default categoryReducer