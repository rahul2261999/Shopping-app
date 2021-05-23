import React from 'react'
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
const NavigationBar  = props =>{
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
                    <ListRightItem><FaShoppingBag/></ListRightItem>
                    <ListRightItem onClick={()=>props.toggleModal(true)}>Login</ListRightItem>
                    {/* progile section todo */}
                </NavListRight>
            </NavBar>
        </Wrapper>
        
    )
}

export default NavigationBar