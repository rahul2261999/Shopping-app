import { USER_SIGNIN_SUCCESS, OPEN_AUTH_MODAL, CLOSE_AUTH_MODAL, AUTHENTICATE_USER_SUCCESS, AUTHENTICATE_USER_FAIL, USER_SIGNOUT_SUCCESS, USER_SIGNOUT } from '../actionTypes'

const initialState = {
    openModal: false,
    user: null,
    token: null,
    redirect: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_AUTH_MODAL:
            return {
                ...state,
                openModal: action.payload,
            }
        case CLOSE_AUTH_MODAL:
            return {
                ...state,
                openModal: action.payload
            }
        case USER_SIGNIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                redirect: true,
            }
        case AUTHENTICATE_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
            }
        case AUTHENTICATE_USER_FAIL:
            return {
                ...initialState
            }
        case USER_SIGNOUT:
            return {
                ...state,
                redirect: false
            }
        case USER_SIGNOUT_SUCCESS:
            return {
                ...initialState,
                redirect: action.payload.isAdmin === 1 ? true : false,
            }
        default:
            return state
    }
}

export default authReducer