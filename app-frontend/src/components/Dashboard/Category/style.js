import styled from 'styled-components';

export const HeaderBar = styled.div`
padding: 20px 25px;
height: 70px;
display: flex;
width:100%;
align-items: center;
font-size: 1.4rem;
border-bottom:1px solid #e5e3db;

`;
export const Icon = styled.div`
    margin-right:${(props) => (props.margin ? props.margin : 0)};
    cursor:pointer;
`;

export const Container = styled.div`
    padding:20px 10px;
    display:flex;
    flex-wrap:wrap;
`;
export const CardBody = styled.div`
    background:linear-gradient(to right,#e95df9,#ff8dbb);
    color:white;
    display:flex;
    justify-content:center;
    padding:10px 15px;
    box-shadow: 3px 3px 10px #d5d5d5dd;
    position:relative;
    border-radius:5px;
    min-width:100px;

`;
export const CardIcon = styled.div`
    position:absolute;
    width:100%;
    left:0;
    top:0;
    display:flex;
    bottom:0;
    opacity:0;
    align-items:center;
    background:#000000;
    justify-content:space-between;
    padding:0 10px;
    transition:all 0.2s linear;
    ${CardBody}:hover &{
       opacity:1;
    }

`;
