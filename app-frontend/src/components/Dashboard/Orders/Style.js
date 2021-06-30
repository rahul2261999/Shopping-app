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
    overflow:hidden;
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
    &:hover{
    background-color:#2038F2;
    color:#ffffff;
    }
`
export const RowData = styled.span`
    overflow:${props=>props.nooverflow?null:'hidden'};
    white-space:nowrap;
    text-overflow:ellipsis;
    position:${props=>props.position?props.position:"initial"};
`

export const Icon = styled.div`
    cursor:pointer;
`
export const DropContainer = styled.div`
    width: 130px !important;
    color:${props=>props.color?props.color+'!important':null};
    border: 0px !important;
    border-radius: 20px !important;
    display: flex !important;
    justify-content: center;
    align-items: center;
    font-family:mulish,sans-serif !important;
    ${TableRow}:hover &{
        background:inherit !important;
       
    }
`

export const DropIcon = styled.div`
font-size: 10px;
margin-right: 6px;
border-radius: 100%;
box-shadow: 0 0 6px 1px;
color: ${props=>props.color?props.color:'inherti'}
`