import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
    display:flex;
    jusity-content:space-around;

    @media screen and (max-width:600px){
        display:none
    }
`;

export const CardContainer = styled.div`
    flex:1;
    padding:10px;
    height:400px;
`;
export const PromotionCard = styled.div`
   ${(props) => (props.bgImage
    ? css`
        background-image:url(${props.bgImage});
        height:100%;
        width:100%;
        background-size:cover;
        position:relative;
    ` : '')
}
    opacity:1;
    transition: all .8s linear 0.1s;
    &:hover{
        opacity:0.7;
    }
`;

export const Text = styled.div`
    font-size:1.8rem;
    position:absolute;
    bottom:0;
    padding:20px 10px 20px;
    transition: all .8s linear 0.1s;
    font-weight: 700;
    font-variant: small-caps;
    letter-spacing: 2px;
    ${PromotionCard}:hover &{
       bottom:80%;
       background:#ffffff;
    }
`;
