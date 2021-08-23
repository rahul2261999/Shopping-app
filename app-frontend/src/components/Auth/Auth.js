import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import ModalTemplate from '../../utilities/ModalTemplate/ModalTemplate';
import {
  requireField,
  validateEmail,
  validatePassword,
  validateConfirmPassWord,
  isObjectEmpty
}
  from '../../utilities/helperFunction';
import {
  userSignup,
  userSignInInitiate,
  closeAuthModal,
  userGoogleAuthInit
} from '../../redux/actions/user';
import { errorToaster } from '../../redux/actions/toaster';

import {
  ModalMainContent,
  FormWrapper,
  AuthBUtton,
  Row,
  ModalFooter,
  FooterRight,
  Span,
  Icon
}
  from './style';

const Auth = (props) => {
  const { openModal, redirect } = props;

  const [isSignup, setSignup] = useState(false);
  const [formValues, setFormValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: ''
  });

  const [formError, setFromError] = useState('');
  const dispatch = useDispatch();

  const {
    first_name, last_name, email, password, confirm_password
  } = formValues;

  const inputChangeHandler = (e, { name, value }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const resetForm = () => {
    setFormValues({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: ''
    });
    setFromError('');
  };

  const closeModal = () => {
    dispatch(closeAuthModal(false));
  };

  const switchFrom = () => {
    resetForm();
    setSignup((prevState) => !prevState);
  };

  useEffect(() => {
    resetForm();
    setSignup(false);
  }, [openModal]);

  const validation = () => {
    setFromError('');
    const error = {
      first_name: isSignup ? requireField(first_name, 'First name is required') : false,
      email: validateEmail(email),
      password: validatePassword(isSignup, password),
      confirm_password: isSignup ? validateConfirmPassWord(confirm_password, password) : false
    };
    return error;
  };

  const formSubmitHandler = () => {
    const error = validation();
    if (isObjectEmpty(error)) {
      isSignup ? dispatch(userSignup(formValues)) : dispatch(userSignInInitiate(formValues));
    } else {
      setFromError(error);
    }
  };

  const responseSuccessGoogle = (res) => {
    const { tokenObj: { id_token } } = res;
    dispatch(userGoogleAuthInit({ id_token }));
  };
  const responseErrorGoogle = (res) => {
    errorToaster('Something went worn');
  };

  const socialAuth = (
    <div>
      <GoogleLogin
        clientId="550709305724-1p1qm22afnn433s5cp2ktuutiigt6df1.apps.googleusercontent.com"
        render={(renderProp) => <Icon as={FcGoogle} onClick={renderProp.onClick} disabled={renderProp.disabled} />}
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy="single_host_origin"
      />
      {/* <Icon as={FaFacebook} /> */}
    </div>

  );

  if (redirect) {
    return <Redirect to="/" />;
  }

  const signUpFrom = (
    <ModalMainContent>
      <Row>
        <FormWrapper>
          <FormWrapper.Group widths="equal">
            <FormWrapper.Input
              label="First Name"
              type="text"
              name="first_name"
              placeholder="First Name"
              value={first_name}
              error={formError.first_name}
              onChange={inputChangeHandler}
            />
            <FormWrapper.Input
              label="Last Name"
              name="last_name"
              type="text"
              placeholder="Last Name"
              value={last_name}
              onChange={inputChangeHandler}
            />
          </FormWrapper.Group>
          <FormWrapper.Input
            label="E-mail"
            name="email"
            type="email"
            placeholder="Enter your e-mail"
            value={email}
            error={formError.email}
            onChange={inputChangeHandler}
          />
          <FormWrapper.Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            error={formError.password}
            onChange={inputChangeHandler}
          />
          <FormWrapper.Input
            label="Confirm Password"
            name="confirm_password"
            type="password"
            placeholder="Confirm your password"
            value={confirm_password}
            error={formError.confirm_password}
            onChange={inputChangeHandler}
          />
          <AuthBUtton onClick={formSubmitHandler}>Sign Up</AuthBUtton>
        </FormWrapper>
      </Row>
      <Row>
        <ModalFooter>
          {socialAuth}
          <FooterRight>
            Already have an Account?
            <Span onClick={switchFrom}>Sign In</Span>
          </FooterRight>
        </ModalFooter>
      </Row>
    </ModalMainContent>
  );

  const signInFrom = (
    <ModalMainContent>
      <Row>
        <FormWrapper>
          <FormWrapper.Input
            label="E-mail"
            name="email"
            type="email"
            placeholder="Enter your e-mail"
            value={email}
            error={formError.email}
            onChange={inputChangeHandler}
          />
          <FormWrapper.Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            error={formError.password}
            onChange={inputChangeHandler}
          />
          <AuthBUtton onClick={formSubmitHandler}>Sign In</AuthBUtton>
        </FormWrapper>
      </Row>
      <Row>
        <ModalFooter>
          {socialAuth}
          <FooterRight style={{ justifyContent: 'flex-end' }}>
            Not have an Account?
            <Span onClick={switchFrom}>Sign Up</Span>
          </FooterRight>
        </ModalFooter>
      </Row>
    </ModalMainContent>

  );

  return (
    <ModalTemplate
      modalTitle="Auth Modal"
      isMount={openModal}
      maxWidth="450px"
      headerTitle={isSignup ? 'Sign Up' : 'Sign In'}
      isModalOpen={closeModal}
    >
      {isSignup ? signUpFrom : signInFrom}
    </ModalTemplate>
  );
};

export default Auth;
