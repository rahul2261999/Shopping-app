import styled from 'styled-components'
import {NavLink} from 'react-router-dom' 

export const Wrapper = styled.div`
    width:300px;
    height:100vh;
    overflow:auto;
    padding:20px 0;
    background:#484848;
`
export const SidebarHeader = styled.div`
    padding:0 20px;
    font-size:1.2rem;
    display:flex;
    flex-direction:column;
    align-items:center;
`

export const ProfileImg = styled.img`
    width:70px;
    height:70px;
    border-radius:50%;
    margin-bottom:10px;
`
export const Text = styled.div`
    color:white;
    font-size:1rem;
    font-family:Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
`
export const SidebarList = styled.div`
    padding: 0;
    margin-top: 60px;
    color:#ffffff;
`
export const ListItem = styled(NavLink)`
    padding:10px 20px;
    display:flex;
    align-items:center;
    cursor:pointer;
    &.active{
        background-color:#5e5e5e;
    };
    &:hover{
        background-color:#5e5e5e;
    };
`
export const Icon = styled.div`
    padding-right:10px;
    font-size:2rem;
`