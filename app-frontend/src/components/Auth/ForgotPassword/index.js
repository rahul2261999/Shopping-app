import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';

import { setNewPasswordRequset } from '../../../redux/actions/user';
import { validatePassword, validateConfirmPassWord, isObjectEmpty } from '../../../utilities/helperFunction';

import {
  Wrapper,
  FormWrapper,
  AuthButton
} from './styles';

const initialState = {
  newPassword: '',
  confirmPassword: '',
  error: ''
};

const ForgotPassword = ({
  location: { search },
  history
}) => {
  const email = search.split('=')[1];
  const dispatch = useDispatch();
  const [formState, setFromState] = useState(initialState);
  const { newPassword, confirmPassword, error } = formState;

  const inputChangeHandler = (e, { name, value }) => {
    setFromState({ ...formState, [name]: value, error: '' });
  };

  const validate = () => ({
    newPassword: validatePassword(true, newPassword),
    confirmPassword: validateConfirmPassWord(confirmPassword, newPassword)
  });

  const formSubmitHandler = async() => {
    const error = validate();
    if (isObjectEmpty(error)) {
      await dispatch(setNewPasswordRequset({ email, newPassword, confirmPassword }));
      history.push('/');
    } else {
      setFromState({ ...formState, error });
    }
  };

  console.log(formState);

  return (
    <Wrapper>
      <FormWrapper>
        <Form>
          <Form.Input
            label="New Password"
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={newPassword}
            error={error.newPassword ? error.newPassword : null}
            onChange={inputChangeHandler}
          />
          <Form.Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            error={error.confirmPassword ? error.confirmPassword : null}
            onChange={inputChangeHandler}
          />
          <AuthButton onClick={formSubmitHandler}>Sign Up</AuthButton>
        </Form>
      </FormWrapper>
    </Wrapper>

  );
};

export default ForgotPassword;
