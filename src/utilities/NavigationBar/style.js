import { NavLink } from 'react-router-dom'
import styled from 'styled-components'


export const NavBar = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin:0px 20px;
`

export const NavLogo = styled.div`
    font-size:20px;
`

export const NavList = styled.div`
    list-style-type:none;
    display:flex;
`

export const NavListItem = styled(NavLink)`
  padding:20px 30px;
  &.${props=>props.activeClassName}{
    border-bottom:3px solid black
  }
  `

export const NavListRight = styled.div`
  display:flex;
  padding-right:10px;
`

export const ListRightItem = styled.div`
  cursor:pointer
`