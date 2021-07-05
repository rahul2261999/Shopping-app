import styled from "styled-components";

export const OrderContainer = styled.div`
    padding:50px 20px;
`
export const Header = styled.div`
    display:block;
    font-size: 2rem;
    font-weight: 700;
    line-height:1;
`
export const SubHeader = styled.div`
    font-size: 13px;
    font-weight: 600;
    padding: 10px 0;
    color: #392C2C;
`

export const TableHead = styled.div`
    display:flex;
    align-items:center;
    padding:10px 15px;
    background-color:#fadadd;
    border-radius:5px;
    padding-right:10px;
    max-width:${props=>props.maxWidth?props.maxWidth:null};
    font-family: 'Montserrat', sans-serif;
`

export const HeadValue = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:center;
    font-family:inherit;
    font-weight:600;
    max-width:${props=>props.maxWidth?props.maxWidth:null};
    padding-right:10px;
    overflow:${props=>props.noOverflow?'unset':'hidden'};
    position:relative;
`

export const TableRow = styled.div`
    display:flex;
    align-items:center;
    padding:15px;
    border:1px solid #ccc;
    border-radius:5px;
    background-color:#ffffff;
    color:black;
    margin:25px 0;
    transition: all 0.3s ease-in-out;
    &:hover{
    background-color: #2038F2;
    color: #ffffff;
    box-shadow: 5px 5px 5px 0px #a9a9a9d6;
    border-color: #2038f2;
    }
`
export const RowData = styled.span`
    white-space:nowrap;
    text-overflow:ellipsis;
    position:${props=>props.position?props.position:"initial"};
`

export const Icon = styled.div`
    cursor:pointer;
    margin-right:${props=>props.marginRight?props.marginRight:null};
    margin-left:4px;
    font-size:${props=>props.font?props.font+'px':null}

`
export const DropIcon = styled.div`
font-size: 10px;
margin-right: 6px;
border-radius: 100%;
box-shadow: 0 0 6px 1px;
color: ${props=>props.color?props.color:'inherti'}
`
export const DropValue = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-around;
    padding:4px 8px;
    border:1px solid #000000;
    border-radius:10px

`

export const DropDown = styled.div`
  	  display:none;
      width: 138px;
      position: absolute;
      top: 0;
      transform: translate3d(8px,28px,0px);
      background: #ffffff;
      box-shadow: 0 0px 1px 0px #e1e1e1;
      border-radius: 6px;
      border: 1px double #c7c3c3;
      z-index: 500;
      flex-direction: column;
      padding: 10px 5px;
    ${DropValue}:hover &{
        display:block;
    }
	
`
export const DropList = styled.div`
	display:flex;
	align-items:center;
	padding:5px 10px;
    color:${props=>props.color};
	&:hover{
		border-radius:5px;
        cursor:pointer;
        background:#f3f4f8;
	}
	border-top:${props=>props.borderTop?props.borderTop+" solid #ccc":null}
`

