import styled from 'styled-components'
import style from '../../config.json'

export const Card = styled.div`
    display:flex;
    padding:10px 0;
    border-bottom:1px solid ${style.borderColor}
`
export const ButtonContainer  = styled.div`
    display:flex;
    align-items:center;
    margin-top:35px;
`

export const Control = styled.div`
    padding:8px;
    box-sizing:content-box;
    background-color:#000000;
    color:#ffffff;
    border-radius:50%;
    font-size:10px;
    cursor:pointer;
`
export const Input = styled.div`
    width:50px;
    margin:8px 0px;
    text-align:center;
`

export const Image = styled.div`
    width:150px;
    height:150px;
    padding:0 10px 0 0;
`
export const ProductDetails = styled.div`
`
export const ProductTitle = styled.div`
    font-size:${style.heading}
`
export const Price = styled.div`
    display:flex;
    align-item:center;
    color:${style.textColor};
    font-size:1.3rem;
    padding:10px 0
`

export const TotalPrice = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:${style.subHeading}
`