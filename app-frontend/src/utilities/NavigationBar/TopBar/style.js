import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'


export const NavBar = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding: 0px 20px;

	@media screen and (max-width: 600px){
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background-color: #ffffff;
		z-index: 1000;
	}
`

export const NavLogo = styled.div`
    font-size:20px;
	font-family:'Monestrate', sans-serif;
	font-variant:small-caps;
`

export const NavList = styled.div`
    list-style-type:none;
    display:flex;

	@media screen and (max-width: 600px){
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5px 5px 0 0;
		background-color: #000000;
		color: #ffffff;
		z-index: 1000;
	}

`

export const NavListItem = styled(NavLink)`
  padding:20px 30px;
  &.${props=>props.activeClassName}{
    border-bottom:3px solid black
  }
  `
export const NavListRight = styled.div`
  display:flex;
  align-items:center;
  position:relative;
`

export const ListRightItem = styled.div`
  display:flex;
  align-items:center;
  cursor:pointer;
  padding:20px 10px 20px 0;
`

export const Icon = styled.div`
	margin-left:6px;
	font-size:${props=>props.font?props.font:'10px'};
	${props=>props.marginRight?css`
	margin-right:${props.marginRight}px;
	`:null}
`

export const DropDown = styled.div`
  	display:none;
	width: 150px;
	position: absolute;
	top:0;
	right:0;
	transform:translate3d(0px,42px,0px);
	background: #ffffff;
	box-shadow: 0 0px 1px 0px #e1e1e1;
	border-radius: 6px;
	border: 1px double #c7c3c3;
	z-index: 500;
	flex-direction:column;
	padding:10px 5px;
	${ListRightItem}:hover &{
		display:flex;
	}
	
`
export const DropList = styled.div`
	display:flex;
	align-items:center;
	padding:5px 10px;
	&:hover{
		background-color:black;
		border-radius:5px;
		color:white;
	}
	border-top:${props=>props.borderTop?props.borderTop+" solid #ccc":null}
`