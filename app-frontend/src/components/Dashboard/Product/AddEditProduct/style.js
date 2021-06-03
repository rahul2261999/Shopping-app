import styled from "styled-components";
import {Form} from 'semantic-ui-react'

export const FormContainer = styled.div`
    display:flex;
    flex-direction:column;
    padding:15px 20px;
`

export const FormWrapper = styled(Form)`
    width:100%;
`

export const Button = styled.button`
background-color:#000000;
    color:#ffffff;
    width:100%;
    border:0;
    padding:15px 0;
    &:hover{
        background:#000000d1
    }
`