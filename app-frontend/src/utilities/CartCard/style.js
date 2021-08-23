import styled from 'styled-components';

import style from '../../config.json';

export const Card = styled.div`
max-width: 380px;
display: flex;
padding: 10px 10px;
position: relative;
margin: 10px 15px;
background: whitesmoke;
border-radius: 10px;
`;

export const Image = styled.div`
width: 110px;
height: 100px;
border: 4px double #cfcccc;
border-radius: 5px;
`;
export const ProductDetails = styled.div`
padding-left:8px;
`;
export const ProductTitle = styled.div`
    font-size:1.2rem;
`;
export const Price = styled.div`
    display:flex;
    align-items:center;
    color:${style.textColor};
    font-size:.9rem;
    padding:10px 0
`;
export const ButtonContainer = styled.div`
    display:flex;
    align-items:center;
`;
export const Control = styled.div`
    padding:3px;
    box-sizing:content-box;
    background-color:#000000;
    color:#ffffff;
    font-size:10px;
    cursor:pointer;
`;
export const Input = styled.div`
    width:40px;
    margin:8px 0px;
    text-align:center;
`;

export const TotalPrice = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:${style.subHeading}
`;

export const DeleteIcon = styled.div`
position: absolute;
right: 0;
color: #c74242;
cursor: pointer;
margin-right: 15px;
`;
