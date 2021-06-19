import styled from 'styled-components'
import style from '../../config.json'

export const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    width:500px;
    position:fixed;
    top:0;
    right:${props=>props.show?'0':'-100%'};
    bottom:0;
    background-color:#ffffff;
    transition:all 1.2s ease-in-out;
`

export const CartHeader = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:25px 20px;
    font-size:${style.heading};
    border-bottom:1px solid ${style.borderColor}
`

export const Icon = styled.svg`
    margin-right:10px;
    cursor:pointer;
`

export const ScrollBar = styled.div`
    height:calc(100vh - 200px);
    overflow-y:auto;
`
export const CartBody = styled.div``

export const CartFooter = styled.button`
    text-align:center;
    font-size:1.3rem;
    font-variant:all-small-caps;
    width:100%;
    padding:10px 0;
    cursor:pointer;
    background-color:#000000;
    color:#ffffff;
    border:0.2px solid ${styled.borderColor};
    &:hover{
        background-color:#000000d1
    }
`