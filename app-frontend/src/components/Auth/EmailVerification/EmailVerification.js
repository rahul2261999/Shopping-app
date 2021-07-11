import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    Wrapper,
    Message,
    Icon
} from './styled'

import Tick from '../../../assests/icons/tick.png'
import Warning from '../../../assests/icons/warning.png'
import { memoisedEmailVerification } from '../../../redux/selector/emailVerify'
import { Redirect, withRouter } from 'react-router-dom'
import { verifyEmailInit } from '../../../redux/actions/emailVerify'
import Loader from '../../../utilities/Loader/Loader'

const EmailVerification = ({ match }) => {
    const { loading, error, redirect } = useSelector(memoisedEmailVerification)
    const dispatch = useDispatch()
    const token = match.params['token']

    useEffect(() => {
        dispatch(verifyEmailInit(token))
    }, [dispatch, token])

    if (loading) {
        return <Loader />
    }

    return (
        <Wrapper>
            <Message>
                <Icon src={error ? Warning : Tick} alt={error ? "warning icon" : "verify icon"} />
                {!error ? "Email Verified Successfully" : "Verification Link is expired"}
            </Message>
            {redirect?<Redirect to="/" />:null}
        </Wrapper>
    )
}

export default withRouter(EmailVerification)