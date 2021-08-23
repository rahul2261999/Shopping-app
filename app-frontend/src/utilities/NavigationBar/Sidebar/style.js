import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Wrapper = styled.div`
    width:200px;
    height:100vh;
    overflow:auto;
    padding:20px 0;
    background:#2038F2;
    position:fixed;
`;
export const SidebarHeader = styled.div`
    padding:0 20px;
    font-size:1.2rem;
    display:flex;
    flex-direction:column;
    align-items:center;
`;
export const Heading = styled.div`
    display:flex;
    align-items:center;
`;

export const ProfileImg = styled.img`
    width:70px;
    height:70px;
    border-radius:50%;
    margin-bottom:10px;
`;
export const Text = styled.div`
    color:white;
    font-size:1rem;
    font-family:Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
`;
export const SidebarList = styled.div`
    padding: 0;
    margin-top: 60px;
    color:#ffffff;
`;
export const ListItem = styled(NavLink)`
    padding:15px 20px;
    display:flex;
    align-items:center;
    cursor:pointer;
    font-family:mulish,sans-serif;
    font-weight:600;
    position:relative;
    &.active{
        background-color:#ffffff;
        color:#2038F2;
        &:before{
            content: '';
            position: absolute;
            right: 0;
            top: -1px;
            width: 100%;
            border: 0px solid #2038F2;
            border-radius: 0 0 20px 0;
            border-bottom-width: 10px
        }
        &:after{
            content: '';
            position: absolute;
            right: 0;
            bottom: -1px;
            width: 100%;
            border: 0px solid #2038F2;
            border-radius: 0 20px 0 0;
            border-bottom-width: 10px
        }
    };
    &:hover{
        background-color:#384df1;
        color:#ffffff;
    };

    

`;
export const Icon = styled.div`
    padding-right:10px;
    font-size:2rem;
    margin-left:${(props) => (props.marginLeft ? props.marginLeft : '0')};
    color:${(props) => (props.color ? props.color : 'inherit')};
    cursor:pointer;
`;
