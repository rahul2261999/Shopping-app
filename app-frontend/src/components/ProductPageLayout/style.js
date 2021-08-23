import styled from 'styled-components';

import config from '../../config.json';

export const HeaderTag = styled.h6`
    text-align:center;
    font-size: ${config.headerSize};
    
`;

export const ProductContainer = styled.div`
    display:flex;
    flex-wrap:wrap;
    position:relative;
`;

export const WrapperData = styled.div`
    display:flex;
    margin: 20px 0;

    @media screen and (max-width:850px){
        margin:0;
        padding-bottom: 20px;
        height: 500px;
        overflow-y: auto;
        flex-direction: column;
    }

`;
export const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin-top:30px;
`;

export const ProductImage = styled.img`
    width: 450px;
    height: 500px;
    padding: 0 25px;
    border-right: 2px solid #e5e3db;
    border-radius: 0px;
    margin: auto;

    @media screen and (max-width:850px){
        padding: 0;
    }
`;
export const ProductDetails = styled.div`
    padding:0 20px;
    flex:1;
`;
export const ScrollBar = styled.div`
    max-height: 260px;
    overflow-y: auto;
    padding: 10px 6px 0 0;
    &::-webkit-scrollbar{
        width:5px;
        height:5px;
    }
`;
export const ProductTitle = styled.div`
    font-size:1.5rem;
    font-weight:600;
    padding:10px 0;
`;

export const ProductLabel = styled.div`
    font-size:1.2rem;
    padding:10px 0;

`;
export const DetailText = styled.div`
    color:#878787;
    display:flex;
    align-items:center;
`;
export const Icon = styled.div`
    border-radius: 50%;
    background: black;
    padding: 6px;
    color: white;
    box-sizing: content-box;
    font-size: 10px;
    cursor:pointer;
`;

export const AddItem = styled.div`
    display:flex;
    align-items:center;
    
    @media screen and (max-width: 500px){
        width:100%;
    }
`;

export const Input = styled.input`
    margin: 0 8px;
    padding: 4px 0;
    text-align: center;
    width: 100px;
    border-radius: 4px;
`;

export const Button = styled.button`
    background-color: #000000;
    color: #ffffff;
    padding: 8px 12px;
    width: 200px;
    border: 0;
    margin-left: 15px;
    cursor:${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

export const Description = styled.div`
    color: #1e1e1e;
    text-align: justify;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.5;
`;
