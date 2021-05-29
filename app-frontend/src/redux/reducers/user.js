import {USER_SIGNUP_SUCCESS,USER_SIGNIN_SUCCESS} from '../actionTypes'

const initialState = {
    isSignUp:false,
    closeModal:false,
    user:null,
    token:null
}

const authReducer = (state=initialState,action)=>{
    switch(action.type){
        case USER_SIGNUP_SUCCESS:
            return {
                ...state,
                isSignUp:false,
            }
        case USER_SIGNIN_SUCCESS:
            return{
                ...state,
                user:action.payload.user,
                token:action.payload.token,
                closeModal:true
            }
        default:
            return state
    }
}

export default authReducer