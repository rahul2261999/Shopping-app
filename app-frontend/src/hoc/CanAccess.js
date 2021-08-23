/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import DashLayout from '../components/Dashboard/MainLayout/DashLayout';
import Layout from '../components/Layout/Layout';
import { getUser } from '../utilities/helperFunction';

const CanAcess = ({
  component: Component, adminRoute, isLoggedIn, ...rest
}) => {
  const { token, user } = getUser();
  if (token && user && user.isAdmin === 1) {
    return (
      <DashLayout>
        <Route {...rest} render={(props) => (adminRoute ? <Component {...props} /> : <Redirect to="/dashboard" />)} />
      </DashLayout>

    );
  } if (isLoggedIn) {
    if (token && user && user.isAdmin === 0) {
      return (
        <Layout>
          <Route {...rest} render={(props) => <Component {...props} />} />
        </Layout>
      );
    }
    return <Redirect to="/" />;
  } if (!adminRoute) {
    return (
      <Layout>
        <Route {...rest} render={(props) => <Component {...props} />} />
      </Layout>
    );
  }
  return <Redirect to="/" />;
};

export default CanAcess;
