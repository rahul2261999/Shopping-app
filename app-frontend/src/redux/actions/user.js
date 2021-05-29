import {
    USER_SIGNIN_INITIATE,
    USER_SIGNIN_SUCCESS,
    USER_SIGNUP_INITIATE,
    USER_SIGNUP_SUCCESS,
    USER_SIGNOUT
} from '../actionTypes'

export const userSignup = formData => {
    return{
        type:USER_SIGNUP_INITIATE,
        payload:formData
    }
}

export const userSignupSuccess = user =>{
   return{
    type:USER_SIGNUP_SUCCESS,
    payload:user
   }
}

// export const userSignupFailure = error =>{
//     return {
//         type:USER_SIGNUP_FAIL,    
//     }
// }
export const userLoginInitiate = formData =>{
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