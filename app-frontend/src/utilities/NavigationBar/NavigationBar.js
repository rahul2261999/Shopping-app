import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Wrapper from '../../hoc/Wrapper'
import {FaShoppingBag} from'react-icons/fa'
import {
    NavBar,
    NavLogo,
    NavList,
    NavListItem,
    NavListRight,
    ListRightItem
} from './style'
import { isAuthenticated, openAuthModal } from '../../redux/actions/user'
import { memoizedUser } from '../../redux/selector/user'
const NavigationBar  = props =>{
    const {user,token}  =useSelector(memoizedUser)
    const dispatch = useDispatch()
    const openModla = ()=>{
        dispatch(openAuthModal(true))
    }

    useEffect(()=>{
        dispatch(isAuthenticated())
    },[user,token,dispatch])


    return (
        <Wrapper>
            <NavBar>
                <NavLogo>Logo</NavLogo>
                <NavList>
                    <NavListItem activeClassName="navActive" to="/" exact>Home </NavListItem>
                    <NavListItem activeClassName="navActive" to="/tshirt" exact>T-SHIRT </NavListItem>
                    <NavListItem activeClassName="navActive" to="/shoes" exact>SHOES </NavListItem>
                </NavList>

                <NavListRight>
                    {token&&user?
                        <Wrapper>
                            <ListRightItem><FaShoppingBag/></ListRightItem>
                            <ListRightItem>{user.first_name}</ListRightItem>
                        </Wrapper>:
                        <ListRightItem onClick={openModla}>Login</ListRightItem>
                    }
                   
                    {/* progile section todo */}
                </NavListRight>
            </NavBar>
        </Wrapper>
        
    )
}

export default NavigationBar