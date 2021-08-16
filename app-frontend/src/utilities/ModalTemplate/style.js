import styled from 'styled-components'

export const ModalBody = styled.div`
    display:flex;
    flex-direction:column;
    width:90vw;
    max-width:${props=>props.maxWidth?props.maxWidth:'auto'};
    background-color:#ffffff;
    border-radius: 4px;

    @media screen and  (max-width:850px){
        width: 100%;
        border-radius: 50px 50px 0 0;
    }
`

export const ModalHeader  = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:20px 0 20px 25px;
    border-bottom:1px solid #ccc;
    font-size:1.6rem;

    @media screen and (max-width: 800px){
        padding: 40px 0 20px 25px;

    }
`

export const Icon = styled.div`
    padding: 0 10px 0 0;
    font-size:2.8rem;
    cursor:pointer;
`