import styled from 'styled-components'
import {Form} from 'semantic-ui-react'

export const ModalMainContent = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:20px 0
`

export const FormWrapper = styled(Form)`
    width:100%;
`

export const Row = styled.div`
    width:80%
`
export const AuthBUtton = styled.button`
    background-color:#000000;
    color:#ffffff;
    width:100%;
    border:0;
    padding:15px 0;
    &:hover{
        background:#000000d1
    }
`
export const ModalFooter = styled.div`
    display:flex;
    justify-content:space-between;
    padding:30px 0 0;
    align-item:center;
`

export const Icon = styled.div`
    padding: 0 10px 0 0;
    font-size:2.8rem;
    cursor:pointer;
`

export const FooterRight = styled.div`
    display:flex;
    align-items:center;
`
export const Span = styled.span`
    cursor:pointer;
    &:hover{color:blue;}
`