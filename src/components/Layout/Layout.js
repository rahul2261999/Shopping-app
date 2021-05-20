import React,{useState} from 'react'
import Wrapper from '../../hoc/Wrapper'
import NavigationBar from '../../utilities/NavigationBar/NavigationBar'
import AuthModal from '../Auth/Auth'

import {ContentContainer} from './styled'

const Layout = props =>{
    const [isModalOpen,setModalOpen] = useState(false)
    return(
        <Wrapper>
            <NavigationBar toggleModal={setModalOpen} />
            <AuthModal isMount={isModalOpen} isModal={setModalOpen} />
            <ContentContainer>{props.children}</ContentContainer>
        </Wrapper>
    )
}

export default Layout