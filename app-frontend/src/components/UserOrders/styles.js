import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
    background:#fadadd;
    padding:30px 25px;
    border-radius:10px;
    font-family:'Montserrat', sans-serif;
    max-width:1100px;
    margin:15px auto;
`
export const FlexContainer = styled.div`
    display:flex;
    align-items:${props=>props.centered?'center':'flex-start'};
    line-height:1.5;
    margin-bottom:10px;
`
export const Title = styled.div`
    color:#000000;
    font-size:22px;
    font-weight:700;
`
export const OrderId = styled.span`
    color: #ee4a4d;
    padding-left: 8px;
    font-size: 18px;
    font-family: 'Montserrat';
    font-weight: 700;
`
export const FlexLeft = styled.div`
    width:calc(100% - 310px);
    min-width:500px;
`

export const FlexRight = styled.div`
    width:40%;
    min-width:300px
`
export const CardHeading = styled.div`
    display:flex;
    align-items:center;
    padding:10px 0;
    justify-content:${props=>props.justifyContent||null};
    ${props=>!props.noBorder?
        css` 
          border-bottom: 1px solid #edeaeb;
        `:null
    }
`

export const CardContainer = styled.div`
    background:#ffffff;
    border: 1px solid #edeaeb;
    border-radius:8px;
    padding:15px 20px;
    margin:20px 5px;

    ${props => props.minWidth ? css`
            min-width:${props.minWidth}px;
        `: null}

    ${props=>props.textAlign==='left'?
        css`

        &>${CardHeading}{
            justify-content:space-between;
        },
        &>${CardHeading}>div{
            flex:unset;
        }
        `:null
    }

    &>${CardHeading}>div{
        font-size:${props=>props.childFont || null};
        font-weight:${props=>props.childFontWeight || null};
    }
`


export const TableHeading = styled.div`
    flex:1;
    font-family:'Montserrat', sans-serif;
    font-size:${props=>props.Size+'px !important' ||'16px'};
    font-weight:${props=>props.fontWeigth||600};
    text-align:${props=>props.textAlign||'initial'}
`

export const TableValue = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    font-family:'Montserrat', sans-serif;
    font-size:${props=>props.fontSize||14}px;
    font-weight:${props=>props.fontWeigth + '!important'||600};
    text-align:${props=>props.textAlign||'initial'}
`