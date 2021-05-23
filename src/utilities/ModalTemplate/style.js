import styled from 'styled-components'

export const ModalBody = styled.div`
    display:flex;
    flex-direction:column;
    width:90vw;
    max-width:${props=>props.maxWidth?props.maxWidth:'auto'};
    background-color:#ffffff;
    border-radius: 4px;
`

export const ModalHeader  = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:20px 0 20px 25px;
    border-bottom:1px solid #ccc;
    font-size:1.6rem
`

export const Icon = styled.div`
    padding: 0 10px 0 0;
    font-size:2.8rem;
    cursor:pointer;
`