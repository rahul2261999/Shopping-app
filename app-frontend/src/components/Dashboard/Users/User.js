import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader  from '../../../utilities/Loader/Loader'
import { getAllUser } from '../../../redux/actions/user'
import { memoizedUser } from '../../../redux/selector/user'
import UserCard from '../../../utilities/Admin/UserCard/UserCard'
import { getUser } from '../../../utilities/helperFunction'

import { FlexContainer } from './style'

const Users = () => {
    const dispatch = useDispatch()
    const { loading, allUsers } = useSelector(memoizedUser)
    const { token } = getUser()

    useEffect(() => {
        dispatch(getAllUser(token))
    }, [dispatch, token])

    const userComp = allUsers.map(item => {
        return <UserCard
            key={item._id}
            Id={item._id}
            username={item.first_name + " " + item.last_name}
            email={item.email}
            isAdmin={item.isAdmin}
            emailVerify={item.isEmailVerified}
            isBlocked={item.restricted} />
    })

    if (loading) {
        return <Loader />
    }

    return (
        <FlexContainer>
            {userComp}
        </FlexContainer>
    )
}

export default Users