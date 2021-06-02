import React from 'react'
import Sidebar from '../../../utilities/NavigationBar/Sidebar/Sidebar'
import {FlexContainer,ContentContainer} from './style'

const DashLayout = props =>{
    return(
        <FlexContainer>
            <Sidebar/>
            <ContentContainer>{props.children}</ContentContainer>
        </FlexContainer>
    )
}

export default DashLayout