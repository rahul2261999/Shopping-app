import styled from 'styled-components';

import style from '../../config.json';

export const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    position:fixed;
    width:350px;
    top:0;
    right:${(props) => (props.show ? '0' : '-100%')};
    bottom:0;
    background-color:#ffffff;
    box-shadow:0px 0px 4px 0px #1e1d1db8;
    border-left:1px solid #c7c3c3;
    transition:all 1.2s ease-in-out;
    padding:0 10px;
    z-index: 1001;
`;

export const CartHeader = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:25px 20px;
    font-size:${style.heading};
    border-bottom:1px solid ${style.borderColor}
`;

export const Icon = styled.svg`
    margin-right:10px;
    cursor:pointer;
`;

export const ScrollBar = styled.div`
    height:calc(100vh - 120px);
    overflow-y:auto;
`;
export const CartBody = styled.div``;

export const CartFooter = styled.button`
    text-align:center;
    font-size:100%;
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
`;
export const Text = styled.div`
    display:flex;
    padding-top:20px;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`;
