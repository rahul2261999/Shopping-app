import styled from "styled-components";

export const CardContainer = styled.div`
padding:15px 10px;
`
export const Card = styled.div`
width:400px;
height:230px;
position:relative;
background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 20px;
overflow:hidden;
`

export const BgcircleOne = styled.div`
    position: absolute;
    width: 368px;
    height: 313px;
    left: -90px;
    top: -19px;

    background: linear-gradient(128.69deg, rgba(217, 38, 188, 0.5) 22.16%, rgba(197, 5, 143, 0.4) 100%);
    filter: blur(100px);
`

export const BgcircleTwo = styled.div`
    position: absolute;
    width: 363px;
    height: 363px;
    left: 178px;
    top: 15px;

    background: linear-gradient(116.94deg, rgba(15, 50, 119, 0.56) 12.89%, rgba(39, 155, 220, 0.4) 84.46%, rgba(180, 187, 191, 0.38) 84.46%);
    filter: blur(116px);
`

export const BgImage = styled.img`
    position: absolute;
    width: 100px;
    height: 90px;
    left: 13px;
    top: 25px;
    border-radius:50%;
    object-fit:cover;
`

export const UserName = styled.div`
    position: absolute;
    width: 102px;
    height: 28px;
    left: 17px;
    top: 125px;

    font-family: 'Mulish', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    display: flex;
    align-items: center;
    justify-content:center;
    color: #392C2C;
`

export const UserDetails = styled.ul`
    position: absolute;
    left: 130px;
    top: 46px;
    list-style-type:none;
    margin:0;
    padding:0;
`
export const Li = styled.li`
    display:flex;
`
export const DetailsLabel = styled.div`
    display:flex;
    justify-content:flex-end;
    width:40px;
    font-family: 'Mulish', sans-serif;
    font-size:12px;
    color: #392C2C;
`
export const DetailsValue = styled.div`
    font-family: 'Mulish', sans-serif;
    font-size:12px;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    padding-left:15px;
    max-width:80%;
    color: #392C2C;
`

export const Button = styled.div`
position: absolute;
width: 134px;
left: 180px;
top: 130px;

background: #181717;
border-radius: 5px;
font-family: Mulish;
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 16px;
color: #F3ECEF;
text-align:center;
padding:4px 0;
cursor:pointer;
`
export const Icon = styled.div`
color: ${props=>props.color?props.color:"#0e9d0e"};
}
`