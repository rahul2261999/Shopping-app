import styled, {keyframes} from "styled-components";

const loading = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

export const LoaderDiv = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    position:fixed;
    top:0;
    left:0;
    right:0;
    background:#615f5f2e;
    width: 100%;
    height: 100%;
    z-index:999;
    &>div{
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 75px;
    height: 75px;
    margin: 8px;
    border: 8px solid;
    border-radius: 50%;
    animation: ${loading} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: red transparent transparent transparent;
  }
 &>div:nth-child(1) {
    animation-delay: -0.45s;
  }
  &>div:nth-child(2) {
    animation-delay: -0.3s;
  }
  &>div:nth-child(3) {
    animation-delay: -0.15s;
  }
`
