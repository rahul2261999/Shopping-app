import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isAuthenticated,signOut } from '../../../redux/actions/user'
import Sidebar from '../../../utilities/NavigationBar/Sidebar/Sidebar'
import {FlexContainer,ContentContainer} from './style'
import {Redirect} from 'react-router-dom'
import { getUser } from '../../../utilities/helperFunction'
const DashLayout = props =>{
    const {user} = getUser()
     const dispatch = useDispatch()
     const userSignOut = ()=>{
         dispatch(signOut(user))
     }
     
     useEffect(()=>{
        dispatch(isAuthenticated())
     },[dispatch])

     const redirect = useSelector(state=>state.user.redirect)
     if(!getUser()&&redirect){
         return <Redirect to="/"/>
     }
    return(
        <FlexContainer>
            <Sidebar signOut={userSignOut}/>
            <ContentContainer>{props.children}</ContentContainer>
        </FlexContainer>
    )
}

export default DashLayout