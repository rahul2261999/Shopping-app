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
export const PriceCateg = styled.div`
    display:flex;
    justify-content:space-between;
    padding:15px 0;
    font-size: 1.2rem;
    font-weight: 400;
    font-variant: tabular-nums
`
export const PreviewDetails = styled.div`
    display:flex;
    justify-content:space-around;
`