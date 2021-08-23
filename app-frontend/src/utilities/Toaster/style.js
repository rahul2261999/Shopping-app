import styled, { css } from 'styled-components';

export const ToasterBox = styled.div`
    position:absolute;
    top:0;
    right:25px;
    z-index:99999;
    width:300px;
    opacity:0;
    transition: top 170ms ease-in, transform 100ms ease-out, background-color 80ms ease-out, opacity 150ms ease-out;
    ${(props) => props.isMount && css`
        opacity:1;
        background-color:${props.type === 'SUCCESS' ? '#3DBE29' : '#B4161B'};
        top:50px;
    `
}
`;

export const Msg = styled.div`
    padding:15px 25px;
    color:#ffffff;
    line-break:anywhere;
`;
