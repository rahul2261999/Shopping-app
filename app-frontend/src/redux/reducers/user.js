import {USER_SIGNIN_SUCCESS, OPEN_AUTH_MODAL, CLOSE_AUTH_MODAL, AUTHENTICATE_USER_SUCCESS, AUTHENTICATE_USER_FAIL} from '../actionTypes'

const initialState = {
    openModal:false,
    user:null,
    token:null
}

const authReducer = (state=initialState,action)=>{
    switch(action.type){
        case OPEN_AUTH_MODAL:
            return{
                ...state,
                openModal:action.payload,
            }
        case CLOSE_AUTH_MODAL:
            return{
                ...state,
                openModal:action.payload
            }
        case USER_SIGNIN_SUCCESS:
            return{
                ...state,
                user:action.payload.user,
                token:action.payload.token,
            }
        case AUTHENTICATE_USER_SUCCESS:
            return{
                ...state,
                user:action.payload.user,
                token:action.payload.token,
            }
        case AUTHENTICATE_USER_FAIL:
            return{
                ...initialState
            }
        default:
            return state
    }
}

export default authReducer