import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { isAuthenticated, signOut } from '../../../redux/actions/user';
import Sidebar from '../../../utilities/NavigationBar/Sidebar/Sidebar';
import { getUser } from '../../../utilities/helperFunction';

import { FlexContainer, ContentContainer } from './style';

const DashLayout = ({ children }) => {
  const { user } = getUser();
  const dispatch = useDispatch();
  const userSignOut = () => {
    dispatch(signOut(user));
  };

  useEffect(() => {
    dispatch(isAuthenticated());
  }, [dispatch]);

  const redirect = useSelector((state) => state.user.redirect);
  if (!getUser() && redirect) {
    return <Redirect to="/" />;
  }
  return (
    <FlexContainer>
      <Sidebar signOut={userSignOut} />
      <ContentContainer>{children}</ContentContainer>
    </FlexContainer>
  );
};

export default DashLayout;
