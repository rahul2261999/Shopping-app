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
    USER_SIGNOUT_SUCCESS
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

export const userSignoutInitiate = () =>{
    return {
        type:USER_SIGNOUT
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

export const signOut = ()=>{
    return{
        type:USER_SIGNOUT
    }
}

export const signOutSuccess = ()=>{
    return{
        type:USER_SIGNOUT_SUCCESS
    }
}