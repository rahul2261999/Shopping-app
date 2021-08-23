const express = require('express');
const { check } = require('express-validator');

const route = express.Router();

const {
  signUp,
  signIn,
  isEmailVerified,
  decodeToken,
  validateUser,
  googleAuthentication
} = require('../controllers/auth');

route.post('/signup', [
  check('first_name', 'First name field can not be empty').isLength({ min: 1 }),
  check('email', 'Please enter valid email address').isEmail(),
  check('password', 'Password is weak').isStrongPassword()],
signUp);

route.post('/signin',
  check('email', 'Please enter valid email address').isEmail(),
  isEmailVerified,
  signIn);
route.post('/google-auth', googleAuthentication);

route.get('/user/verify/:tokenId', decodeToken, validateUser);

module.exports = route;
