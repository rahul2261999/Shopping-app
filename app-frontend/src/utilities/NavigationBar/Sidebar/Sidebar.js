import React from 'react'
import img from '../../../assests/banner/femal.jpg'
import {
    Wrapper,
    SidebarHeader,
    Heading,
    ProfileImg,
    SidebarList,
    ListItem,
    Icon,
    Text
} from './style'
import {BsFillPeopleFill,BsFillTagFill} from 'react-icons/bs'
import {FaArchive,FaTruckLoading,FaAddressCard,FaSignOutAlt} from 'react-icons/fa'
const Sidebar = props =>{
    return(
        <Wrapper>
            <SidebarHeader>
                <ProfileImg src={img} alt="profile" />
                <Heading>
                <Text>Rahul Saini </Text>
                <Icon marginLeft="10px" color="white" as={FaSignOutAlt} onClick={props.signOut} />
                </Heading>
            </SidebarHeader>
            <SidebarList>
                <ListItem to="/dashboard/profile" ><Icon as={FaAddressCard}/> Profile</ListItem>
                <ListItem to="/dashboard" exact><Icon as={FaArchive}/>Product</ListItem>
                <ListItem to="/dashboard/addcategory"><Icon as={BsFillTagFill} /> Add Category</ListItem>
                <ListItem to="/dashboard/allusers"><Icon as={BsFillPeopleFill} /> All Users</ListItem>
                <ListItem to="/dashboard/orders"><Icon as={FaTruckLoading} /> Orders </ListItem>
            </SidebarList>
        </Wrapper>
    )
}

export default Sidebar