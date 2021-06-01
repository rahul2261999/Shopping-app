import React,{useEffect, useState} from 'react'
import Wrapper from '../../hoc/Wrapper'
import NavigationBar from '../../utilities/NavigationBar/NavigationBar'
import AuthModal from '../Auth/Auth'
import Cart from '../Cart/Cart'
import {Product} from '../../assests/raw-data/raw-data'

import {ContentContainer} from './styled'

const Layout = props =>{
    

    return(
        <Wrapper>
            <NavigationBar  />
            <AuthModal />
            <ContentContainer>{props.children}</ContentContainer>
            {/* <Cart addedProduct={Product}/> */}
        </Wrapper>
    )
}

export default Layout