import styled from 'styled-components';

export const ContentContainer = styled.div`
    height:100%;
    padding:0px 30px;

    @media screen and (max-width: 600px){
        padding: 60px 0;
        height: calc(100vh - 60px);
        overflow-y: auto;
    }
`;

export const FlexContainer = styled.div`
    display:flex;
    flex-direction:row;
`;
