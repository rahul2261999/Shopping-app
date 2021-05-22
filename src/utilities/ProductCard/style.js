import styled from 'styled-components'

export const Card = styled.div`
    display:flex;
    padding:15px 20px

`
export const CardContainer = styled.div`
    display:flex;
    flex-direction:column;
    width:90vw;
    max-width:300px;
    border:1px solid #ccc
`

export const DetailBody = styled.div`
    padding:15px;
`

export const ProductTitle = styled.div`
    dispaly:flex;
    justify-content:flex-start;
    font-size: 1.2rem;
    font-weight: 400;
    font-variant: tabular-nums
`
export const DetailWrapper = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding-top:10px;
    font-size: 1.2rem;
    font-weight: 400;
    font-variant: tabular-nums
`

export const CartIcon = styled.span`
    padding: 8px 20px;
    border: 1px solid #ccc;
    box-sizing: content-box;
    border-radius: 10px;
    &:hover{
        background:#000000;
        color:#ffffff;
        cursor:pointer;
    }
`

export const Price = styled.div`
 display:flex;
 align-items:center;
 justify-content:center;
 font-size:1.6rem;
 padding-top:15px;
`