import {
    EMAIL_VERIFICATION_FAILED,
    EMAIL_VERIFICATION_INIT,
    EMAIL_VERIFICATION_SUCCESS,
    REDIRECT_USER
} from "../actionTypes"

export const verifyEmailInit = (token) => {
    return {
        type: EMAIL_VERIFICATION_INIT,
        payload: token
    }
}

export const verifyEmailSuccess = () => {
    return {
        type: EMAIL_VERIFICATION_SUCCESS,
    }
}

export const verifyEmailFailed = () => {
    return {
        type: EMAIL_VERIFICATION_FAILED
    }
}

export const redirectUser = () => {
    return {
        type: REDIRECT_USER
    }
}