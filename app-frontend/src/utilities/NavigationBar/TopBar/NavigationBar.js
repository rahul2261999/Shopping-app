import React from 'react'
import Wrapper from '../../../hoc/Wrapper'
import { FaShoppingBag, FaChevronDown, FaUserAlt, FaPowerOff, FaTruckLoading } from 'react-icons/fa'
import {
    NavBar,
    NavLogo,
    NavList,
    NavListItem,
    NavListRight,
    ListRightItem,
    Icon,
    DropDown,
    DropList,
} from './style'
import { Link } from 'react-router-dom'

const NavigationBar = props => {
    const { user, toggleCart, openModel, userSignout } = props

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
                    {user ?
                        <Wrapper>
                            <ListRightItem onClick={toggleCart} ><FaShoppingBag /></ListRightItem>
                            <ListRightItem >
                                {user.first_name}  <Icon as={FaChevronDown} />
                                <DropDown>
                                    <DropList as={Link} to="/profile" >
                                        <Icon font="13px" marginRight="10" as={FaUserAlt} />Profile
                                    </DropList>
                                    <DropList as={Link} to="/profile" >
                                        <Icon font="13px" marginRight="10" as={FaTruckLoading} />Orders
                                    </DropList>
                                    <DropList borderTop="1px" onClick={userSignout} >
                                        <Icon font="13px" marginRight="10" as={FaPowerOff} />SignOut
                                    </DropList>
                                </DropDown>
                            </ListRightItem>

                        </Wrapper> :
                        <ListRightItem onClick={openModel}>Login</ListRightItem>
                    }

                    {/* progile section todo */}
                </NavListRight>
            </NavBar>
        </Wrapper>

    )
}

export default NavigationBar