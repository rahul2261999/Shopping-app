import {
    USER_SIGNIN_INITIATE,
    USER_SIGNIN_SUCCESS,
    USER_SIGNUP_INITIATE,
    USER_SIGNOUT,
    OPEN_AUTH_MODAL,
    CLOSE_AUTH_MODAL,
    AUTHENTICATE_USER_START,
    AUTHENTICATE_USER_SUCCESS,
    AUTHENTICATE_USER_FAIL,
    USER_SIGNOUT_SUCCESS,
    FETCH_USERS,
    FETCH_USERS_SUCCESS,
    FETCH_USER_FAILED,
    AUTHENTICATE_USER_GOOGLE_START,
    AUTHENTICATE_USER_GOOGLE_SUCCESS,
} from '../actionTypes'

export const openAuthModal = data =>{
    return {
        type:OPEN_AUTH_MODAL,
        payload:data,
    }
}

export const closeAuthModal = data =>{
    return {
        type:CLOSE_AUTH_MODAL,
        payload:data,
    }
}

export const userSignup = formData => {
    return{
        type:USER_SIGNUP_INITIATE,
        payload:formData
    }
}

export const userSignInInitiate = formData =>{
    return {
        type:USER_SIGNIN_INITIATE,
        payload:formData
    }
}

export const userLoginSucess = user =>{
    return{
        type:USER_SIGNIN_SUCCESS,
        payload:user
    }
}

export const isAuthenticated = () =>{
    return {
        type:AUTHENTICATE_USER_START
    }
}

export const authenticationSuceess = data =>{
    return {
        type:AUTHENTICATE_USER_SUCCESS,
        payload:data
    }
}
export const authenticationFail = () =>{
    return {
        type:AUTHENTICATE_USER_FAIL,
    }
}

export const signOut = user =>{
    return{
        type:USER_SIGNOUT,
        payload:user
    }
}

export const signOutSuccess = user=>{
    return{
        type:USER_SIGNOUT_SUCCESS,
        payload:user
    }
}

export const getAllUser = token =>{
    return{
        type:FETCH_USERS,
        payload:token
    }
}

export const getAllUserSuccess = users =>{
    return{
        type:FETCH_USERS_SUCCESS,
        payload:users
    }
}

export const fetchUserFailed = () =>{
    return{
        type:FETCH_USER_FAILED
    }
}


export const userGoogleAuthInit = (data) => {
    return {
        type:AUTHENTICATE_USER_GOOGLE_START,
        payload:data
    }
}

export const userGoogleAuthSuccess = (data) =>{
    return {
        type:AUTHENTICATE_USER_GOOGLE_SUCCESS,
        payload:data
    }
}