import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
    background: #fadadd;
    padding: 15px 25px;
    border-radius: 10px;
    font-family: 'Montserrat',sans-serif;
    max-width: 1100px;
    margin: 15px auto;
    height: 60px;
    max-height: 60px;
    overflow: hidden;
    transition: all 0.3s ease-in .5s;
    ${(props) => (props.expandList
    ? css`
           max-height: 612px; 
           height: 100%;       
        ` : null)
}

    @media screen and (max-width: 600px){
        padding: 15px 0 15px 10px;
        ${(props) => (props.expandList
    ? css`
               max-height: 1200px; 
               height: 100%;       
            ` : null)
} 
    }
`;
export const FlexContainer = styled.div`
    display:flex;
    align-items:${(props) => (props.centered ? 'center' : 'flex-start')};
    line-height:1.5;
    margin-bottom:10px;
    ${(props) => (props.font
    ? css`
        font-size: ${props.font};
        ` : null)
}
    @media screen and (max-width: 600px){
        font-size: 15px;
        flex-direction:${(props) => (props.row ? 'row' : 'column')}  
    }
`;
export const Title = styled.div`
    color:#000000;
    font-weight:700;
`;
export const OrderId = styled.span`
    color: #ee4a4d;
    padding-left: 8px;
    font-family: 'Montserrat';
    font-weight: 700;
`;
export const FlexLeft = styled.div`
    width:calc(100% - 310px);

    @media screen and (max-width: 600px){
        width: 100%;
    }
`;

export const FlexRight = styled.div`
    width:40%;
    min-width:300px;

    @media screen and (max-width: 600px){
        width: 100%
    }
`;
export const CardHeading = styled.div`
    display:flex;
    align-items:center;
    padding:10px 0;
    justify-content:${(props) => props.justifyContent || null};
    ${(props) => (!props.noBorder
    ? css` 
          border-bottom: 1px solid #edeaeb;
        ` : null)
}
`;

export const CardContainer = styled.div`
    background:#ffffff;
    border: 1px solid #edeaeb;
    border-radius:8px;
    padding:15px 20px;
    margin:20px 5px;

    ${(props) => (props.minWidth ? css`
            min-width:${props.minWidth}px;
        ` : null)}

    ${(props) => (props.textAlign === 'left'
    ? css`

        &>${CardHeading}{
            justify-content:space-between;
        },
        &>${CardHeading}>div{
            flex:unset;
        }
        ` : null)
}

    &>${CardHeading}>div{
        font-size:${(props) => props.childFont || null};
        font-weight:${(props) => props.childFontWeight || null};
    }
`;

export const TableHeading = styled.div`
    flex:1;
    font-family:'Montserrat', sans-serif;
    font-size:${(props) => `${props.Size}px !important` || '16px'};
    font-weight:${(props) => props.fontWeigth || 600};
    text-align:${(props) => props.textAlign || 'center'}
`;

export const TableValue = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    font-family:'Montserrat', sans-serif;
    font-size:${(props) => props.fontSize || 14}px;
    font-weight:${(props) => `${props.fontWeigth}!important` || 600};
   justify-content:${(props) => props.textAlign || 'center'}
`;
