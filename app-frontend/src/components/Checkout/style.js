import styled, { css } from 'styled-components'
import {Form,Input as semanticInput,Select as semanticSelect} from 'semantic-ui-react'

export const CheckoutContainer = styled.div`
    padding: 40px 0;
`
export const Container = styled.div`
max-width: 950px;
background: #f7e6e978;
padding: 30px 60px;
margin:auto;
color:#827c7c;

`
export const MainHeading = styled.div`
font-size: 1.5rem;
letter-spacing: 0.5px;
line-height:2;
`

export const FlexWrapper = styled.div`
    display:flex;
    margin-top:20px;
`

export const FormContainer = styled(Form)`
    width:60%;
    padding-right:20px;

`
export const Sublabel = styled.div`
    display:flex;
    align-items:center;
    background: #ffffff;
    padding: 12px 10px;
    border-radius: 8px;
    color: #827c7c;
    font-size: 18px;
    margin-bottom: 30px;
    font-variant: all-petite-caps;
    letter-spacing: 0.5px;
    &::before {
        content:${props=>props.content?`"${props.content}"`:''};
        display: flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        border-radius: 10px;
        background-color: #000000;
        color: #ffffff;
        margin-right: 1.8rem;
    }
`
export const Label = styled.label`
    color:#464646;
    font-weight:500;
`

export const Input = styled(semanticInput)`
 margin:10px 0 15px 0;
 background:#ffffff;
 padding: 9.5px 14px;
 border-radius:8px;
 ${props=>props.error?css`border:2px solid #f8908d;`:null}
`
export const Select = styled(semanticSelect)`
 margin:10px 0 15px 0;
 background:#ffffff;
 padding: 9.5px 14px;
 border-radius:8px;
`
export const ButtonContainer = styled.div`
    display:flex;
`

export const OrderButton = styled.button`
background:${props=>props.secondary?"none":"#000000"};
padding: 10px 50px;
color:${props=>props.secondary?null:"#ffffff"};
text-align: center;
font-family: 'Lato';
text-transform:uppercase;
cursor:pointer;
margin-right:10px;
border-radius:8px;
border:0;
${props=>props.secondary?css`
    &:hover{
        background:#000000;
        color:#ffffff;
    }
`:null}
`

export const CartDetail = styled.div`
    width:40%;
    background:#ffffff;
`
export const Text = styled.div`
    display:flex;
    justify-content:center;
    margin-top:20px;
    font-size:12px;

`