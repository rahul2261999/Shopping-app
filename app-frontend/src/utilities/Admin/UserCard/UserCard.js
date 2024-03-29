import React from 'react';
import ReactTooltip from 'react-tooltip';
import { FaCheck, FaTimes } from 'react-icons/fa';

import user from '../../../assests/banner/femal.jpg';

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
  Icon,
  CornorLabel
} from './style';

const UserCard = (props) => {
  const {
    Id, username, email, isAdmin, emailVerify, isBlocked
  } = props;
  return (
    <CardContainer>
      <CornorLabel blocked={isBlocked}>{isBlocked ? 'Blocked' : 'Active'}</CornorLabel>
      <Card>
        <BgcircleOne />
        <BgcircleTwo />
        <BgImage src={user} alt="user.jpg" />
        <UserName>{username}</UserName>
        <UserDetails>
          <Li>
            <DetailsLabel>Id</DetailsLabel>
            <DetailsValue data-tip={Id}>{Id}</DetailsValue>
          </Li>
          <Li>
            <DetailsLabel>E-mail</DetailsLabel>
            <DetailsValue data-tip={email}>{email}</DetailsValue>
          </Li>
          <Li>
            <DetailsLabel>Verified</DetailsLabel>
            <DetailsValue>{emailVerify ? <Icon as={FaCheck} /> : <Icon color="#ce2d2d" as={FaTimes} />}</DetailsValue>
          </Li>
          <Li>
            <DetailsLabel>Admin</DetailsLabel>
            <DetailsValue>{isAdmin ? <Icon as={FaCheck} /> : <Icon color="#ce2d2d" as={FaTimes} />}</DetailsValue>
          </Li>
        </UserDetails>
        <Button>Update User</Button>
      </Card>
      <ReactTooltip />
    </CardContainer>
  );
};

export default UserCard;
