import { createSelector } from "reselect";

export const memoisedEmailVerification = createSelector(
    state => state.emailVerify,
    emailVerify => {
        const { loading, redirect, error } = emailVerify
        return {
            loading,
            redirect,
            error
        }
    }
)