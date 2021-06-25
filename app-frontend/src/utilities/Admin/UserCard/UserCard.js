import React from 'react'
import {
    CardContainer,
    Card,
    BgcircleOne,
    BgcircleTwo,
    BgImage,
    UserName,
    UserDetails,
    Li,
    DetailsLabel,
    DetailsValue,
    Button,
    Icon
} from './style'
import user from '../../../assests/banner/femal.jpg'

import {FaCheck, FaCheckCircle, FaTimes} from 'react-icons/fa'

const UserCard = props => {
    const {Id,username,email,isAdmin,emailVerify}  = props
    return (
        <CardContainer>
            <Card>
                <BgcircleOne />
                <BgcircleTwo />
                <BgImage src={user} alt="user.jpg" />
                <UserName>{username}</UserName>
                <UserDetails>
                    <Li>
                        <DetailsLabel>Id</DetailsLabel><DetailsValue>{Id}</DetailsValue>
                    </Li>
                    <Li>
                        <DetailsLabel>E-mail</DetailsLabel><DetailsValue>{email}</DetailsValue>
                    </Li>
                    <Li>
                        <DetailsLabel>Verified</DetailsLabel><DetailsValue>{emailVerify?<Icon as={FaCheckCircle} />:<Icon color="#ce2d2d" as={FaTimes} />}</DetailsValue>
                    </Li>
                    <Li>
                        <DetailsLabel>Admin</DetailsLabel><DetailsValue>{isAdmin?<Icon as={FaCheck} />:"No"}</DetailsValue>
                    </Li>
                </UserDetails>
                <Button>Change Password</Button>
            </Card>
        </CardContainer>
    )
}

export default UserCard