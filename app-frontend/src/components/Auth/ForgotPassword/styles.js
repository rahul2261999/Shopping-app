import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const FormWrapper = styled.div`
    width: 350px;
    padding: 20px;
    background: #a2cdff
`;

export const AuthButton = styled.button`
    background-color:#000000;
    color:#ffffff;
    width:100%;
    border:0;
    padding:15px 0;
    &:hover{
        background:#000000d1
    }
`;
