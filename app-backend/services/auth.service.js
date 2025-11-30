const { v4: uuid } = require('uuid');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user/user');
const VerifyToken = require('../models/verifyToken/verifyToken');
const { sendVerificationEmail, sendForgotPasswordEmail } = require('./email.service');
const { signAuthToken, createAndSaveVerifyToken } = require('./token.service');
const {
  BadRequestError,
  ServiceUnavailableError
} = require('../errors/HttpErrors');
const logger = require('../utils/logger');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function signUp(userBody) {
  logger.info({ email: userBody.email }, 'signup requested');
  const existing = await User.findOne({ email: userBody.email }).exec();
  if (existing) {
    logger.warn({ email: userBody.email }, 'signup rejected: email already registered');
    throw new BadRequestError('User already registerd with this email');
  }
  const newUser = new User(userBody);
  const user = await newUser.save();
  logger.info({ userId: user._id, email: user.email }, 'user created');

  const token = await signAuthToken(user);
  const vt = new VerifyToken({ user: user._id, token });
  await vt.save();
  logger.debug({ userId: user._id }, 'verify token saved for new user');

  await sendVerificationEmail({
    userName: `${user.first_name} ${user.last_name}`,
    email: user.email,
    verifyPath: `${process.env.APP_URL}/user/verify/${token}`
  });
  logger.info({ userId: user._id, email: user.email }, 'verification email queued');
  return { msg: 'Verify email link send to your email' };
}

async function signIn({ email, password }) {
  logger.info({ email }, 'signin requested');
  const user = await User.findOne({ email }).exec();
  if (!user) {
    logger.warn({ email }, 'signin failed: user not found');
    throw new BadRequestError('User not found with this email');
  }
  if (!user.authenticated(password)) {
    logger.warn({ userId: user._id }, 'signin failed: bad password');
    throw new BadRequestError('Please enter correct password');
  }
  const token = await signAuthToken(user);
  const {
    _id, first_name, last_name, isAdmin
  } = user;
  logger.info({ userId: _id }, 'signin success');
  return {
    token,
    user: {
      _id, first_name, last_name, email, isAdmin
    }
  };
}

async function validateUserByEmailFromToken(payload, token) {
  logger.info({ email: payload.email }, 'email verification requested');
  const user = await User.findOne({ email: payload.email }).exec();
  if (!user) {
    logger.warn({ email: payload.email }, 'email verification failed: user not found');
    throw new BadRequestError('User not found');
  }
  if (user.isEmailVerified) {
    logger.info({ userId: user._id }, 'email already verified');
    return { msg: 'User already verified' };
  }
  user.isEmailVerified = true;
  await user.save();
  logger.info({ userId: user._id }, 'email verified successfully');
  return { token, user: payload };
}

async function googleAuthentication(idToken) {
  try {
    logger.info('google auth requested');
    const clientData = await googleClient.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
    const {
      given_name, family_name, email, email_verified
    } = clientData.payload;
    if (!email_verified) {
      logger.warn({ email }, 'google auth failed: email not verified');
      throw new BadRequestError('email is not verified');
    }
    let user = await User.findOne({ email }).exec();
    if (!user) {
      user = await new User({
        first_name: given_name,
        last_name: family_name,
        email,
        isEmailVerified: email_verified,
        password: uuid()
      }).save();
      logger.info({ userId: user._id, email }, 'user created via google auth');
    }
    const token = await signAuthToken(user);
    const {
      _id, first_name, last_name, isAdmin
    } = user;
    logger.info({ userId: _id }, 'google auth success');
    return {
      token,
      user: {
        _id, first_name, last_name, email, isAdmin
      }
    };
  } catch (err) {
    logger.error({ err }, 'google auth error');
    throw new ServiceUnavailableError('Service unavailabel try again later');
  }
}

async function resendVerificationEmailIfNotVerified(email) {
  logger.info({ email }, 'resend verification requested');
  const user = await User.findOne({ email }).exec();
  if (!user) {
    logger.warn({ email }, 'resend verification failed: user not found');
    throw new BadRequestError('user not found');
  }
  if (user.isEmailVerified) {
    logger.info({ userId: user._id }, 'resend verification skipped: already verified');
    return { msg: 'Verify email link send to your email' };
  }
  const token = await createAndSaveVerifyToken(user);
  await sendVerificationEmail({
    userName: `${user.first_name}${user.last_name}`,
    email: user.email,
    verifyPath: `${process.env.APP_URL}/user/verify/${token}`
  });
  logger.info({ userId: user._id }, 'verification email resent');
  return { msg: 'Verify email link send to your email' };
}

async function forgotPassword(email) {
  logger.info({ email }, 'forgot password requested');
  const user = await User.findOne({ email }).exec();
  if (!user) {
    logger.warn({ email }, 'forgot password failed: email not found');
    throw new BadRequestError('email not found');
  }
  await sendForgotPasswordEmail({
    email,
    resetPath: `${process.env.APP_URL}/user/forgotpassword/?email=${email}`
  });
  logger.info({ userId: user._id }, 'forgot password email queued');
  return { msg: 'Check your email' };
}

async function setNewPassword({ email, newPassword, confirmPassword }) {
  logger.info({ email }, 'set new password requested');
  if (!(newPassword && newPassword.length > 0) || !(confirmPassword && confirmPassword.length > 0)) {
    logger.warn('set new password failed: missing fields');
    throw new BadRequestError('Please fill all the field');
  }
  if (newPassword !== confirmPassword) {
    logger.warn('set new password failed: password mismatch');
    throw new BadRequestError('Password not match with confirm Password');
  }
  const user = await User.findOne({ email }).exec();
  if (!user) {
    logger.warn({ email }, 'set new password failed: user not found');
    throw new BadRequestError('User not found address');
  }
  user.password = newPassword;
  await user.save();
  logger.info({ userId: user._id }, 'password set successfully');
  return { msg: 'Password set successfully' };
}

module.exports = {
  signUp,
  signIn,
  validateUserByEmailFromToken,
  googleAuthentication,
  resendVerificationEmailIfNotVerified,
  forgotPassword,
  setNewPassword
};


