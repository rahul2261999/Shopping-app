import React from 'react'
import img from '../../../assests/banner/femal.jpg'
import {
    Wrapper,
    SidebarHeader,
    ProfileImg,
    SidebarList,
    ListItem,
    Icon,
    Text
} from './style'
import {BsFillPeopleFill,BsFillTagFill} from 'react-icons/bs'
import {FaArchive,FaTruckLoading,FaAddressCard,FaNotesMedical} from 'react-icons/fa'
const Sidebar = props =>{
    return(
        <Wrapper>
            <SidebarHeader>
                <ProfileImg src={img} alt="profile" />
                <Text>Rahul Saini</Text>
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